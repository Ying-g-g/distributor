import React, { useState } from 'react';
import { Plus, X, Phone, Mail, Search, Filter, Settings } from 'lucide-react';
import { mockPartners, mockDeliveryCases } from '../utils/mockData';
import { Partner, DeliveryCase } from '../types';

export default function PartnerNetwork() {
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [cases, setCases] = useState<DeliveryCase[]>(mockDeliveryCases);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [selectedCase, setSelectedCase] = useState<DeliveryCase | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpec, setFilterSpec] = useState('all');
  const [commissionRate, setCommissionRate] = useState('');
  const [newPartner, setNewPartner] = useState({
    name: '',
    email: '',
    phone: '',
    territory: 'Your Territory',
    specializations: [] as string[]
  });

  const specs = ['F&B', 'IT', 'Property', 'Manufacturing', 'Services', 'Education', 'Healthcare', 'Retail', 'Finance'];

  const filteredPartners = partners.filter(p => {
    const matchesSearch = searchTerm === '' ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpec = filterSpec === 'all' || p.specializations.includes(filterSpec);
    return matchesSearch && matchesSpec;
  });

  const unassignedCases = cases.filter(c => !c.partner_id);

  const handleInvite = () => {
    if (!newPartner.name || !newPartner.email) {
      alert('Please fill in all required fields');
      return;
    }

    const partner: Partner = {
      id: `p${Date.now()}`,
      name: newPartner.name,
      email: newPartner.email,
      specializations: newPartner.specializations,
      status: 'Pending',
      activeCases: 0,
      completedCases: 0,
      performanceRating: 0,
      completionRate: 0
    };

    setPartners([...partners, partner]);
    setShowInviteModal(false);
    setNewPartner({ name: '', email: '', phone: '', territory: 'Your Territory', specializations: [] });
    alert(`Invitation sent to ${newPartner.name}!`);
  };

  const handleSpecToggle = (spec: string) => {
    setNewPartner(prev => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec]
    }));
  };

  const viewProfile = (partner: Partner) => {
    setSelectedPartner(partner);
    setShowProfileModal(true);
  };

  const assignPartnerToCase = () => {
    if (!selectedPartner || !selectedCase) return;

    setCases(cases.map(c =>
      c.id === selectedCase.id ? { ...c, partner_id: selectedPartner.id } : c
    ));

    setPartners(partners.map(p =>
      p.id === selectedPartner.id ? { ...p, activeCases: p.activeCases + 1 } : p
    ));

    setShowCaseModal(false);
    setSelectedCase(null);
    alert(`Case assigned to ${selectedPartner.name}`);
  };

  const setCommission = () => {
    if (!selectedPartner || !commissionRate) return;

    alert(`Commission rate set to ${commissionRate}% for ${selectedPartner.name}`);
    setShowCommissionModal(false);
    setCommissionRate('');
  };

  const partnerCases = selectedPartner
    ? cases.filter(c => c.partner_id === selectedPartner.id)
    : [];

  const avgDeliveryTime = partnerCases.length > 0
    ? partnerCases
        .filter(c => c.actual_delivery_date)
        .reduce((acc, c) => {
          const days = Math.floor(
            (new Date(c.actual_delivery_date!).getTime() - new Date(c.payment_date).getTime()) / (1000 * 60 * 60 * 24)
          );
          return acc + days;
        }, 0) / partnerCases.filter(c => c.actual_delivery_date).length
    : 0;

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} /> Invite Partner
          </button>
          <span className="text-sm text-gray-600">Total: {filteredPartners.length} partners</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name or Email</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Specialization</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={filterSpec}
                onChange={(e) => setFilterSpec(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
              >
                <option value="all">All Specializations</option>
                {specs.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map(partner => (
          <div
            key={partner.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">{partner.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                partner.status === 'Active' ? 'bg-green-100 text-green-800' :
                partner.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {partner.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail size={16} />
                <span className="text-sm">{partner.email}</span>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">Specializations:</p>
                <div className="flex flex-wrap gap-2">
                  {partner.specializations.map(spec => (
                    <span key={spec} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 pt-3 border-t">
              <div>
                <p className="text-xs text-gray-600">Active Cases</p>
                <p className="text-lg font-bold text-blue-600">{partner.activeCases}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Completion</p>
                <p className="text-lg font-bold text-green-600">{partner.completionRate}%</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => viewProfile(partner)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  setSelectedPartner(partner);
                  setShowCaseModal(true);
                }}
                className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Assign Case
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Invite Partner</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                  placeholder="Partner Company Ltd"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={newPartner.email}
                  onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
                  placeholder="contact@partner.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  value={newPartner.phone}
                  onChange={(e) => setNewPartner({ ...newPartner, phone: e.target.value })}
                  placeholder="+60 12-345 6789"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Territory</label>
                <input
                  type="text"
                  value={newPartner.territory}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Pre-filled with your territory (read-only)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Specializations</label>
                <div className="flex flex-wrap gap-2">
                  {specs.map(spec => (
                    <label key={spec} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newPartner.specializations.includes(spec)}
                        onChange={() => handleSpecToggle(spec)}
                        className="rounded border-gray-300 text-blue-600 mr-2"
                      />
                      <span className="text-sm text-gray-700">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleInvite}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Mail size={16} /> Send Invitation
                </button>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Partner Profile Modal */}
      {showProfileModal && selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Partner Profile - {selectedPartner.name}</h3>
              <button onClick={() => setShowProfileModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Active Cases</p>
                <p className="text-2xl font-bold text-blue-600">{selectedPartner.activeCases}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Completed Cases</p>
                <p className="text-2xl font-bold text-green-600">{selectedPartner.completedCases}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Performance Rating</p>
                <p className="text-2xl font-bold text-purple-600">{selectedPartner.performanceRating.toFixed(1)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
                <p className="text-xl font-bold text-gray-900">{selectedPartner.completionRate}%</p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedPartner.completedCases} of {selectedPartner.completedCases + selectedPartner.activeCases} cases completed
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Average Delivery Time</p>
                <p className="text-xl font-bold text-gray-900">{avgDeliveryTime > 0 ? Math.round(avgDeliveryTime) : 0} days</p>
                <p className="text-xs text-gray-500 mt-1">Average time to complete delivery</p>
              </div>
            </div>

            <div className="border-t pt-4 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">Commission Settings</h4>
              <div className="bg-gray-50 p-4 rounded-lg mb-3">
                <p className="text-sm text-gray-600 mb-1">Default Commission Rate</p>
                <p className="text-lg font-bold text-gray-900">10%</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  setShowCommissionModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
              >
                <Settings size={16} /> Set Custom Commission
              </button>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Assigned Cases</h4>
              {partnerCases.length === 0 ? (
                <p className="text-gray-500 text-sm">No cases assigned yet</p>
              ) : (
                <div className="space-y-2">
                  {partnerCases.map(c => (
                    <div key={c.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{c.customer_name}</p>
                        <p className="text-xs text-gray-600">Expected: {new Date(c.expected_delivery_date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        c.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        c.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        c.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Assign Case Modal */}
      {showCaseModal && selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full m-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Assign Case to {selectedPartner.name}</h3>
              <button onClick={() => setShowCaseModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              {unassignedCases.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No unassigned cases available</p>
              ) : (
                unassignedCases.map(c => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCase(c)}
                    className={`p-4 border rounded-lg cursor-pointer transition ${
                      selectedCase?.id === c.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{c.customer_name}</p>
                        <p className="text-sm text-gray-600 mt-1">Expected Delivery: {new Date(c.expected_delivery_date).toLocaleDateString()}</p>
                        <p className="text-sm font-medium text-blue-600 mt-2">RM {c.deal_value.toLocaleString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        c.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {selectedCase && (
              <div className="flex gap-2 pt-4 mt-4 border-t">
                <button
                  onClick={assignPartnerToCase}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Assign to Partner
                </button>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel Selection
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Set Commission Modal */}
      {showCommissionModal && selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Set Commission - {selectedPartner.name}</h3>
              <button onClick={() => setShowCommissionModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
                <input
                  type="number"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  placeholder="10"
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-xs text-gray-500 mt-2">This will override the default commission rate for this partner</p>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={setCommission}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Save Commission
                </button>
                <button
                  onClick={() => setShowCommissionModal(false)}
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
