import { useState } from 'react'
import {
  CardLayout,
  ButtonWidget,
  TagField,
  ProgressBar,
  RichTextDisplayField,
  TextItem,
  Icon,
  StampField,
  DialogField,
  DropdownField,
  TextField,
  RadioButtonField,
} from '@pglevy/sailwind'
import { Link } from 'wouter'
import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from 'recharts'
import {
  List, LayoutGrid, Search, FileText,
  AlertTriangle, X, ChevronRight, ChevronDown,
  Clock, User, Users,
  Phone, Mail, MapPin, Building2, Sparkles, ExternalLink,
  PanelRightClose, PanelRightOpen,
} from 'lucide-react'

// ── Submission Data ──
const submissions = [
  { id: 'SUB-10482', title: 'Acme Corp Property Renewal', type: 'Property › Commercial Package', status: 'In Review', statusColor: 'ACCENT' as const, progress: 65, due: 'Due in 3 days', assignee: 'Anna Underwriter' },
  { id: 'SUB-10479', title: 'TechStart Inc D&O Coverage', type: 'Mgmt Liability › New Business', status: 'Ready to Quote', statusColor: 'POSITIVE' as const, progress: 90, due: 'Due in 1 day', assignee: 'Anna Underwriter' },
  { id: 'SUB-10475', title: 'Global Logistics Auto Fleet', type: 'Auto › Commercial Package', status: 'Missing Info', statusColor: 'NEGATIVE' as const, progress: 30, due: 'Due in 7 days', assignee: 'Anna Underwriter' },
  { id: 'SUB-10471', title: 'Riverside Hotels Property', type: 'Property › Renewal', status: 'On Hold', statusColor: 'SECONDARY' as const, progress: 45, due: 'Due in 14 days', assignee: 'Anna Underwriter' },
  { id: 'SUB-10468', title: 'Summit Construction GL', type: 'General Liability › New Business', status: 'Ready', statusColor: 'POSITIVE' as const, progress: 15, due: 'Due in 10 days', assignee: 'Anna Underwriter' },
  { id: 'SUB-10465', title: 'Pacific Retail Workers Comp', type: 'Workers Comp › Renewal', status: 'Processing', statusColor: 'ACCENT' as const, progress: 50, due: 'Due in 20 days', assignee: 'Anna Underwriter' },
  { id: 'SUB-10460', title: 'Metro Foods Property', type: 'Property › New Business', status: 'In Review', statusColor: 'ACCENT' as const, progress: 40, due: 'Due in 12 days', assignee: 'Anna Underwriter' },
  { id: 'SUB-10458', title: 'Coastal Shipping GL', type: 'General Liability › Renewal', status: 'Ready', statusColor: 'POSITIVE' as const, progress: 20, due: 'Due in 18 days', assignee: 'Anna Underwriter' },
]

const tasks = [
  { sub: 'SUB-10482', type: 'Upload Document', title: 'Upload loss runs for Acme Corp', due: 'Due 2 days ago', status: 'OPEN', icon: 'file-text', bgColor: '#E8E7FD', iconColor: '#2322F0' },
  { sub: 'SUB-10479', type: 'Sanctions Check', title: 'Complete sanctions review for TechStart', due: 'Due today', status: 'OPEN', icon: 'search', bgColor: '#FDDEDE', iconColor: '#b91c1c' },
  { sub: 'SUB-10475', type: 'Confirmation', title: 'Confirm broker details for Global Logistics', due: 'Due in 3 days', status: 'OPEN', icon: 'circle-check', bgColor: '#D4EDDA', iconColor: '#15803d' },
  { sub: 'SUB-10482', type: 'Referral', title: 'Manager referral — TIV exceeds authority', due: 'Due in 5 days', status: 'OPEN', icon: 'arrow-up-right', bgColor: '#E8E7FD', iconColor: '#2322F0' },
  { sub: 'SUB-10468', type: 'Upload Document', title: 'Upload ACORD 125 for Summit Construction', due: 'Due in 5 days', status: 'COMPLETE', icon: 'file-text', bgColor: '#D4EDDA', iconColor: '#15803d' },
  { sub: 'SUB-10471', type: 'Document Review', title: 'Review extracted ACORD 140 data', due: 'Due in 8 days', status: 'COMPLETE', icon: 'clipboard', bgColor: '#E2E3E5', iconColor: '#374151' },
]

const alerts = [
  { title: 'New document received', sub: 'SUB-10482', date: '2 hours ago' },
  { title: 'Duplicate Submission Detected', sub: 'SUB-10475', date: '4/3/2026' },
  { title: 'Missing TIV and Proposed Dates', sub: 'SUB-10471', date: '4/3/2026' },
  { title: 'New broker message received', sub: 'SUB-10479', date: '4/2/2026' },
  { title: 'Sanctions match found', sub: 'SUB-10468', date: '4/1/2026' },
]

// ── Chart Data ──
const pieData = [
  { name: 'Ready', value: 8, color: '#2322F0' },
  { name: 'Missing Critical Info', value: 4, color: '#00BFA5' },
  { name: 'Hold', value: 6, color: '#FFB300' },
  { name: 'In Review', value: 14, color: '#1A237E' },
  { name: 'Ready to Quote', value: 5, color: '#7B1FA2' },
  { name: 'Marked for Renewal', value: 3, color: '#66BB6A' },
]

const lobData = [
  { name: 'Property', count: 18 },
  { name: 'Auto', count: 12 },
  { name: 'GL', count: 9 },
  { name: 'WC', count: 7 },
  { name: 'Mgmt Liab.', count: 5 },
]

const workloadData = [
  { name: 'Anna U.', inProgress: 8, overdue: 2 },
  { name: 'Dhruva K.', inProgress: 6, overdue: 1 },
  { name: 'John W.', inProgress: 4, overdue: 0 },
  { name: 'Riley H.', inProgress: 3, overdue: 2 },
  { name: 'Robert K.', inProgress: 2, overdue: 1 },
]

const cycleTimeData = [
  { month: 'Nov', days: 6.1 },
  { month: 'Dec', days: 5.8 },
  { month: 'Jan', days: 5.2 },
  { month: 'Feb', days: 4.9 },
  { month: 'Mar', days: 4.5 },
  { month: 'Apr', days: 4.2 },
]


// ── List View Data ──
const listData = [
  { id: 'SUB-10482', group: 'ISU Sample Assignment Group', alerts: 0, premium: '', status: 'In Review', statusColor: 'ACCENT' as const, channel: 'Email', docs: 1, customer: 'Acme Corp', broker: 'rhaenyra targaryen', lob: 'Property', renewalDate: '', expDate: '6/26/2026', expLabel: '', score: 54 },
  { id: 'SUB-10479', group: 'ISU Sample Assignment Group', alerts: 2, premium: '', status: 'Ready', statusColor: 'POSITIVE' as const, channel: 'Manual', docs: 0, customer: 'Universal Exports', broker: 'Amal Chen', lob: 'Commercial Package', renewalDate: '4/8/2026', expDate: '7/23/2026', expLabel: 'in 99 Days', score: 61 },
  { id: 'SUB-10475', group: 'ISU Sample Assignment Group', alerts: 2, premium: '', status: 'In Review', statusColor: 'ACCENT' as const, channel: 'Manual', docs: 3, customer: '', broker: 'PRIMARY', lob: 'Management Liability', renewalDate: '', expDate: '', expLabel: '', score: 5 },
  { id: 'SUB-10471', group: 'ISU Sample Assignment Group', alerts: 3, premium: '', status: 'Ready', statusColor: 'POSITIVE' as const, channel: 'Manual', docs: 3, customer: 'Universal Exports', broker: 'Amal Chen', lob: 'Commercial Package', renewalDate: '', expDate: '', expLabel: '', score: 61 },
  { id: 'SUB-10468', group: 'ISU Sample Assignment Group', alerts: 3, premium: '', status: 'Ready', statusColor: 'POSITIVE' as const, channel: 'Manual', docs: 1, customer: 'Terminus Technologies', broker: 'Shelby Flynn', lob: 'Commercial Package', renewalDate: '', expDate: '', expLabel: '', score: 27 },
  { id: 'SUB-10465', group: 'ISU Sample Assignment Group', alerts: 1, premium: '$678', status: 'Marked For Renewal', statusColor: 'ACCENT' as const, channel: 'Manual', docs: 0, customer: 'Smile Property and Travel', broker: 'Orlando Smith', lob: 'Commercial Package', renewalDate: '', expDate: '5/16/2026', expLabel: 'in 31 Days', score: 62 },
]

