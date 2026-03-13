import React, { useState } from 'react';
import { Plus, Trash2, X, Mail, BarChart3 } from 'lucide-react';
import { mockSalesAgents } from '../utils/mockData';
import { SalesAgent } from '../types';

export default function SalesTeam() {
  const [agents, setAgents] = useState<SalesAgent[]>(mockSalesAgents);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<SalesAgent | null>(null);
  const [inviteForm, setInviteForm] = useState({ firstName: '', lastName: '', email: '', role: 'Sales Agent' });
  const [targets, setTargets] = useState({ revenueTarget: '', dealsTarget: '' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = agents.filter(a => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesSearch = searchTerm === '' ||
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleInvite = () => {
    if (!inviteForm.firstName || !inviteForm.email) {
      alert('Please fill in required fields');
      return;
    }
    setShowInviteModal(false);
    setInviteForm({ firstName: '', lastName: '', email: '', role: 'Sales Agent' });
    alert(`Invitation sent to ${inviteForm.email}!`);
  };

  const viewPerformance = (agent: SalesAgent) => {
    setSelectedAgent(agent);
    setShowPerformanceModal(true);
  };

  const handleSetTarget = () => {
    if (!selectedAgent) return;
    setAgents(agents.map(a =>
      a.id === selectedAgent.id
        ? { ...a, monthlyTarget: parseFloat(targets.revenueTarget) || 50000 }
        : a
    ));
    setShowTargetModal(false);
    setTargets({ revenueTarget: '', dealsTarget: '' });
    alert('Target set successfully!');
  };

  const handleDeactivate = (agentId: string) => {
    if (confirm('Are you sure? Their leads will be reassigned.')) {
      setAgents(agents.map(a =>
        a.id === agentId ? { ...a, status: 'Inactive' } : a
      ));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setShowInviteModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={18} /> Invite Sales Agent
            </button>
          </div>
          <span className="text-sm text-gray-600">Total: {filteredAgents.length} agents</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Name or Email</label>
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sales Team Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Sales Team Members</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Leads</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Deals</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Revenue (MTD)</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Commission (MTD)</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Conversion</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAgents.map(agent => (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{agent.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{agent.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      agent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button
                      onClick={() => viewPerformance(agent)}
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                    >
                      {agent.leadsAssigned}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button
                      onClick={() => viewPerformance(agent)}
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                    >
                      {agent.dealsClosed}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button
                      onClick={() => viewPerformance(agent)}
                      className="text-blue-600 hover:text-blue-700 hover:underline font-semibold"
                    >
                      RM {agent.revenue.toLocaleString()}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button
                      onClick={() => viewPerformance(agent)}
                      className="text-green-600 hover:text-green-700 hover:underline font-semibold"
                    >
                      RM {agent.commissionEarned.toLocaleString()}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button
                      onClick={() => viewPerformance(agent)}
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                    >
                      {agent.conversionRate.toFixed(1)}%
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedAgent(agent);
                          setShowTargetModal(true);
                          setTargets({ revenueTarget: agent.monthlyTarget?.toString() || '50000', dealsTarget: '10' });
                        }}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-200"
                      >
                        Target
                      </button>
                      {agent.status === 'Active' && (
                        <button
                          onClick={() => handleDeactivate(agent.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Invite Sales Agent</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={inviteForm.firstName}
                  onChange={(e) => setInviteForm({ ...inviteForm, firstName: e.target.value })}
                  placeholder="John"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name (optional)</label>
                <input
                  type="text"
                  value={inviteForm.lastName}
                  onChange={(e) => setInviteForm({ ...inviteForm, lastName: e.target.value })}
                  placeholder="Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Sales Agent">Sales Agent</option>
                  <option value="Senior Sales Agent">Senior Sales Agent</option>
                  <option value="Sales Manager">Sales Manager</option>
                </select>
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

      {/* Target Modal */}
      {showTargetModal && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Set Target - {selectedAgent.name}</h3>
              <button onClick={() => setShowTargetModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>This Month</option>
                  <option>This Quarter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Revenue Target (RM)</label>
                <input
                  type="number"
                  value={targets.revenueTarget}
                  onChange={(e) => setTargets({ ...targets, revenueTarget: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deals Target (Count)</label>
                <input
                  type="number"
                  value={targets.dealsTarget}
                  onChange={(e) => setTargets({ ...targets, dealsTarget: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSetTarget}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Save Target
                </button>
                <button
                  onClick={() => setShowTargetModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Report Modal */}
      {showPerformanceModal && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full m-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Performance Report - {selectedAgent.name}</h3>
              <button onClick={() => setShowPerformanceModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Leads Assigned</p>
                <p className="text-2xl font-bold text-blue-600">{selectedAgent.leadsAssigned}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Deals Closed</p>
                <p className="text-2xl font-bold text-green-600">{selectedAgent.dealsClosed}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Revenue (MTD)</p>
                <p className="text-2xl font-bold text-purple-600">RM {selectedAgent.revenue.toLocaleString()}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-orange-600">{selectedAgent.conversionRate.toFixed(1)}%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Commission Earned</p>
                <p className="text-xl font-bold text-green-600">RM {selectedAgent.commissionEarned.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Monthly Target</p>
                <p className="text-xl font-bold text-gray-900">RM {selectedAgent.monthlyTarget?.toLocaleString() || '50,000'}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {((selectedAgent.revenue / (selectedAgent.monthlyTarget || 50000)) * 100).toFixed(1)}% achieved
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
              <p className="text-gray-600 text-sm">Detailed performance metrics and activity log would appear here.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
