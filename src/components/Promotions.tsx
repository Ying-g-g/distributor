import React, { useState } from 'react';
import { Plus, X, Zap } from 'lucide-react';
import { mockPromoCampaigns } from '../utils/mockData';
import { PromoCampaign } from '../types';

export default function Promotions() {
  const [campaigns, setCampaigns] = useState<PromoCampaign[]>(mockPromoCampaigns);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.startDate || !newCampaign.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    const campaign = {
      id: `c${Date.now()}`,
      name: newCampaign.name,
      description: newCampaign.description,
      status: 'Draft' as const,
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      codes: [],
      totalCodes: 0,
      timesRedeemed: 0,
      revenueGenerated: 0
    };

    setCampaigns([...campaigns, campaign]);
    setShowCreateModal(false);
    setNewCampaign({ name: '', description: '', startDate: '', endDate: '' });
    alert('Campaign created successfully!');
  };

  const handleActivateCampaign = (id: string) => {
    setCampaigns(campaigns.map(c =>
      c.id === id ? { ...c, status: 'Active' as const } : c
    ));
  };

  const handleDeactivateCampaign = (id: string) => {
    if (confirm('Deactivate this campaign? Codes will no longer be redeemable.')) {
      setCampaigns(campaigns.map(c =>
        c.id === id ? { ...c, status: 'Ended' as const } : c
      ));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} /> Create Promo
        </button>
        <span className="text-sm text-gray-600">Total: {campaigns.length} campaigns</span>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
          <div
            key={campaign.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedCampaign(campaign)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{campaign.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                campaign.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {campaign.status}
              </span>
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Period:</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Codes Generated:</span>
                <span className="text-sm font-bold text-blue-600">{campaign.codes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Redemptions:</span>
                <span className="text-sm font-bold text-green-600">{campaign.timesRedeemed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue Generated:</span>
                <span className="text-sm font-bold text-green-600">RM {campaign.revenueGenerated.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex gap-2">
              {campaign.status === 'Draft' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleActivateCampaign(campaign.id);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Activate
                </button>
              )}
              {campaign.status === 'Active' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeactivateCampaign(campaign.id);
                  }}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                >
                  Deactivate
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCampaign(campaign);
                }}
                className="flex-1 px-3 py-2 bg-gray-200 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-300"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full m-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Campaign Details - {selectedCampaign.name}</h3>
              <button onClick={() => setSelectedCampaign(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="font-semibold text-gray-900">{selectedCampaign.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedCampaign.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">End Date</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedCampaign.endDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-4">Discount Codes</h4>
                <div className="space-y-3">
                  {selectedCampaign.codes.length > 0 ? (
                    selectedCampaign.codes.map(code => (
                      <div key={code.code} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-600">Code</p>
                            <p className="font-bold text-gray-900 text-lg font-mono">{code.code}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Redemptions</p>
                            <p className="font-bold text-blue-600 text-lg">{code.redemptions}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between text-sm text-gray-600">
                          <span>Usage Limit: {code.usageLimit}</span>
                          <span>Rate: {((code.redemptions / code.usageLimit) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 py-4">No codes generated yet</p>
                  )}
                </div>
              </div>

              <div className="border-t pt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Codes</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedCampaign.codes.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Redemptions</p>
                  <p className="text-2xl font-bold text-green-600">{selectedCampaign.timesRedeemed}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-green-600">RM {(selectedCampaign.revenueGenerated / 1000).toFixed(0)}K</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                  <Zap size={16} /> Generate Codes
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300">
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Create Promotion</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name *</label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Campaign name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={3}
                  placeholder="Campaign description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                <input
                  type="date"
                  value={newCampaign.startDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                <input
                  type="date"
                  value={newCampaign.endDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleCreateCampaign}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Create Campaign
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