// ── Calendar events ──

// ── Calendar Component ──
function ListView() {
  const [listTab, setListTab] = useState<'modified' | 'new' | 'renewals'>('modified')
  return (
    <div>
      {/* Sub-tabs: Last Modified / New Business / Renewals */}
      <div className="flex border-b border-gray-200 mb-4">
        {([
          { key: 'modified' as const, label: 'Last Modified', count: 135 },
          { key: 'new' as const, label: 'New Business', count: 91 },
          { key: 'renewals' as const, label: 'Renewals', count: 44 },
        ]).map(t => (
          <button key={t.key} onClick={() => setListTab(t.key)}
            className={`px-4 pb-2 text-[13px] font-semibold border-b-[3px] -mb-[1px] transition-colors ${listTab === t.key ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>
            {t.label} <span className="ml-1 text-gray-400 font-normal">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <div className="flex items-center border border-gray-300 rounded px-2 py-1 bg-white">
          <span className="text-gray-400 text-[13px] mr-1"><Search size={12} /></span>
          <input type="text" placeholder="Search Submissions" className="text-[13px] outline-none w-36 bg-transparent" />
        </div>
        <ButtonWidget label="SEARCH" style="OUTLINE" color="ACCENT" size="SMALL" />
        <select className="text-[13px] border border-gray-300 rounded px-2 py-1 text-gray-600"><option>STATUS  Any</option></select>
        <select className="text-[13px] border border-gray-300 rounded px-2 py-1 text-gray-600"><option>ASSIGNEE  Any</option></select>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <select className="text-[13px] border border-gray-300 rounded px-2 py-1 text-gray-600"><option>LINE OF BUSINESS  Any</option></select>
        <select className="text-[13px] border border-gray-300 rounded px-2 py-1 text-gray-600"><option>EXPIRATION DATE  Any - Any</option></select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              {['Submission', 'Expiring Premium', 'Status', 'Channel', 'Customer', 'Broker', 'Line of Business', 'Renewal Effective Date', 'Expiration Date', 'Score'].map(h => (
                <th key={h} className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide py-2 pr-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listData.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 pr-3">
                  <a href="#" className="text-[13px] font-semibold text-[#2322F0] hover:underline">{row.id}</a>
                  <p className="text-[12px] text-gray-400">{row.group}</p>
                  {row.alerts > 0 && <p className="text-[12px] text-red-500 flex items-center gap-0.5"><AlertTriangle size={9} /> {row.alerts} Alert{row.alerts > 1 ? 's' : ''}</p>}
                </td>
                <td className="py-3 pr-3 text-[13px] text-gray-700">{row.premium}</td>
                <td className="py-3 pr-3">
                  <TagField tags={[{ text: row.status, backgroundColor: row.statusColor }]} size="SMALL" marginBelow="NONE" />
                </td>
                <td className="py-3 pr-3">
                  <p className="text-[13px] text-gray-700">{row.channel}</p>
                  <p className="text-[12px] text-gray-400 flex items-center gap-0.5"><FileText size={9} /> {row.docs} Document{row.docs !== 1 ? 's' : ''}</p>
                </td>
                <td className="py-3 pr-3 text-[13px] text-[#2322F0]">{row.customer}</td>
                <td className="py-3 pr-3 text-[13px] text-[#2322F0]">{row.broker}</td>
                <td className="py-3 pr-3 text-[13px] text-gray-700">{row.lob}</td>
                <td className="py-3 pr-3 text-[13px] text-gray-700">{row.renewalDate}</td>
                <td className="py-3 pr-3">
                  <p className="text-[13px] text-gray-700">{row.expDate}</p>
                  {row.expLabel && <p className="text-[12px] text-gray-400">{row.expLabel}</p>}
                </td>
                <td className="py-3 pr-3 text-[13px] font-semibold text-[#2322F0]">{row.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Create Submission Wizard ──
function CreateSubmissionWizard({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: () => void }) {
  const [step, setStep] = useState(1)
  const [subType, setSubType] = useState<string | null>(null)
  const [lob, setLob] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [customerType, setCustomerType] = useState('existing')
  const [customerSearch, setCustomerSearch] = useState('')
  const [officeType, setOfficeType] = useState('existing')
  const [officeSearch, setOfficeSearch] = useState('')
  const [brokerType, setBrokerType] = useState('existing')
  const [brokerSearch, setBrokerSearch] = useState('')

  const resetAndClose = () => {
    setStep(1); setSubType(null); setLob(null); setTitle(''); setDescription('')
    setCustomerType('existing'); setCustomerSearch(''); setOfficeType('existing')
    setOfficeSearch(''); setBrokerType('existing'); setBrokerSearch('')
    onClose()
  }

  return (
    <DialogField open={open} onOpenChange={(o) => { if (!o) resetAndClose() }} title="" width="FIT" height="FIT" showCloseButton={false}>
      <div className="flex flex-col p-6 rounded-md" style={{ backgroundColor: '#fafafc', height: '70vh', maxHeight: '70vh' }}>
        {/* Header */}
        <div className="mb-1">
          <p className="text-[24px] font-bold text-gray-900">Create Submission</p>
          <p className="text-[13px] text-gray-400 mt-1">
            {step === 1 ? 'Submission Details' : 'Customer & Broker Details'} | Step {step} of 2
          </p>
        </div>
        <div className="border-t border-gray-200 my-3" />

        {/* Content — grows to fill, scrollable */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {/* ── Step 1: Submission Details ── */}
          {step === 1 && (
            <div className="space-y-5">
              <DropdownField
                label="Submission Type"
                choiceLabels={['New Business', 'Renewals', 'Directors & Officers']}
                choiceValues={['new-business', 'renewals', 'directors-officers']}
                value={subType}
                saveInto={(v) => setSubType(v)}
                placeholder="Select Submission Type"
                required={true}
              />
              <DropdownField
                label="Line of Business"
                choiceLabels={['Property', 'Auto', 'General Liability', 'Workers Comp', 'Management Liability', 'Commercial Package']}
                choiceValues={['property', 'auto', 'gl', 'wc', 'mgmt-liability', 'commercial-package']}
                value={lob}
                saveInto={(v) => setLob(v)}
                placeholder="Select Line of Business"
                required={true}
              />
              <TextField
                label="Title"
                value={title}
                saveInto={(v) => setTitle(v)}
                placeholder="Sample Submission Title"
                required={true}
              />
              <div>
                <p className="text-[13px] font-semibold text-gray-900 mb-1">Description</p>
                <div className="border border-gray-300 rounded">
                  <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-200 bg-gray-50">
                    <button className="px-1.5 py-0.5 text-[12px] font-bold text-gray-600 hover:bg-gray-200 rounded">B</button>
                    <button className="px-1.5 py-0.5 text-[12px] italic text-gray-600 hover:bg-gray-200 rounded">I</button>
                    <button className="px-1.5 py-0.5 text-[12px] underline text-gray-600 hover:bg-gray-200 rounded">U</button>
                    <span className="w-px h-4 bg-gray-300 mx-1" />
                    <button className="px-1.5 py-0.5 text-[12px] text-gray-600 hover:bg-gray-200 rounded">• List</button>
                    <button className="px-1.5 py-0.5 text-[12px] text-gray-600 hover:bg-gray-200 rounded">1. List</button>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    className="w-full px-3 py-2 text-[13px] resize-none h-24 outline-none bg-transparent"
                  />
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-900 mb-2">Supporting Documents</p>
                <div className="border border-dashed border-gray-300 rounded px-4 py-3 flex items-center gap-3">
                  <ButtonWidget label="UPLOAD" style="OUTLINE" color="SECONDARY" size="SMALL" />
                  <span className="text-[13px] text-gray-400 italic">Drop files here</span>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Customer & Broker ── */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Customer Information */}
              <div>
                <p className="text-[15px] font-bold text-gray-900 mb-2">Customer Information</p>
                <div className="border border-gray-200 rounded p-4 space-y-3 bg-white">
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900 mb-1">Customer</p>
                    <RadioButtonField
                      choiceLabels={['Existing', 'New']}
                      choiceValues={['existing', 'new']}
                      value={customerType}
                      saveInto={(v) => setCustomerType(v)}
                      labelPosition="COLLAPSED"
                      choiceLayout="COMPACT"
                    />
                  </div>
                  <TextField
                    label="Customer and Contact Information"
                    value={customerSearch}
                    saveInto={(v) => setCustomerSearch(v)}
                    placeholder="Search customers or contacts"
                    required={true}
                  />
                </div>
              </div>

              {/* Broker Information */}
              <div>
                <p className="text-[15px] font-bold text-gray-900 mb-2">Broker Information</p>
                <div className="border border-gray-200 rounded p-4 space-y-3 bg-white">
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900 mb-1">Office Name <span className="text-red-500">*</span></p>
                    <RadioButtonField
                      choiceLabels={['Existing', 'New']}
                      choiceValues={['existing', 'new']}
                      value={officeType}
                      saveInto={(v) => setOfficeType(v)}
                      labelPosition="COLLAPSED"
                      choiceLayout="COMPACT"
                    />
                  </div>
                  <TextField
                    value={officeSearch}
                    saveInto={(v) => setOfficeSearch(v)}
                    placeholder="Search Offices"
                    labelPosition="COLLAPSED"
                  />
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900 mb-1">Broker Name <span className="text-red-500">*</span></p>
                    <RadioButtonField
                      choiceLabels={['Existing', 'New']}
                      choiceValues={['existing', 'new']}
                      value={brokerType}
                      saveInto={(v) => setBrokerType(v)}
                      labelPosition="COLLAPSED"
                      choiceLayout="COMPACT"
                    />
                  </div>
                  <TextField
                    value={brokerSearch}
                    saveInto={(v) => setBrokerSearch(v)}
                    placeholder="Search Brokers"
                    labelPosition="COLLAPSED"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 mt-6 pt-4 flex justify-between">
          <div className="flex gap-2">
            {step === 2 && (
              <ButtonWidget label="BACK" style="OUTLINE" color="SECONDARY" size="SMALL" onClick={() => setStep(1)} />
            )}
            <ButtonWidget label="CANCEL" style="OUTLINE" color="ACCENT" size="SMALL" onClick={resetAndClose} />
          </div>
          <ButtonWidget
            label={step === 2 ? 'CREATE' : 'NEXT'}
            style="SOLID"
            color="ACCENT"
            size="SMALL"
            onClick={step === 1 ? () => setStep(2) : () => { resetAndClose(); onCreate(); }}
          />
        </div>
      </div>
    </DialogField>
  )
}

// ── Submission Summary View (inline) ──
function SubmissionSummaryView({ onBack, subId, subTitle }: { onBack: () => void; subId: string; subTitle: string }) {
  const [overviewTab, setOverviewTab] = useState<'customer' | 'broker'>('customer')
  const [taskTab, setTaskTab] = useState<'open' | 'completed' | 'not-needed'>('open')
  const [riskTab, setRiskTab] = useState<'score' | 'coverage' | 'loss'>('score')
  const [chatInput, setChatInput] = useState('')
  const [chatOpen, setChatOpen] = useState(true)
  const [chatMessages, setChatMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: 'Hi! I can help you with this submission. What would you like to know?' },
  ])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setChatMessages(prev => [...prev, { role: 'user', text }, { role: 'bot', text: 'Analyzing submission data... In production, this would provide real-time insights from the record.' }])
    setChatInput('')
  }

  return (
    <>
      {/* Fixed header section */}
      <div className="sticky top-12 z-40 bg-gray-50 px-6 pt-5 pb-0">
        <button onClick={onBack} className="text-[#2322F0] hover:underline text-[13px] mb-3 inline-block">← Back to Workspace</button>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[22px] font-bold text-gray-900">{subId} | {subTitle}</h1>
            <p className="text-[12px] text-gray-400 mt-0.5">Created 4/3/2026 · Last modified 4/14/2026</p>
          </div>
          <TagField tags={[{ text: "Ready to Quote", backgroundColor: "POSITIVE" }]} size="STANDARD" marginBelow="NONE" />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 gap-0">
          {['Summary', 'Risk Details', 'Financial Performance', 'Quote', 'Submission Docs', 'History', 'Messages', 'Sanctions', 'Related Actions'].map((tab, i) => (
            <button key={tab} className={`px-3 py-2 text-[12px] font-medium border-b-[3px] -mb-[1px] transition-colors whitespace-nowrap ${i === 0 ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>{tab}</button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-4 pb-8">

        {/* ═══ 2-PANE: Left content | Right AI Chat ═══ */}
        <div className="flex gap-6">

          {/* ══ LEFT: All content ══ */}
          <div className="flex-[3] min-w-0">

            {/* KPI Strip */}
            <div className="grid grid-cols-5 gap-4 mb-5">
          <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
            <div className="flex items-center gap-3">
              <StampField icon="briefcase" backgroundColor="#E8E7FD" contentColor="#2322F0" size="SMALL" marginBelow="NONE" />
              <div><p className="text-[11px] text-gray-400">Line of Business</p><p className="text-[13px] font-semibold text-gray-900">Mgmt Liability</p></div>
            </div>
          </CardLayout>
          <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
            <div className="flex items-center gap-3">
              <StampField icon="calendar" backgroundColor="#D4EDDA" contentColor="#15803d" size="SMALL" marginBelow="NONE" />
              <div><p className="text-[11px] text-gray-400">Policy Period</p><p className="text-[13px] font-semibold text-gray-900">4/1/26 — 4/1/27</p></div>
            </div>
          </CardLayout>
          <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
            <div className="flex items-center gap-3">
              <StampField icon="users" backgroundColor="#E2E3E5" contentColor="#374151" size="SMALL" marginBelow="NONE" />
              <div><p className="text-[11px] text-gray-400">Assignment Group</p><p className="text-[13px] font-semibold text-gray-900">ISU Sample</p><p className="text-[11px] text-[#2322F0] cursor-pointer hover:underline">Reassign</p></div>
            </div>
          </CardLayout>
          <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
            <div className="flex items-center gap-3">
              <StampField icon="file-text" backgroundColor="#FDDEDE" contentColor="#b91c1c" size="SMALL" marginBelow="NONE" />
              <div><p className="text-[11px] text-gray-400">Submission Type</p><p className="text-[13px] font-semibold text-gray-900">New Business</p></div>
            </div>
          </CardLayout>
          <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
            <div className="flex items-center gap-3">
              <StampField icon="shield" backgroundColor="#E8E7FD" contentColor="#2322F0" size="SMALL" marginBelow="NONE" />
              <div><p className="text-[11px] text-gray-400">Primary Product</p><p className="text-[13px] font-semibold text-gray-900">D&O</p></div>
            </div>
          </CardLayout>
        </div>

            <div className="flex gap-6">
              {/* Left inner column (60%) */}
              <div className="flex-[3] min-w-0 space-y-5">

                {/* Overview */}
                <div>
                  <p className="text-[15px] font-bold text-gray-900 mb-3">Overview</p>
                  <CardLayout padding="MORE" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                    <div className="flex border-b border-gray-200 mb-4">
                      <button onClick={() => setOverviewTab('customer')} className={`px-4 pb-2 text-[13px] font-medium border-b-[3px] -mb-[1px] transition-colors ${overviewTab === 'customer' ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Customer Information</button>
                      <button onClick={() => setOverviewTab('broker')} className={`px-4 pb-2 text-[13px] font-medium border-b-[3px] -mb-[1px] transition-colors ${overviewTab === 'broker' ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Broker Information</button>
                    </div>
                    {overviewTab === 'customer' ? (
                      <div className="grid grid-cols-3 gap-8">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 mb-1"><span className="text-[15px] font-bold text-[#2322F0]">Universal Exports</span><ExternalLink size={12} className="text-[#2322F0]" /></div>
                          <p className="text-[11px] text-gray-400 uppercase tracking-wide">Contact</p>
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-[13px] text-gray-700"><Building2 size={13} className="text-gray-400" /><span>7950 Jones Branch Dr</span></div>
                            <div className="flex items-center gap-2 text-[13px] text-gray-700"><Phone size={13} className="text-gray-400" /><span>(571) 412-7900</span></div>
                            <div className="flex items-center gap-2 text-[13px] text-gray-700"><Mail size={13} className="text-gray-400" /><span>info@universalexports.com</span></div>
                            <div className="flex items-center gap-2 text-[13px] text-gray-700"><MapPin size={13} className="text-gray-400" /><span>McLean, VA 22102</span></div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <p className="text-[11px] text-gray-400 uppercase tracking-wide">Organization</p>
                          <div><p className="text-[12px] text-gray-400">Type</p><p className="text-[13px] text-gray-900">Corporation</p></div>
                          <div><p className="text-[12px] text-gray-400">Effective Date</p><p className="text-[13px] text-gray-900">4/1/2026</p></div>
                          <div><p className="text-[12px] text-gray-400">Expiration Date</p><p className="text-[13px] text-gray-900">4/1/2027</p></div>
                          <div><p className="text-[12px] text-gray-400">NAICS Code</p><p className="text-[13px] text-gray-900">481 - Air Transportation</p></div>
                        </div>
                        <div className="space-y-3">
                          <p className="text-[11px] text-gray-400 uppercase tracking-wide">Additional</p>
                          <div><p className="text-[12px] text-gray-400">Incorporation Year</p><p className="text-[13px] text-gray-900">2001</p></div>
                          <div><p className="text-[12px] text-gray-400">SIC Description</p><p className="text-[13px] text-gray-900">113 - Small Production</p></div>
                          <div><p className="text-[12px] text-gray-400">Industry</p><p className="text-[13px] text-gray-900">Agriculture, Forestry</p></div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <p className="text-[15px] font-bold text-[#2322F0]">Amal Chen</p>
                          <p className="text-[11px] text-gray-400 uppercase tracking-wide">Broker Contact</p>
                          <div className="flex items-center gap-2 text-[13px] text-gray-700"><Building2 size={13} className="text-gray-400" /><span>Universal Exports — Main Office</span></div>
                          <div className="flex items-center gap-2 text-[13px] text-gray-700"><Phone size={13} className="text-gray-400" /><span>(555) 234-5678</span></div>
                          <div className="flex items-center gap-2 text-[13px] text-gray-700"><Mail size={13} className="text-gray-400" /><span>amal.chen@universalexports.com</span></div>
                        </div>
                        <div className="space-y-3">
                          <p className="text-[11px] text-gray-400 uppercase tracking-wide">Office Details</p>
                          <div><p className="text-[12px] text-gray-400">Office Name</p><p className="text-[13px] text-gray-900">Universal Exports — Main Office</p></div>
                          <div><p className="text-[12px] text-gray-400">Commission Rate</p><p className="text-[13px] text-gray-900">12%</p></div>
                        </div>
                      </div>
                    )}
                  </CardLayout>
                </div>

                {/* Risk Information (tabbed) */}
                <div>
                  <div className="flex items-center gap-2 mb-3"><p className="text-[15px] font-bold text-gray-900">Risk Information</p><Icon icon="edit" size="SMALL" color="ACCENT" /></div>
                  <CardLayout padding="MORE" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                    <div className="flex border-b border-gray-200 mb-4">
                      {([{ key: 'score' as const, label: 'Submission Score' }, { key: 'coverage' as const, label: 'Exposure and Coverage' }, { key: 'loss' as const, label: 'Loss History' }]).map(t => (
                        <button key={t.key} onClick={() => setRiskTab(t.key)} className={`px-4 pb-2 text-[13px] font-medium border-b-[3px] -mb-[1px] transition-colors ${riskTab === t.key ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>{t.label}</button>
                      ))}
                    </div>
                    {riskTab === 'score' && (
                      <div className="flex items-center gap-5">
                        <div className="relative w-20 h-20">
                          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90"><circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4" /><circle cx="18" cy="18" r="14" fill="none" stroke="#FFB300" strokeWidth="4" strokeDasharray="55 45" strokeLinecap="round" /></svg>
                          <div className="absolute inset-0 flex items-center justify-center"><span className="text-[17px] font-bold text-gray-900">55%</span></div>
                        </div>
                        <div className="space-y-1.5">
                          <div><p className="text-[11px] text-gray-400">Tier</p><p className="text-[13px] text-gray-900">B+</p></div>
                          <div><p className="text-[11px] text-gray-400">Risk</p><p className="text-[13px] text-gray-900">Medium</p></div>
                          <div><p className="text-[11px] text-gray-400">Channel</p><p className="text-[13px] text-gray-900">Email</p></div>
                        </div>
                      </div>
                    )}
                    {riskTab === 'coverage' && (
                      <div>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div><p className="text-[11px] text-gray-400">Total Insured Value</p><p className="text-[15px] font-bold text-gray-900">$1,500,000</p></div>
                          <div><p className="text-[11px] text-gray-400">Annual Premium</p><p className="text-[15px] font-bold text-gray-900">$7,500</p></div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 py-2 border-b border-gray-200">{['Coverage', 'Per Occ.', 'Aggregate', 'Retention'].map(h => <p key={h} className="text-[11px] font-semibold text-gray-500 uppercase">{h}</p>)}</div>
                        <div className="grid grid-cols-4 gap-2 py-2 border-b border-gray-100"><p className="text-[13px]">D&O</p><p className="text-[13px] text-gray-700">$1M</p><p className="text-[13px] text-gray-700">$2M</p><p className="text-[13px] text-gray-700">$25K</p></div>
                        <div className="grid grid-cols-4 gap-2 py-2"><p className="text-[13px]">EPL</p><p className="text-[13px] text-gray-700">$500K</p><p className="text-[13px] text-gray-700">$1M</p><p className="text-[13px] text-gray-700">$10K</p></div>
                      </div>
                    )}
                    {riskTab === 'loss' && (
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <FileText size={28} className="text-gray-300 mb-2" />
                        <p className="text-[13px] text-gray-500">No loss history information available.</p>
                        <button className="text-[13px] text-[#2322F0] hover:underline mt-1">Update Information</button>
                      </div>
                    )}
                  </CardLayout>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3"><p className="text-[15px] font-bold text-gray-900">Tasks</p><ButtonWidget label="CREATE TASK" style="OUTLINE" color="ACCENT" size="SMALL" /></div>
                  <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                    <div className="flex border-b border-gray-200 mb-3">
                      {([{ key: 'open' as const, label: 'Open' }, { key: 'completed' as const, label: 'Completed' }, { key: 'not-needed' as const, label: 'Not Needed' }]).map(t => (
                        <button key={t.key} onClick={() => setTaskTab(t.key)} className={`px-4 pb-2 text-[13px] font-medium border-b-[3px] -mb-[1px] transition-colors ${taskTab === t.key ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>{t.label}</button>
                      ))}
                    </div>
                    <table className="w-full text-left"><thead><tr className="border-b border-gray-200">{['Alerts', 'Type', 'Assignee', 'Due Date', 'Status'].map(h => <th key={h} className="text-[11px] font-semibold text-gray-500 uppercase py-2 pr-3">{h}</th>)}</tr></thead><tbody><tr><td colSpan={5} className="py-8 text-center text-[13px] text-gray-400">No tasks available</td></tr></tbody></table>
                  </CardLayout>
                </div>
              </div>

              {/* Right inner column (40%) */}
              <div className="flex-[2] flex-shrink-0 space-y-5">

                {/* Submission Details + Related Submissions (merged) */}
                <div>
                  <p className="text-[15px] font-bold text-gray-900 mb-3">Submission Details</p>
                  <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-[12px]"><span className="text-gray-400">Expiring Premium</span><span className="text-gray-900">$12,500</span></div>
                    <div className="flex justify-between text-[12px]"><span className="text-gray-400">Total Insurance Value</span><span className="text-gray-900">$1,500,000</span></div>
                    <div className="flex justify-between text-[12px]"><span className="text-gray-400">Primary / Excess</span><span className="text-gray-900">Primary</span></div>
                    <div className="flex justify-between text-[12px] items-center"><span className="text-gray-400">Status</span><TagField tags={[{ text: "Ready to Quote", backgroundColor: "POSITIVE" }]} size="SMALL" marginBelow="NONE" /></div>
                    <div className="flex justify-between text-[12px]"><span className="text-gray-400">Submission Timing</span><span className="text-gray-900">On Time</span></div>
                    <div className="flex justify-between text-[12px]"><span className="text-gray-400">Insurance Carrier</span><span className="text-gray-900">Appian Insurance Co.</span></div>
                    <div className="flex justify-between text-[12px]"><span className="text-gray-400">Branch</span><span className="text-gray-900">East Coast — McLean, VA</span></div>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex items-center justify-between mb-2"><p className="text-[13px] font-semibold text-gray-900">Related Submissions</p><TagField tags={[{ text: "1", backgroundColor: "ACCENT" }]} size="SMALL" marginBelow="NONE" /></div>
                    <div className="flex items-center gap-3 py-2">
                      <StampField icon="file-text" backgroundColor="#E8E7FD" contentColor="#2322F0" size="SMALL" marginBelow="NONE" />
                      <div><p className="text-[13px] font-semibold text-[#2322F0] hover:underline cursor-pointer">SUB0401XUSC</p><p className="text-[12px] text-gray-400">Renewal · Bound 4/1/2025</p></div>
                    </div>
                  </div>
                </CardLayout>
                </div>

                {/* Open Alerts */}
                <div>
                  <div className="flex items-center justify-between mb-3"><p className="text-[15px] font-bold text-gray-900">Open Alerts</p><span className="text-[11px] text-gray-400">1 of 1</span></div>
                  <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                  <div className="flex items-start gap-2.5 py-2">
                    <div className="mt-0.5"><Icon icon="circle-alert" size="SMALL" color="ACCENT" /></div>
                    <div><p className="text-[13px] font-semibold text-[#2322F0]">Duplicate Submission Detected</p><p className="text-[12px] text-gray-400">Match: SUB0401XUSC</p></div>
                  </div>
                </CardLayout>
                </div>

                {/* Notes */}
                <div>
                  <div className="flex items-center justify-between mb-3"><p className="text-[15px] font-bold text-gray-900">Notes</p><ButtonWidget label="Add Note" style="LINK" color="ACCENT" size="SMALL" /></div>
                  <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                  <div className="space-y-3">
                    <div className="border-b border-gray-100 pb-3">
                      <p className="text-[13px] text-gray-900">Customer requested expedited review due to upcoming board meeting.</p>
                      <p className="text-[11px] text-gray-400 mt-1">Anna Underwriter · 4/12/2026</p>
                    </div>
                    <div>
                      <p className="text-[13px] text-gray-900">ACORD 125 received via email. Documents classified and extraction initiated.</p>
                      <p className="text-[11px] text-gray-400 mt-1">System · 4/10/2026</p>
                    </div>
                  </div>
                </CardLayout>
                </div>
              </div>
            </div>
          </div>

          {/* ══ RIGHT: AI Chat Pane (fixed) ══ */}
          <div className={chatOpen ? "w-[320px] flex-shrink-0" : "w-[36px] flex-shrink-0"} />
        </div>
      </div>

      {/* Fixed AI Chat Panel */}
      {chatOpen ? (
        <div className="fixed right-0 w-[344px] bg-white border-l border-gray-200 px-4 pb-4 pt-6 flex flex-col z-20" style={{ top: '200px', height: 'calc(100vh - 200px)' }}>
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#2322F0]" />
              <span className="text-[15px] font-bold text-gray-900">AI Chat</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-gray-600"><PanelRightClose size={18} /></button>
          </div>
        <div className="space-y-3 flex-1 overflow-y-auto mb-3">
          {chatMessages.map((msg, i) => (
            <div key={i} className={msg.role === 'bot' ? 'bg-gray-100 rounded-lg p-3' : 'border border-[#2322F0] rounded-lg p-3'}>
              <p className="text-[13px] text-gray-900 leading-relaxed">{msg.text}</p>
            </div>
          ))}
          {chatMessages.length === 1 && (
            <div className="space-y-2 mt-2">
              {['What documents are attached?', 'Summarize the risk details.', 'What is the customer history?'].map(s => (
                <button key={s} onClick={() => sendMessage(s)} className="w-full text-left border border-[#2322F0] rounded-lg px-3 py-2 text-[13px] text-gray-900 hover:bg-blue-50 transition-colors">{s}</button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-end gap-2 pt-3 border-t border-gray-200">
          <textarea value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(chatInput) } }} placeholder="Ask about this submission..." className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-[13px] resize-none h-12 outline-none focus:border-[#2322F0]" />
          <ButtonWidget label="Send" style="SOLID" color="ACCENT" size="SMALL" onClick={() => sendMessage(chatInput)} />
        </div>
      </div>
      ) : (
        <div className="fixed right-0 w-12 bg-white border-l border-gray-200 flex flex-col items-center pt-6 z-20 cursor-pointer hover:bg-gray-50" style={{ top: '200px', height: 'calc(100vh - 200px)' }} onClick={() => setChatOpen(true)}>
          <PanelRightOpen size={18} className="text-gray-400 mb-3" />
          <Sparkles size={16} className="text-[#2322F0]" />
        </div>
      )}
    </>
  )
}

export default function InsuranceWorkspace() {
  const [contentTab, setContentTab] = useState<'dashboard' | 'submissions'>('submissions')
  const [dashboardPersona, setDashboardPersona] = useState<'underwriter' | 'manager'>('underwriter')
  const [mainTab, setMainTab] = useState<'my' | 'shared'>('my')
  const [activeView, setActiveView] = useState<'cards' | 'list'>('cards')
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([])
  const [rightPaneOpen, setRightPaneOpen] = useState(true)
  const [statusOpen, setStatusOpen] = useState(true)
  const [todoOpen, setTodoOpen] = useState(true)
  const [alertsOpen, setAlertsOpen] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [currentPage, setCurrentPage] = useState<'workspace' | 'summary'>('workspace')
  const [selectedSub, setSelectedSub] = useState<{ id: string; title: string } | null>(null)
  const visibleAlerts = alerts.filter((_, idx) => !dismissedAlerts.includes(idx))

  if (currentPage === 'summary') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* ═══ TOP NAV (fixed) ═══ */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 h-12 flex items-center">
          <img src="/appian-logo.png" alt="Appian" className="h-6 mr-8" />
          <nav className="flex h-full">
            {['WORKBENCH', 'SUBMISSIONS', 'PARTIES', 'MESSAGES', 'REPORTS'].map((item, i) => (
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
        <div className="pt-12">
          <SubmissionSummaryView onBack={() => setCurrentPage('workspace')} subId={selectedSub?.id || 'SUB0326STKW'} subTitle={selectedSub?.title || 'Universal Exports'} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ═══ TOP NAV (fixed) ═══ */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 h-12 flex items-center">
        <img src="/appian-logo.png" alt="Appian" className="h-6 mr-8" />
        <nav className="flex h-full">
          {['WORKBENCH', 'SUBMISSIONS', 'PARTIES', 'MESSAGES', 'REPORTS'].map((item, i) => (
            <a key={item} href="#"
              className={`px-4 h-full flex items-center text-[13px] font-semibold tracking-wide border-b-[3px] transition-colors ${
                i === 0 ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-500 border-transparent hover:text-gray-900'
              }`}>{item}</a>
          ))}
          <a href="#" className="px-4 h-full flex items-center text-[13px] font-semibold tracking-wide text-gray-500 hover:text-[#2322F0]">SMART SEARCH ▾</a>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-[13px] text-gray-500">Connected Underwriting ▾</span>
          <div className="w-8 h-8 rounded-full bg-[#2322F0] text-white flex items-center justify-center text-[13px] font-semibold">AU</div>
        </div>
      </div>

      {/* ═══ STICKY HEADER (below nav) ═══ */}
      <div className="sticky top-12 z-40 bg-gray-50 px-6 pt-4 pb-0">
        <Link href="/" className="text-[#2322F0] hover:underline text-[13px] mb-2 inline-block">← Back to Home</Link>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[21px] font-semibold text-gray-900">Welcome to Insurance Solutions, Dheeraj!</h1>
          <ButtonWidget label="+ NEW SUBMISSION" style="SOLID" color="ACCENT" size="SMALL" onClick={() => setShowCreateModal(true)} />
        </div>
        <CreateSubmissionWizard open={showCreateModal} onClose={() => setShowCreateModal(false)} onCreate={() => { setSelectedSub({ id: 'SUB0326STKW', title: 'Universal Exports' }); setCurrentPage('summary') }} />
        <div className="flex border-b-2 border-gray-200">
              <button onClick={() => setContentTab('dashboard')}
                className={`px-6 pb-2.5 text-[15px] font-medium border-b-[3px] -mb-[2px] transition-colors ${contentTab === 'dashboard' ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Dashboard</button>
              <button onClick={() => { setContentTab('submissions'); setMainTab('my') }}
                className={`px-6 pb-2.5 text-[15px] font-medium border-b-[3px] -mb-[2px] transition-colors ${contentTab === 'submissions' && mainTab === 'my' ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Submissions</button>
              <div className="ml-auto flex items-center pb-2.5"><ChevronRight size={16} className="text-gray-300" /></div>
        </div>
      </div>

      {/* ═══ SCROLLABLE CONTENT ═══ */}
      <div className="px-6 pt-4 pb-8 mt-12">

        {/* ═══ TWO PANES ═══ */}
        <div className="flex gap-6">
          <div className="flex-1 min-w-0">

            {/* ═══ DASHBOARD ═══ */}
            {contentTab === 'dashboard' && (
              <div className="space-y-5">
                {/* Persona Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    <button onClick={() => setDashboardPersona('underwriter')}
                      className={`px-4 py-1.5 text-[13px] font-medium border-r border-gray-300 transition-colors ${dashboardPersona === 'underwriter' ? 'bg-[#2322F0] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                      <><User size={12} className="inline mr-1" />Underwriter</>
                    </button>
                    <button onClick={() => setDashboardPersona('manager')}
                      className={`px-4 py-1.5 text-[13px] font-medium transition-colors ${dashboardPersona === 'manager' ? 'bg-[#2322F0] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                      <><Users size={12} className="inline mr-1" />Manager</>
                    </button>
                  </div>
                </div>

                {/* ── Common KPIs (both personas) ── */}
                <div className="grid grid-cols-3 gap-4">
                  <CardLayout padding="MORE" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                    <div className="flex items-center gap-4">
                      <StampField icon="inbox" backgroundColor="#E8E7FD" contentColor="#2322F0" size="LARGE" marginBelow="NONE" shape="SEMI_ROUNDED" />
                      <div>
                        <p className="text-[13px] text-gray-500">New Submissions</p>
                        <p className="text-[22px] font-bold text-gray-900">12</p>
                      </div>
                    </div>
                  </CardLayout>
                  <CardLayout padding="MORE" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                    <div className="flex items-center gap-4">
                      <StampField icon="clock" backgroundColor="#D4EDDA" contentColor="#15803d" size="LARGE" marginBelow="NONE" shape="SEMI_ROUNDED" />
                      <div>
                        <p className="text-[13px] text-gray-500">Avg. Cycle Time</p>
                        <p className="text-[22px] font-bold text-gray-900">4.2 days</p>
                      </div>
                    </div>
                  </CardLayout>
                  <CardLayout padding="MORE" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                    <div className="flex items-center gap-4">
                      <StampField icon="list" backgroundColor="#E2E3E5" contentColor="#374151" size="LARGE" marginBelow="NONE" shape="SEMI_ROUNDED" />
                      <div>
                        <p className="text-[13px] text-gray-500">Open Tasks</p>
                        <p className="text-[22px] font-bold text-gray-900">28</p>
                      </div>
                    </div>
                  </CardLayout>
                </div>

                {/* ═══ UNDERWRITER DASHBOARD ═══ */}
                {dashboardPersona === 'underwriter' && (<>

                {/* ── Row 2: Pie Chart + Bar Chart ── */}
                <div className="grid grid-cols-2 gap-5">
                  <CardLayout padding="MORE" showShadow={true}>
                    <RichTextDisplayField value={[<TextItem key="h" text="Submission Status" size="MEDIUM" style="STRONG" />]} marginBelow="LESS" />
                    <RichTextDisplayField value={[<TextItem key="sub" text="Distribution of 40 active submissions" size="SMALL" color="SECONDARY" />]} marginBelow="STANDARD" />
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="45%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={2} stroke="none" isAnimationActive={false}>
                          {pieData.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #e5e7eb', boxShadow: 'none' }} />
                        <Legend verticalAlign="bottom" height={56} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 16 }} formatter={(value: string) => <span style={{ color: '#111827' }}>{value}</span>} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardLayout>

                  <CardLayout padding="MORE" showShadow={true}>
                    <RichTextDisplayField value={[<TextItem key="h" text="Volume by Line of Business" size="MEDIUM" style="STRONG" />]} marginBelow="LESS" />
                    <RichTextDisplayField value={[<TextItem key="sub" text="Submissions by LOB" size="SMALL" color="SECONDARY" />]} marginBelow="STANDARD" />
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={lobData} layout="vertical" margin={{ left: 0, right: 24, top: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                        <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12, fill: '#374151' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #e5e7eb', boxShadow: 'none' }} />
                        <Bar dataKey="count" fill="#2322F0" radius={[0, 4, 4, 0]} barSize={18} isAnimationActive={false} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardLayout>
                </div>

                {/* ── Row 3: Stacked Bar (workload) + Recent Decisions ── */}
                <div className="grid grid-cols-2 gap-5">
                  <CardLayout padding="MORE" showShadow={true}>
                    <RichTextDisplayField value={[<TextItem key="h" text="Team Workload (Top 5)" size="MEDIUM" style="STRONG" />]} marginBelow="LESS" />
                    <RichTextDisplayField value={[<TextItem key="sub" text="In-progress vs overdue tasks per underwriter" size="SMALL" color="SECONDARY" />]} marginBelow="STANDARD" />
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={workloadData} margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #e5e7eb', boxShadow: 'none' }} />
                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 16 }} formatter={(value: string) => <span style={{ color: '#111827' }}>{value}</span>} />
                        <Bar dataKey="inProgress" stackId="a" fill="#2322F0" name="In Progress Tasks" barSize={24} isAnimationActive={false} />
                        <Bar dataKey="overdue" stackId="a" fill="#00BFA5" name="Overdue Tasks" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardLayout>

                  <CardLayout padding="MORE" showShadow={true}>
                    <RichTextDisplayField value={[<TextItem key="h" text="Upcoming Renewals" size="MEDIUM" style="STRONG" />]} marginBelow="LESS" />
                    <RichTextDisplayField value={[<TextItem key="sub" text="Submissions approaching renewal date" size="SMALL" color="SECONDARY" />]} marginBelow="STANDARD" />
                    <div className="space-y-0">
                      {[
                        { sub: 'SUB-10471', customer: 'Riverside Hotels', lob: 'Property', expDate: 'Apr 28, 2026', daysLeft: '8 days' },
                        { sub: 'SUB-10465', customer: 'Pacific Retail', lob: 'Workers Comp', expDate: 'May 5, 2026', daysLeft: '15 days' },
                        { sub: 'SUB-10460', customer: 'Metro Foods', lob: 'Property', expDate: 'May 16, 2026', daysLeft: '26 days' },
                        { sub: 'SUB-10458', customer: 'Coastal Shipping', lob: 'GL', expDate: 'May 22, 2026', daysLeft: '32 days' },
                      ].map((r) => (
                        <div key={r.sub} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0">
                          <StampField icon="calendar" backgroundColor="#FDDEDE" contentColor="#b91c1c" size="SMALL" marginBelow="NONE" shape="SEMI_ROUNDED" />
                          <div className="flex-1 min-w-0">
                            <RichTextDisplayField value={[<TextItem key="c" text={r.customer} size="SMALL" style="STRONG" />]} marginBelow="NONE" />
                            <RichTextDisplayField value={[<TextItem key="m" text={`${r.sub} · ${r.lob}`} size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[12px] text-gray-900">{r.expDate}</p>
                            <p className="text-[11px] text-red-600">{r.daysLeft}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardLayout>
                </div>

                {/* ── Row 4: Line Chart — Cycle Time Trend ── */}
                <CardLayout padding="MORE" showShadow={true}>
                  <RichTextDisplayField value={[<TextItem key="h" text="Avg. Cycle Time Trend" size="MEDIUM" style="STRONG" />]} marginBelow="LESS" />
                  <RichTextDisplayField value={[<TextItem key="sub" text="Average days to decision over the last 6 months" size="SMALL" color="SECONDARY" />]} marginBelow="STANDARD" />
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={cycleTimeData} margin={{ left: 0, right: 24, top: 8, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#374151' }} axisLine={false} tickLine={false} />
                      <YAxis domain={[3, 7]} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #e5e7eb', boxShadow: 'none' }} />
                      <Line type="monotone" dataKey="days" stroke="#2322F0" strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: '#2322F0', strokeWidth: 2 }} activeDot={{ r: 5, fill: '#2322F0' }} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardLayout>
                </>)}

                {/* ═══ MANAGER DASHBOARD ═══ */}
                {dashboardPersona === 'manager' && (<>

                {/* Team Workload + Status Breakdown */}
                <div className="grid grid-cols-2 gap-5">
                  <CardLayout padding="MORE" showShadow={true}>
                    <RichTextDisplayField value={[<TextItem key="h" text="Team Workload" size="MEDIUM" style="STRONG" />]} marginBelow="LESS" />
                    <RichTextDisplayField value={[<TextItem key="sub" text="Submissions per underwriter" size="SMALL" color="SECONDARY" />]} marginBelow="STANDARD" />
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={workloadData} margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #e5e7eb', boxShadow: 'none' }} />
                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 16 }} formatter={(value: string) => <span style={{ color: '#111827' }}>{value}</span>} />
                        <Bar dataKey="inProgress" stackId="a" fill="#2322F0" name="In Progress" barSize={24} isAnimationActive={false} />
                        <Bar dataKey="overdue" stackId="a" fill="#00BFA5" name="Overdue" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardLayout>

                  <CardLayout padding="MORE" showShadow={true}>
                    <RichTextDisplayField value={[<TextItem key="h" text="Submission Assignment" size="MEDIUM" style="STRONG" />]} marginBelow="LESS" />
                    <RichTextDisplayField value={[<TextItem key="sub" text="Distribution by underwriter" size="SMALL" color="SECONDARY" />]} marginBelow="STANDARD" />
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={[
                          { name: 'Anna U.', value: 10, color: '#2322F0' },
                          { name: 'Dhruva K.', value: 7, color: '#00BFA5' },
                          { name: 'John W.', value: 4, color: '#FFB300' },
                          { name: 'Riley H.', value: 5, color: '#7B1FA2' },
                          { name: 'Robert K.', value: 3, color: '#ef4444' },
                          { name: 'Unassigned', value: 11, color: '#9ca3af' },
                        ]} cx="50%" cy="45%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={2} stroke="none" isAnimationActive={false}>
                          <Cell fill="#2322F0" /><Cell fill="#00BFA5" /><Cell fill="#FFB300" /><Cell fill="#7B1FA2" /><Cell fill="#ef4444" /><Cell fill="#9ca3af" />
                        </Pie>
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #e5e7eb', boxShadow: 'none' }} />
                        <Legend verticalAlign="bottom" height={56} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 16 }} formatter={(value: string) => <span style={{ color: '#111827' }}>{value}</span>} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardLayout>
                </div>

                {/* Cycle Time + Assignment Distribution */}
                <div className="grid grid-cols-2 gap-5">
                  <CardLayout padding="MORE" showShadow={true}>
                    <RichTextDisplayField value={[<TextItem key="h" text="Avg. Cycle Time Trend" size="MEDIUM" style="STRONG" />]} marginBelow="LESS" />
                    <RichTextDisplayField value={[<TextItem key="sub" text="Days to decision over 6 months" size="SMALL" color="SECONDARY" />]} marginBelow="STANDARD" />
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={cycleTimeData} margin={{ left: 0, right: 24, top: 8, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} />
                        <YAxis domain={[3, 7]} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #e5e7eb', boxShadow: 'none' }} />
                        <Line type="monotone" dataKey="days" stroke="#2322F0" strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: '#2322F0', strokeWidth: 2 }} activeDot={{ r: 5, fill: '#2322F0' }} isAnimationActive={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardLayout>

                  <CardLayout padding="MORE" showShadow={true}>
                    <RichTextDisplayField value={[<TextItem key="h" text="Volume by LOB" size="MEDIUM" style="STRONG" />]} marginBelow="LESS" />
                    <RichTextDisplayField value={[<TextItem key="sub" text="Team-wide submission distribution" size="SMALL" color="SECONDARY" />]} marginBelow="STANDARD" />
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={lobData} layout="vertical" margin={{ left: 0, right: 24, top: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                        <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12, fill: '#374151' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #e5e7eb', boxShadow: 'none' }} />
                        <Bar dataKey="count" fill="#2322F0" radius={[0, 4, 4, 0]} barSize={18} isAnimationActive={false} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardLayout>
                </div>
                </>)}

              </div>
            )}

            {/* ═══ SUBMISSIONS ═══ */}
            {contentTab === 'submissions' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[15px] font-bold text-gray-900">Submissions</p>
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    {(['cards', 'list'] as const).map((view) => (
                      <button key={view} onClick={() => setActiveView(view)}
                        className={`px-3.5 py-1.5 text-[13px] font-medium border-r border-gray-300 last:border-r-0 transition-colors ${activeView === view ? 'bg-[#2322F0] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                        {view === 'cards' ? <><LayoutGrid size={12} className="inline mr-1" />Cards</> : <><List size={12} className="inline mr-1" />List</>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Cards View ── */}
                {activeView === 'cards' && (
                  <div className="grid grid-cols-3 gap-4">
                    {submissions.map((sub) => (
                      <div key={sub.id} onClick={() => { setSelectedSub({ id: sub.id, title: sub.title }); setCurrentPage('summary') }} className="cursor-pointer">
                      <CardLayout padding="STANDARD" showShadow={true}>
                        <div className="flex items-start justify-between gap-2 mb-0.5">
                          <div className="min-w-0 flex-1">
                            <RichTextDisplayField value={[<TextItem key="id" text={`${sub.id} - ${sub.title}`} size="SMALL" style="STRONG" />]} marginBelow="NONE" />
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <TagField tags={[{ text: sub.status, backgroundColor: sub.statusColor }]} size="SMALL" marginBelow="NONE" />
                          </div>
                        </div>
                        <RichTextDisplayField value={[<TextItem key="type" text={sub.type} size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
                        <ProgressBar percentage={sub.progress} label="" labelPosition="COLLAPSED" marginAbove="STANDARD" marginBelow="LESS" />
                        <div className="flex items-center justify-between">
                          <RichTextDisplayField value={[<><Clock size={11} className="inline mr-0.5" /><TextItem key="due" text={sub.due} size="SMALL" color="SECONDARY" /></>]} marginBelow="NONE" />
                          <RichTextDisplayField value={[<><User size={11} className="inline mr-0.5" /><TextItem key="a" text={sub.assignee} size="SMALL" color="SECONDARY" /></>]} marginBelow="NONE" />
                        </div>
                      </CardLayout>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── List View ── */}
                {activeView === 'list' && (
                  <CardLayout padding="STANDARD" showShadow={true}>
                    <ListView />
                  </CardLayout>
                )}
              </>
            )}
          </div>

          {/* Spacer for fixed right pane */}
          <div className={rightPaneOpen ? "w-[25vw] flex-shrink-0" : "w-[48px] flex-shrink-0"} />
        </div>
      </div>

      {/* ══════ FIXED RIGHT PANE ══════ */}
      {rightPaneOpen ? (
        <div className="fixed right-0 w-[25vw] bg-gray-50 border-l border-gray-200 px-4 pb-4 pt-4 z-20 top-[200px] bottom-0" style={{ overflowY: 'auto' }}>
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200 flex-shrink-0">
            <p className="text-[15px] font-bold text-gray-900">Task List</p>
            <button onClick={() => setRightPaneOpen(false)} className="text-gray-400 hover:text-gray-600"><PanelRightClose size={16} /></button>
          </div>

          {/* Status box */}
          <CardLayout padding="STANDARD" showShadow={false} showBorder={true} shape="SEMI_ROUNDED" marginBelow="STANDARD">
            <div className="flex items-center justify-between mb-3 -mx-4 -mt-4 px-4 py-2 rounded-t-sm cursor-pointer" style={{ backgroundColor: '#E8E7FD' }} onClick={() => setStatusOpen(!statusOpen)}>
              <span className="text-[15px] font-semibold text-gray-900">Status</span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${statusOpen ? '' : '-rotate-90'}`} />
            </div>
            {statusOpen && (
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={[{ name: 'Overdue', value: 2 }, { name: 'Due this week', value: 4 }, { name: 'Due later', value: 2 }]} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" paddingAngle={3} stroke="none" isAnimationActive={false}>
                  <Cell fill="#ef4444" /><Cell fill="#2322F0" /><Cell fill="#FFB300" />
                </Pie>
                <Legend verticalAlign="bottom" height={32} iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 16 }} formatter={(value: string) => <span style={{ color: '#111827' }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
            )}
          </CardLayout>

          {/* To-do box */}
          <CardLayout padding="STANDARD" showShadow={false} showBorder={true} shape="SEMI_ROUNDED" marginBelow="STANDARD">
            <div className="flex items-center justify-between mb-3 -mx-4 -mt-4 px-4 py-2 rounded-t-sm cursor-pointer" style={{ backgroundColor: '#E8E7FD' }} onClick={() => setTodoOpen(!todoOpen)}>
              <span className="text-[15px] font-semibold text-gray-900">To-do</span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${todoOpen ? '' : '-rotate-90'}`} />
            </div>
            {todoOpen && (
            <div className="space-y-2">
              {tasks.map((task, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <StampField icon={task.icon} backgroundColor={task.bgColor} contentColor={task.iconColor} size="MEDIUM" marginBelow="NONE" shape="SEMI_ROUNDED" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-gray-500">{task.sub} · {task.type}</p>
                    <p className="text-[13px] font-bold text-gray-900 leading-snug">{task.title}</p>
                    <p className="text-[12px] text-gray-400 flex items-center gap-1 mt-0.5"><Clock size={10} /> {task.due}</p>
                  </div>
                  <span className={`text-[11px] font-semibold flex-shrink-0 px-2 py-1 rounded border ${task.status === 'COMPLETE' ? 'text-gray-500 border-gray-300' : 'text-[#2322F0] border-[#2322F0]'}`}>{task.status}</span>
                </div>
              ))}
            </div>
            )}
          </CardLayout>

          {/* Open Alerts box */}
          <CardLayout padding="STANDARD" showShadow={false} showBorder={true} shape="SEMI_ROUNDED">
            <div className="flex items-center justify-between mb-3 -mx-4 -mt-4 px-4 py-2 rounded-t-sm cursor-pointer" style={{ backgroundColor: '#E8E7FD' }} onClick={() => setAlertsOpen(!alertsOpen)}>
              <span className="text-[15px] font-semibold text-gray-900">Open Alerts</span>
              <span className="flex items-center gap-2"><span className="text-[12px] text-gray-400">{visibleAlerts.length} of {alerts.length}</span><ChevronDown size={16} className={`text-gray-400 transition-transform ${alertsOpen ? '' : '-rotate-90'}`} /></span>
            </div>
            {alertsOpen && (
            <div className="space-y-2">
              {visibleAlerts.map((alert) => {
                const oi = alerts.indexOf(alert)
                return (
                  <div key={oi} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <StampField icon="circle-alert" backgroundColor="#E8E7FD" contentColor="#2322F0" size="MEDIUM" marginBelow="NONE" shape="SEMI_ROUNDED" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-[#2322F0]">{alert.title}</p>
                      <p className="text-[12px] text-gray-400">{alert.sub} · {alert.date}</p>
                    </div>
                    <button onClick={() => setDismissedAlerts(prev => [...prev, oi])} className="text-[#2322F0] leading-none flex-shrink-0 hover:text-[#1a19b0]"><X size={14} /></button>
                  </div>
                )
              })}
            </div>
            )}
          </CardLayout>
        </div>
      ) : (
        <div className="fixed right-0 w-12 bg-white border-l border-gray-200 flex flex-col items-center pt-4 z-20 cursor-pointer hover:bg-gray-50" style={{ top: '200px', height: 'calc(100vh - 200px)' }} onClick={() => setRightPaneOpen(true)}>
          <PanelRightOpen size={16} className="text-gray-400 mb-2" />
          <List size={14} className="text-gray-400" />
        </div>
      )}
    </div>
  )
}
