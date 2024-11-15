import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, FileText, CreditCard, LogOut, User } from 'lucide-react';

interface SavedGrant {
  id: string;
  title: string;
  lastModified: string;
  status: 'draft' | 'completed';
}

export default function Portal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data - replace with actual data from your backend
  const userProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'Professional',
    nextBilling: '2024-03-15',
  };

  const savedGrants: SavedGrant[] = [
    {
      id: '1',
      title: 'Education Innovation Grant',
      lastModified: '2024-02-15',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Community Development Project',
      lastModified: '2024-02-10',
      status: 'draft',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('grants')}
                  className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                    activeTab === 'grants'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  Saved Grants
                </button>
                <button
                  onClick={() => setActiveTab('billing')}
                  className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                    activeTab === 'billing'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  Billing
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                    activeTab === 'settings'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome, {userProfile.name}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Plan</h3>
                      <p className="text-gray-600">{userProfile.plan}</p>
                      <p className="text-sm text-gray-500 mt-1">Next billing: {userProfile.nextBilling}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
                      <button
                        onClick={() => window.location.href = '/bot'}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Launch Grant Bot
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'grants' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Grants</h2>
                  <div className="space-y-4">
                    {savedGrants.map((grant) => (
                      <div
                        key={grant.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{grant.title}</h3>
                          <p className="text-sm text-gray-500">Last modified: {grant.lastModified}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              grant.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {grant.status}
                          </span>
                          <button className="text-blue-600 hover:text-blue-700">Edit</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing & Subscription</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
                      <p className="text-gray-600 mb-4">You are currently on the {userProfile.plan} plan.</p>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Change Plan
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                      <p className="text-gray-600 mb-4">Visa ending in 4242</p>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Update Payment Method
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        defaultValue={userProfile.name}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue={userProfile.email}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}