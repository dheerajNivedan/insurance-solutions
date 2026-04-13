import { useState } from 'react'
import { HeadingField, CardLayout, ButtonWidget, TagField } from '@pglevy/sailwind'
import { useLocation } from 'wouter'

export default function SubmissionSummary() {
  const [, setLocation] = useLocation()
  const [activeTab, setActiveTab] = useState(0)
  const tabLabels = ['Summary', 'Risk Details', 'Financial Performance', 'Quote', 'Submission Docs', 'History', 'Messages', 'Related Actions']

  return (
    <div className="min-h-screen bg-white">
      {/* Top Nav */}
      <div className="bg-gray-900 text-white px-6 py-2 flex items-center gap-6 text-sm">
        <span className="font-bold text-lg tracking-wide mr-4">appian</span>
        <span className="text-gray-500 cursor-pointer hover:text-white" onClick={() => setLocation('/')}>MY WORKBENCH</span>
        <span className="text-white border-b-2 border-yellow-500 pb-1 cursor-pointer" onClick={() => setLocation('/submission-list')}>SUBMISSIONS</span>
        <span className="text-gray-500 cursor-pointer hover:text-white">PARTIES</span>
        <span className="text-gray-500 cursor-pointer hover:text-white">MESSAGES</span>
        <span className="text-gray-500 cursor-pointer hover:text-white">REPORTS</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-gray-200 text-xs">Connected Underwriting</span>
          <span className="bg-gray-700 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">DN</span>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <HeadingField text="SUB0403WSGD | Terminus Technologies" size="LARGE" marginBelow="NONE" />
          <div className="flex gap-2">
            <ButtonWidget label="EDIT WATCHERS" style="OUTLINE" color="SECONDARY" />
            <ButtonWidget label="UPDATE STATUS" style="OUTLINE" color="SECONDARY" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mt-4 mb-0">
          {tabLabels.map((label, i) => (
            <button key={i} onClick={() => setActiveTab(i)} className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${activeTab === i ? 'border-yellow-500 text-gray-900 bg-yellow-50' : 'border-transparent text-blue-500 hover:text-gray-700'}`}>{label}</button>
          ))}
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 px-4 py-2 flex items-center justify-between text-sm mt-0">
          <span className="text-gray-700">⚠ Missing TIV and Proposed Dates</span>
          <span className="text-blue-500 cursor-pointer text-xs font-medium">Mark as Closed</span>
        </div>

        {/* AI Assistant */}
        <CardLayout padding="STANDARD" showBorder={true} marginAbove="STANDARD">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900">AI Assistant</div>
              <div className="text-xs text-gray-500">View our AI generated summary below or chat with your submission</div>
            </div>
            <span className="text-blue-500 text-xs font-semibold cursor-pointer">✏️ ASK AI &gt;</span>
          </div>
          <div className="mt-2 border border-gray-200 rounded-sm px-3 py-2 text-xs text-gray-700 bg-gray-50">
            <div className="font-medium mb-1">Summary</div>
            <span className="text-gray-500">AI-generated summary of the submission details and risk assessment will appear here.</span>
          </div>
        </CardLayout>

        {/* SUMMARY TAB */}
        {activeTab === 0 && (
          <div className="grid grid-cols-3 gap-6 mt-6">
            {/* Left: Overview (2 cols) */}
            <div className="col-span-2 space-y-6">
              <div>
                <HeadingField text="Overview" size="MEDIUM" marginBelow="STANDARD" />
                {/* Customer / Broker tabs */}
                <div className="border border-gray-200 rounded-sm">
                  <div className="flex border-b border-gray-200">
                    <button className="px-4 py-2 text-xs font-medium border-b-2 border-gray-900 text-gray-900">Customer Information</button>
                    <button className="px-4 py-2 text-xs font-medium text-blue-500">Broker Information</button>
                  </div>
                  <div className="p-4">
                    <div className="flex gap-8">
                      <div className="space-y-2">
                        <div className="font-semibold text-sm">Terminus Technologies <span className="text-blue-500 cursor-pointer">✏️</span></div>
                        <div className="text-xs text-gray-500">Sandra Singh</div>
                        <div className="text-xs text-gray-500">✉ sandrasingh@terminustechnologies.appiantest.com</div>
                        <div className="text-xs text-gray-500">📞 (548) 667-3451</div>
                        <div className="text-xs text-gray-500">📍 1025 South 6th Street<br/>Springfield, NC 62703</div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
                        <div><span className="text-gray-500">Organization Type</span><br/><span className="text-gray-900">Corporation</span></div>
                        <div><span className="text-gray-500">Incorporation Year</span><br/><span className="text-red-500 font-medium">Missing</span></div>
                        <div><span className="text-gray-500">Employee Count</span><br/><span className="text-red-500 font-medium">Missing</span></div>
                        <div><span className="text-gray-500">NAICS Code</span><br/><span className="text-red-500 font-medium">Missing</span></div>
                        <div><span className="text-gray-500">Secondary NAICS Code</span><br/><span className="text-red-500 font-medium">Missing</span></div>
                        <div><span className="text-gray-500">NAICS Lite ID</span><br/><span className="text-red-500 font-medium">Missing</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Information */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <HeadingField text="Risk Information" size="MEDIUM" marginBelow="NONE" />
                  <span className="text-blue-500 cursor-pointer text-xs">✏️</span>
                </div>
                <div className="border border-gray-200 rounded-sm">
                  <div className="flex border-b border-gray-200">
                    <button className="px-4 py-2 text-xs font-medium border-b-2 border-gray-900 text-gray-900">Commercial Property</button>
                    <button className="px-4 py-2 text-xs font-medium text-blue-500">Commercial Auto</button>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div><span className="text-gray-500">Construction Type</span><br/><span>Fire Resistive</span></div>
                      <div><span className="text-gray-500">Year Built</span><br/><span>2015</span></div>
                      <div><span className="text-gray-500">Roof Age</span><br/><span>9 years</span></div>
                      <div><span className="text-gray-500">Number of Locations</span><br/><span>3</span></div>
                      <div><span className="text-gray-500">Sprinkler System</span><br/><span>Yes</span></div>
                      <div><span className="text-gray-500">Square Footage</span><br/><span>45,000 sq ft</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Submission Details */}
            <div>
              <CardLayout padding="STANDARD" showBorder={true}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">Submission Details</span>
                  <span className="text-blue-500 cursor-pointer text-xs">✏️</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">Commercial Package</span>
                    <TagField tags={[{ text: 'Ready', backgroundColor: 'STANDARD' }]} size="SMALL" marginBelow="NONE" />
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">🔄 Renewals</div>
                  <div className="flex items-center gap-2 text-gray-500">📅 4/1/2026 - 4/21/2026</div>
                  <div className="flex items-center gap-2 text-gray-500">
                    👤 Rithanyhaa Eswaramoorthi
                    <span className="text-blue-500 cursor-pointer ml-2">Reassign</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                    <div><span className="text-gray-500">Estimated Premium</span><br/><span className="text-blue-500 cursor-pointer font-medium">Calculate Premium</span></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><span className="text-gray-500">Expiring Premium</span><br/><span className="text-red-500 font-medium">Missing</span></div>
                      <div><span className="text-gray-500">Total Insurance Value</span><br/><span>$345</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><span className="text-gray-500">Primary/ Excess Status</span><br/><span className="text-red-500 font-medium">Missing</span></div>
                      <div><span className="text-gray-500">Submission Timing</span><br/><span>2 days</span></div>
                    </div>
                    <div><span className="text-gray-500">Insurance Carrier Branch</span><br/><span className="text-red-500 font-medium">Missing</span></div>
                  </div>
                </div>
              </CardLayout>

              <CardLayout padding="STANDARD" showBorder={true} marginAbove="STANDARD">
                <span className="text-sm font-semibold text-gray-900">Related Submissions</span>
                <div className="text-xs text-gray-500 mt-2">No related submissions found.</div>
              </CardLayout>
            </div>
          </div>
        )}

        {/* Other tabs - placeholder */}
        {activeTab > 0 && (
          <div className="mt-6 text-center py-16 text-gray-500">
            <div className="text-2xl mb-2">📋</div>
            <div className="text-sm">{tabLabels[activeTab]} content will appear here.</div>
          </div>
        )}
      </div>
    </div>
  )
}
