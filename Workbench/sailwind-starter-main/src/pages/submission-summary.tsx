import { useState } from 'react'
import {
  CardLayout,
  ButtonWidget,
  TagField,
  Icon,
  StampField,
  MessageBanner,
} from '@pglevy/sailwind'
import { Link } from 'wouter'
import {
  ChevronDown, Phone, Mail, MapPin, Building2,
  FileText, Sparkles, ExternalLink,
} from 'lucide-react'

export default function SubmissionSummary() {
  const [overviewTab, setOverviewTab] = useState<'customer' | 'broker'>('customer')
  const [taskTab, setTaskTab] = useState<'open' | 'completed' | 'not-needed'>('open')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ═══ TOP NAV ═══ */}
      <div className="bg-white border-b border-gray-200 px-6 h-12 flex items-center">
        <span className="text-[#2322F0] font-bold text-[19px] mr-8 tracking-tight">appian</span>
        <nav className="flex h-full">
          {['MY WORKBENCH', 'SUBMISSIONS', 'PARTIES', 'MESSAGES', 'REPORTS'].map((item, i) => (
            <a key={item} href="#"
              className={`px-4 h-full flex items-center text-[13px] font-semibold tracking-wide border-b-[3px] transition-colors ${
                i === 1 ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-500 border-transparent hover:text-gray-900'
              }`}>{item}</a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-[13px] text-gray-500">Connected Underwriting ▾</span>
          <div className="w-8 h-8 rounded-full bg-[#2322F0] text-white flex items-center justify-center text-[13px] font-semibold">DN</div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="px-6 pt-5 pb-8">
        <Link href="/insurance-workspace" className="text-[#2322F0] hover:underline text-[13px] mb-3 inline-block">← Back to Workspace</Link>

        {/* ── Submission Header ── */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-[22px] font-bold text-gray-900">SUB0326STKW | Universal Exports</h1>
          </div>
          <div className="flex items-center gap-3 text-[12px] text-gray-400">
            <span>First Modified: 4/3/2026</span>
            <span>·</span>
            <span>Last Modified: 4/14/2026</span>
          </div>
        </div>

        {/* ── Tab Navigation ── */}
        <div className="flex border-b border-gray-200 mb-4 gap-0">
          {['Summary', 'Risk Details', 'Financial Performance', 'Quote', 'Submission Docs', 'History', 'Messages', 'Sanctions Details', 'Related Actions'].map((tab, i) => (
            <button key={tab}
              className={`px-3 py-2 text-[12px] font-medium border-b-[3px] -mb-[1px] transition-colors whitespace-nowrap ${
                i === 0 ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}>{tab}</button>
          ))}
        </div>

        {/* ── Alert Banner ── */}
        <MessageBanner
          primaryText="Duplicate Submission Detected"
          icon="warning"
          backgroundColor="WARN"
          highlightColor="WARN"
          marginBelow="STANDARD"
        />

        {/* ── AI Assistant ── */}
        <CardLayout padding="STANDARD" showShadow={true} marginBelow="STANDARD">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-[#2322F0]" />
            <span className="text-[15px] font-bold text-gray-900">AI Assistant</span>
          </div>
          <p className="text-[13px] text-gray-500">Get AI-generated summaries and insights on your submission.</p>
          <div className="flex gap-2 mt-2">
            <ButtonWidget label="Summary" style="OUTLINE" color="ACCENT" size="SMALL" />
          </div>
        </CardLayout>

        <div className="flex gap-6">
          {/* ══════ LEFT: Main Content ══════ */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* ── Overview Section ── */}
            <div>
              <p className="text-[15px] font-bold text-gray-900 mb-3">Overview</p>
              {/* Customer / Broker tabs */}
              <div className="flex border-b border-gray-200 mb-0">
                <button onClick={() => setOverviewTab('customer')}
                  className={`px-4 pb-2 text-[13px] font-medium border-b-[3px] -mb-[1px] transition-colors ${overviewTab === 'customer' ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Customer Information</button>
                <button onClick={() => setOverviewTab('broker')}
                  className={`px-4 pb-2 text-[13px] font-medium border-b-[3px] -mb-[1px] transition-colors ${overviewTab === 'broker' ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Broker Information</button>
              </div>

              <CardLayout padding="MORE" showShadow={true}>
                {overviewTab === 'customer' && (
                  <div className="grid grid-cols-3 gap-8">
                    {/* Col 1: Customer Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[15px] font-bold text-[#2322F0]">Universal Exports</span>
                        <ExternalLink size={12} className="text-[#2322F0]" />
                      </div>
                      <p className="text-[12px] text-gray-400">Customer</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[13px] text-gray-700">
                          <Building2 size={13} className="text-gray-400" />
                          <span>Appian Headquarters, 7950 Jones Branch Dr</span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-gray-700">
                          <Phone size={13} className="text-gray-400" />
                          <span>(571) 412-7900</span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-gray-700">
                          <Mail size={13} className="text-gray-400" />
                          <span>info@universalexports.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-gray-700">
                          <MapPin size={13} className="text-gray-400" />
                          <span>McLean, VA 22102</span>
                        </div>
                      </div>
                    </div>
                    {/* Col 2: Organization Info */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-[12px] text-gray-400">Organization Type</p>
                          <p className="text-[13px] text-gray-900">Corporation</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[12px] text-gray-400">Effective Date</p>
                        <p className="text-[13px] text-gray-900">4/1/2026</p>
                      </div>
                      <div>
                        <p className="text-[12px] text-gray-400">Expiration Date</p>
                        <p className="text-[13px] text-gray-900">4/1/2027</p>
                      </div>
                      <div>
                        <p className="text-[12px] text-gray-400">Insured NAICS Code</p>
                        <p className="text-[13px] text-gray-900">481 - Air Transportation</p>
                      </div>
                    </div>
                    {/* Col 3: Additional Info */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-[12px] text-gray-400">Incorporation Year</p>
                        <p className="text-[13px] text-gray-900">2001</p>
                      </div>
                      <div>
                        <p className="text-[12px] text-gray-400">Description</p>
                        <p className="text-[13px] text-gray-900">113 - Small Production or Manufacture</p>
                      </div>
                      <div>
                        <p className="text-[12px] text-gray-400">SIC Code</p>
                        <p className="text-[13px] text-gray-900">Agriculture, Forestry, Fishing or Hunting</p>
                      </div>
                    </div>
                  </div>
                )}
                {overviewTab === 'broker' && (
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <p className="text-[15px] font-bold text-[#2322F0]">Amal Chen</p>
                      <p className="text-[12px] text-gray-400">Broker</p>
                      <div className="flex items-center gap-2 text-[13px] text-gray-700">
                        <Building2 size={13} className="text-gray-400" />
                        <span>Universal Exports — Main Office</span>
                      </div>
                      <div className="flex items-center gap-2 text-[13px] text-gray-700">
                        <Phone size={13} className="text-gray-400" />
                        <span>(555) 234-5678</span>
                      </div>
                      <div className="flex items-center gap-2 text-[13px] text-gray-700">
                        <Mail size={13} className="text-gray-400" />
                        <span>amal.chen@universalexports.com</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[12px] text-gray-400">Office Name</p>
                      <p className="text-[13px] text-gray-900">Universal Exports — Main Office</p>
                      <p className="text-[12px] text-gray-400 mt-3">Commission Rate</p>
                      <p className="text-[13px] text-gray-900">12%</p>
                    </div>
                  </div>
                )}
              </CardLayout>
            </div>

            {/* ── Risk Information ── */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[15px] font-bold text-gray-900">Risk Information</p>
                <Icon icon="edit" size="SMALL" color="ACCENT" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                {/* Submission Score */}
                <CardLayout padding="MORE" showShadow={true}>
                  <p className="text-[13px] font-semibold text-gray-900 mb-3">Submission Score</p>
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#FFB300" strokeWidth="4"
                          strokeDasharray="55 45" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[19px] font-bold text-gray-900">55%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-[12px] text-gray-400">Customer Tier</p>
                        <p className="text-[13px] text-gray-900">B+</p>
                      </div>
                      <div>
                        <p className="text-[12px] text-gray-400">Risk Score</p>
                        <p className="text-[13px] text-gray-900">Medium</p>
                      </div>
                      <div>
                        <p className="text-[12px] text-gray-400">Submission Channel</p>
                        <p className="text-[13px] text-gray-900">Email</p>
                      </div>
                    </div>
                  </div>
                </CardLayout>

                {/* Exposure and Coverage */}
                <CardLayout padding="MORE" showShadow={true}>
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-[13px] font-semibold text-gray-900">Exposure and Coverage Information</p>
                    <Icon icon="info" size="SMALL" color="SECONDARY" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[12px] text-gray-400">Total Insured Value</p>
                      <p className="text-[15px] font-bold text-gray-900">$1,500,000</p>
                    </div>
                    <div>
                      <p className="text-[12px] text-gray-400">Annual Premium</p>
                      <p className="text-[15px] font-bold text-gray-900">$7,500</p>
                    </div>
                  </div>
                  <p className="text-[13px] font-semibold text-gray-900 mb-2">Coverage Details</p>
                  {/* Coverage table header */}
                  <div className="grid grid-cols-4 gap-2 py-2 border-b border-gray-200">
                    <p className="text-[11px] font-semibold text-gray-500 uppercase">Coverage</p>
                    <p className="text-[11px] font-semibold text-gray-500 uppercase">Per Occ. Limit</p>
                    <p className="text-[11px] font-semibold text-gray-500 uppercase">Aggregate Limit</p>
                    <p className="text-[11px] font-semibold text-gray-500 uppercase">Retention</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2 border-b border-gray-100">
                    <p className="text-[13px] text-gray-900">D&O</p>
                    <p className="text-[13px] text-gray-700">$1,000,000</p>
                    <p className="text-[13px] text-gray-700">$2,000,000</p>
                    <p className="text-[13px] text-gray-700">$25,000</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 py-2">
                    <p className="text-[13px] text-gray-900">EPL</p>
                    <p className="text-[13px] text-gray-700">$500,000</p>
                    <p className="text-[13px] text-gray-700">$1,000,000</p>
                    <p className="text-[13px] text-gray-700">$10,000</p>
                  </div>
                </CardLayout>
              </div>
            </div>

            {/* ── Loss History ── */}
            <CardLayout padding="MORE" showShadow={true}>
              <p className="text-[13px] font-semibold text-gray-900 mb-3">Loss History</p>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText size={32} className="text-gray-300 mb-2" />
                <p className="text-[13px] text-gray-500">No loss history information available.</p>
                <button className="text-[13px] text-[#2322F0] hover:underline mt-1">Update Information</button>
              </div>
            </CardLayout>

            {/* ── Tasks Section ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[15px] font-bold text-gray-900">Tasks</p>
                <ButtonWidget label="CREATE TASK" style="OUTLINE" color="ACCENT" size="SMALL" />
              </div>
              {/* Task tabs */}
              <div className="flex border-b border-gray-200 mb-0">
                {([
                  { key: 'open' as const, label: 'Open' },
                  { key: 'completed' as const, label: 'Completed' },
                  { key: 'not-needed' as const, label: 'Last Not Needed' },
                ]).map(t => (
                  <button key={t.key} onClick={() => setTaskTab(t.key)}
                    className={`px-4 pb-2 text-[13px] font-medium border-b-[3px] -mb-[1px] transition-colors ${taskTab === t.key ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>{t.label}</button>
                ))}
              </div>
              <CardLayout padding="STANDARD" showShadow={true}>
                {/* Search + filters */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center border border-gray-300 rounded px-2 py-1 bg-white">
                    <span className="text-gray-400 text-[13px] mr-1">🔍</span>
                    <input type="text" placeholder="Search Open" className="text-[13px] outline-none w-32 bg-transparent" />
                  </div>
                  <ButtonWidget label="SEARCH" style="OUTLINE" color="ACCENT" size="SMALL" />
                  <select className="text-[13px] border border-gray-300 rounded px-2 py-1 text-gray-600"><option>TYPE Any</option></select>
                  <select className="text-[13px] border border-gray-300 rounded px-2 py-1 text-gray-600"><option>ASSIGNEE Any</option></select>
                </div>
                {/* Task table */}
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {['Alerts', 'Type', 'Assignee', '', 'Due Date', 'Completed On'].map(h => (
                        <th key={h} className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide py-2 pr-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[13px] text-gray-400">No tasks available</td>
                    </tr>
                  </tbody>
                </table>
              </CardLayout>
            </div>
          </div>

          {/* ══════ RIGHT: Sidebar ══════ */}
          <div className="w-[300px] flex-shrink-0 space-y-4">

            {/* Submission Details */}
            <CardLayout padding="STANDARD" showShadow={true}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[15px] font-bold text-gray-900">Submission Details</p>
                <TagField tags={[{ text: "Ready to Quote", backgroundColor: "POSITIVE" }]} size="SMALL" marginBelow="NONE" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <StampField icon="briefcase" backgroundColor="#E8E7FD" contentColor="#2322F0" size="SMALL" marginBelow="NONE" />
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900">Management Liability</p>
                    <p className="text-[12px] text-gray-400">Line of Business</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StampField icon="calendar" backgroundColor="#D4EDDA" contentColor="#15803d" size="SMALL" marginBelow="NONE" />
                  <div>
                    <p className="text-[13px] text-gray-900">4/1/2026 — 4/1/2027</p>
                    <p className="text-[12px] text-gray-400">Policy Period</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StampField icon="users" backgroundColor="#E2E3E5" contentColor="#374151" size="SMALL" marginBelow="NONE" />
                  <div>
                    <p className="text-[13px] text-gray-900">ISU Sample Assignment Group</p>
                    <p className="text-[12px] text-[#2322F0] cursor-pointer hover:underline">Reassign</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-3 space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span className="text-gray-400">Expiring Premium</span>
                  <span className="text-gray-900">—</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-gray-400">Submission Type</span>
                  <span className="text-gray-900">New Business</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-gray-400">Primary Product</span>
                  <span className="text-gray-900">D&O</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-gray-400">Segment</span>
                  <span className="text-gray-900">Middle Market</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-gray-400">Creation Path</span>
                  <span className="text-gray-900">Manual</span>
                </div>
              </div>
            </CardLayout>

            {/* Related Submissions */}
            <CardLayout padding="STANDARD" showShadow={true}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[15px] font-bold text-gray-900">Related Submissions</p>
                <TagField tags={[{ text: "1", backgroundColor: "ACCENT" }]} size="SMALL" marginBelow="NONE" />
              </div>
              <div className="flex items-center gap-3 py-2">
                <StampField icon="file-text" backgroundColor="#E8E7FD" contentColor="#2322F0" size="SMALL" marginBelow="NONE" />
                <div>
                  <p className="text-[13px] font-semibold text-[#2322F0] hover:underline cursor-pointer">SUB0401XUSC</p>
                  <p className="text-[12px] text-gray-400">Renewal · Bound on 4/1/2025</p>
                </div>
              </div>
            </CardLayout>

            {/* Open Alerts */}
            <CardLayout padding="STANDARD" showShadow={true}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[15px] font-bold text-gray-900">Open Alerts</p>
                <span className="text-[12px] text-gray-400">1 - 1 of 1</span>
              </div>
              <div className="flex items-start gap-2.5 py-2">
                <div className="mt-0.5"><Icon icon="circle-alert" size="SMALL" color="ACCENT" /></div>
                <div>
                  <p className="text-[13px] font-semibold text-[#2322F0]">Duplicate Submission Detected</p>
                  <p className="text-[12px] text-gray-400">Match found with SUB0401XUSC</p>
                </div>
                <ChevronDown size={14} className="text-gray-400 ml-auto" />
              </div>
            </CardLayout>

            {/* Markers */}
            <CardLayout padding="STANDARD" showShadow={true}>
              <p className="text-[15px] font-bold text-gray-900 mb-3">Markers</p>
              <div className="flex flex-wrap gap-2">
                <TagField tags={[
                  { text: "All", backgroundColor: "ACCENT" },
                  { text: "Add Note", backgroundColor: "SECONDARY" },
                ]} size="SMALL" marginBelow="NONE" />
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span className="text-gray-400">Submission</span>
                  <span className="text-gray-900">1</span>
                </div>
                <div className="flex justify-between text-[12px]">
                  <span className="text-gray-400">Tasks</span>
                  <span className="text-gray-900">0</span>
                </div>
              </div>
            </CardLayout>

            {/* Recent Activity */}
            <CardLayout padding="STANDARD" showShadow={true}>
              <p className="text-[15px] font-bold text-gray-900 mb-3">Recent Activity</p>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#2322F0] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] text-gray-900">Referral: TIV exceeds authority limit</p>
                    <p className="text-[12px] text-gray-400">4/14/2026 · System</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] text-gray-900">Status changed to Ready to Quote</p>
                    <p className="text-[12px] text-gray-400">4/12/2026 · Anna Underwriter</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] text-gray-900">Document ACORD 125 extracted</p>
                    <p className="text-[12px] text-gray-400">4/10/2026 · System</p>
                  </div>
                </div>
              </div>
            </CardLayout>
          </div>
        </div>
      </div>
    </div>
  )
}
