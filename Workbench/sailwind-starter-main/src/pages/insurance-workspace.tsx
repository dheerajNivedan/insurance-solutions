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
  PanelRightClose, PanelRightOpen, Bookmark,
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
  { sub: 'SUB-10482', type: 'Upload Document', title: 'Upload loss runs for Acme Corp', due: 'Due 2 days ago', status: 'OPEN', icon: 'loader', bgColor: '#FFF3CD', iconColor: '#E69500' },
  { sub: 'SUB-10479', type: 'Sanctions Check', title: 'Complete sanctions review for TechStart', due: 'Due today', status: 'OPEN', icon: 'loader', bgColor: '#FFF3CD', iconColor: '#E69500' },
  { sub: 'SUB-10475', type: 'Confirmation', title: 'Confirm broker details for Global Logistics', due: 'Due in 3 days', status: 'OPEN', icon: 'loader', bgColor: '#FFF3CD', iconColor: '#E69500' },
  { sub: 'SUB-10482', type: 'Referral', title: 'Manager referral — TIV exceeds authority', due: 'Due in 5 days', status: 'OPEN', icon: 'loader', bgColor: '#FFF3CD', iconColor: '#E69500' },
  { sub: 'SUB-10468', type: 'Upload Document', title: 'Upload ACORD 125 for Summit Construction', due: 'Due in 5 days', status: 'COMPLETE', icon: 'target', bgColor: '#E8E7FD', iconColor: '#1A237E' },
  { sub: 'SUB-10471', type: 'Document Review', title: 'Review extracted ACORD 140 data', due: 'Due in 8 days', status: 'COMPLETE', icon: 'target', bgColor: '#E8E7FD', iconColor: '#1A237E' },
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
function ListView({ onSelectSubmission }: { onSelectSubmission?: (id: string, title: string) => void }) {
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
      <div className="flex items-center gap-2 mb-3 w-full">
        <div className="flex items-center border border-gray-300 rounded px-2 py-1.5 bg-white flex-1 min-w-0">
          <Search size={12} className="text-gray-400 mr-1.5 flex-shrink-0" />
          <input type="text" placeholder="Search Submissions" className="text-[12px] outline-none w-full bg-transparent" />
        </div>
        <ButtonWidget label="SEARCH" style="OUTLINE" color="ACCENT" size="SMALL" />
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 flex-1 min-w-0 border-l border-gray-200 pl-2 ml-1">
          <span className="font-semibold uppercase whitespace-nowrap">Status</span>
          <select className="text-[12px] border border-gray-300 rounded px-1.5 py-1 text-gray-600 flex-1 min-w-0"><option>Any</option></select>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 flex-1 min-w-0">
          <span className="font-semibold uppercase whitespace-nowrap">Assignee</span>
          <select className="text-[12px] border border-gray-300 rounded px-1.5 py-1 text-gray-600 flex-1 min-w-0"><option>Any</option></select>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 flex-1 min-w-0">
          <span className="font-semibold uppercase whitespace-nowrap">Line of Business</span>
          <select className="text-[12px] border border-gray-300 rounded px-1.5 py-1 text-gray-600 flex-1 min-w-0"><option>Any</option></select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              {listTab === 'modified' && ['Submission', 'Status', 'Channel', 'Customer', 'Line of Business', 'Renewal Effective Date', 'Expiration Date', 'Score', 'Created', 'Last Modified'].map(h => (
                <th key={h} className="text-[12px] font-semibold text-gray-900 tracking-wide py-2 pr-3 whitespace-nowrap">{h}</th>
              ))}
              {listTab === 'new' && ['Submission', 'Status', 'Channel', 'Customer', 'Broker', 'Line of Business', 'Score', 'Created', 'Last Modified'].map(h => (
                <th key={h} className="text-[12px] font-semibold text-gray-900 tracking-wide py-2 pr-3 whitespace-nowrap">{h}</th>
              ))}
              {listTab === 'renewals' && ['Submission', 'Expiring Premium', 'Status', 'Customer', 'Broker', 'Line of Business', 'Renewal Effective Date', 'Expiration Date'].map(h => (
                <th key={h} className="text-[12px] font-semibold text-gray-900 tracking-wide py-2 pr-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listData.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                {/* Submission — always shown, alerts hidden for renewals */}
                <td className="py-3 pr-3">
                  <a href="#" onClick={(e) => { e.preventDefault(); onSelectSubmission?.(row.id, row.customer) }} className="text-[13px] font-semibold text-[#2322F0] hover:underline">{row.id} - {row.customer}</a>
                  <p className="text-[12px] text-gray-400">{row.group}</p>
                  {listTab !== 'renewals' && row.alerts > 0 && <p className="text-[12px] text-red-500 flex items-center gap-0.5"><AlertTriangle size={9} /> {row.alerts} Alert{row.alerts > 1 ? 's' : ''}</p>}
                </td>
                {/* Expiring Premium — renewals only */}
                {listTab === 'renewals' && <td className="py-3 pr-3 text-[13px] text-gray-700">{row.premium}</td>}
                {/* Status — always */}
                <td className="py-3 pr-3">
                  <TagField tags={[{ text: row.status, backgroundColor: row.statusColor }]} size="SMALL" marginBelow="NONE" />
                </td>
                {/* Channel — last modified & new business only */}
                {listTab !== 'renewals' && (
                  <td className="py-3 pr-3">
                    <p className="text-[13px] text-gray-700">{row.channel}</p>
                    <p className="text-[12px] text-gray-400 flex items-center gap-0.5"><FileText size={9} /> {row.docs} Document{row.docs !== 1 ? 's' : ''}</p>
                  </td>
                )}
                {/* Customer — always */}
                <td className="py-3 pr-3 text-[13px] text-[#2322F0]">{row.customer}</td>
                {/* Broker — new business & renewals only */}
                {listTab !== 'modified' && <td className="py-3 pr-3 text-[13px] text-[#2322F0]">{row.broker}</td>}
                {/* LOB — always */}
                <td className="py-3 pr-3 text-[13px] text-gray-700">{row.lob}</td>
                {/* Renewal Effective Date — last modified & renewals only */}
                {listTab !== 'new' && <td className="py-3 pr-3 text-[13px] text-gray-700">{row.renewalDate}</td>}
                {/* Expiration Date — last modified & renewals only */}
                {listTab !== 'new' && (
                  <td className="py-3 pr-3">
                    <p className="text-[13px] text-gray-700">{row.expDate}</p>
                    {row.expLabel && <p className="text-[12px] text-gray-400">{row.expLabel}</p>}
                  </td>
                )}
                {/* Score — last modified & new business only, color-coded */}
                {listTab !== 'renewals' && (
                  <td className="py-3 pr-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[13px] font-semibold ${
                      row.score <= 45 ? 'bg-red-100 text-red-700' :
                      row.score >= 66 ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-900'
                    }`}>{row.score}%</span>
                  </td>
                )}
                {/* Created — last modified & new business only */}
                {listTab !== 'renewals' && <td className="py-3 pr-3 text-[12px] text-gray-500">Apr 20, 2026</td>}
                {/* Last Modified — last modified & new business only */}
                {listTab !== 'renewals' && <td className="py-3 pr-3 text-[12px] text-gray-500">2 hours ago</td>}
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
  const [product, setProduct] = useState<string | null>(null)
  const [submissionType, setSubmissionType] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [customerType, setCustomerType] = useState('existing')
  const [customerSearch, setCustomerSearch] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [orgType, setOrgType] = useState<string | null>(null)
  const [contactEmail, setContactEmail] = useState('')
  const [contactName, setContactName] = useState('')
  const [officeType, setOfficeType] = useState('existing')
  const [officeSearch, setOfficeSearch] = useState('')
  const [brokerType, setBrokerType] = useState('existing')
  const [brokerSearch, setBrokerSearch] = useState('')
  const [newOfficeName, setNewOfficeName] = useState('')
  const [newBrokerName, setNewBrokerName] = useState('')
  const [brokerEmail, setBrokerEmail] = useState('')
  const [proposedEffDate, setProposedEffDate] = useState('')
  const [proposedExpDate, setProposedExpDate] = useState('')
  const [productSegment, setProductSegment] = useState<string | null>(null)
  const [rushStatus, setRushStatus] = useState('standard')
  const [totalInsuranceValue, setTotalInsuranceValue] = useState('')
  const [expiringPremium, setExpiringPremium] = useState('')
  const [primaryExcess, setPrimaryExcess] = useState('primary')
  const [carrierBranch, setCarrierBranch] = useState('')
  const [accountCoordinator, setAccountCoordinator] = useState('')

  const [productOpen, setProductOpen] = useState(true)
  const [policyOpen, setPolicyOpen] = useState(true)
  const [brokerOpen, setBrokerOpen] = useState(true)
  const [customerOpen, setCustomerOpen] = useState(true)

  const resetAndClose = () => {
    setStep(1); setProduct(null); setSubmissionType(null); setTitle('')
    setCustomerType('existing'); setCustomerSearch(''); setCustomerName(''); setOrgType(null); setContactEmail(''); setContactName(''); setOfficeType('existing')
    setOfficeSearch(''); setBrokerType('existing'); setBrokerSearch('')
    setNewOfficeName(''); setNewBrokerName(''); setBrokerEmail('')
    setProposedEffDate(''); setProposedExpDate(''); setRushStatus('standard')
    setProductSegment(null); setTotalInsuranceValue(''); setExpiringPremium(''); setPrimaryExcess('primary'); setCarrierBranch('')
    setAccountCoordinator('')
    onClose()
  }

  const isMgmtLiability = product !== null && product.startsWith('mgmt-liability')

  const steps = isMgmtLiability ? [
    { num: 1, label: 'Product & Policy Info' },
    { num: 2, label: 'Customer & Broker Info' },
    { num: 3, label: 'Management Liability Info' },
  ] : [
    { num: 1, label: 'Product & Policy Info' },
    { num: 2, label: 'Customer & Broker Info' },
  ]

  const lastStep = steps.length

  return (
    <DialogField open={open} onOpenChange={(o) => { if (!o) resetAndClose() }} title="" width="FIT" height="FIT" showCloseButton={false}>
      <div className="flex flex-col rounded-md overflow-hidden" style={{ backgroundColor: '#ffffff', height: '70vh', maxHeight: '70vh' }}>

        {/* ── Header (top of form) ── */}
        <div className="px-6 pt-3 pb-0 flex-shrink-0">
          <p className="text-[22px] font-bold text-gray-900">Create Submission</p>
          <p className="text-[11px] mt-0.5" style={{ color: '#6C6C75' }}>Mandatory fields are marked with an asterisk (*).</p>
          <div className="border-t border-gray-200 mt-2" />
        </div>

        {/* ── Sidebar + Content row (middle, fills remaining space) ── */}
        <div className="flex flex-1 min-h-0">

          {/* Left Sidebar Stepper */}
          <div className="w-60 flex-shrink-0 bg-white px-6 py-10 flex flex-col">
            <div className="flex flex-col">
              {steps.map((s, i) => {
                const state = i + 1 < step ? 'completed' : i + 1 === step ? 'current' : 'future'
                return (
                  <div key={s.num} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                        state === 'completed' ? 'bg-[#2322F0] border-[#2322F0]' :
                        state === 'current' ? 'bg-white border-[#2322F0]' :
                        'bg-gray-200 border-gray-300'
                      }`} />
                      {i < steps.length - 1 && (
                        <div className={`w-0.5 h-8 ${state === 'completed' ? 'bg-[#2322F0]' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <span className={`text-[14px] leading-3 whitespace-nowrap ${
                      state === 'current' ? 'font-bold text-gray-900' :
                      state === 'completed' ? 'font-normal text-[#2322F0]' :
                      'font-normal text-gray-400'
                    }`}>{s.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Content — scrollable */}
          <div className="flex-1 p-4 pr-8 min-w-0 overflow-y-auto">

            {/* ══ Step 1: Product & Policy Details ══ */}
            {step === 1 && (<>
              {/* Product Details */}
              <div className="mb-8">
              <CardLayout padding="STANDARD" showShadow={false} showBorder={true} shape="SEMI_ROUNDED" marginBelow="NONE">
                <div className="flex items-center justify-between mb-3 -mx-4 -mt-4 px-4 py-2 rounded-t-sm cursor-pointer" style={{ backgroundColor: '#E8E7FD' }} onClick={() => setProductOpen(!productOpen)}>
                  <span className="text-[15px] font-semibold text-gray-900">Product Information</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${productOpen ? '' : '-rotate-90'}`} />
                </div>
                {productOpen && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <RadioButtonField
                        label="Submission Type"
                        choiceLabels={['New Business', 'Renewals']}
                        choiceValues={['new-business', 'renewals']}
                        value={submissionType}
                        saveInto={(v) => setSubmissionType(v)}
                        required={true}
                        choiceLayout="COMPACT"
                      />
                      <div />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <DropdownField
                        label="Products"
                      choiceLabels={[
                        'Directors & Officers (D&O) - Management Liability',
                        'Employment Practices Liability (EPL) - Management Liability',
                        'Generic Management Liability - Management Liability',
                        'Liability - Commercial Auto',
                        'No Fault - Commercial Auto',
                        'Add No Fault - Commercial Auto',
                        'Medical Payments - Commercial Auto',
                        'Uninsured Motorists - Commercial Auto',
                        'Underinsured Motorist - Commercial Auto',
                        'Towing And Labor - Commercial Auto',
                        'Specified Causes of Loss - Commercial Auto',
                        'Fire - Commercial Auto',
                        'Fire And Theft - Commercial Auto',
                        'Fire Theft Windstorm - Commercial Auto',
                        'Limited Specified Perils - Commercial Auto',
                        'Comprehensive OTC - Commercial Auto',
                        'Collision - Commercial Auto',
                        'Building Coverage - Commercial Property',
                        'Business Personal Property (BPP) - Commercial Property',
                        'Flood Insurance - Commercial Property',
                        'Equipment Breakdown - Commercial Property',
                        'Ordinance or Law Coverage - Commercial Property',
                      ]}
                      choiceValues={[
                        'mgmt-liability-dno',
                        'mgmt-liability-epl',
                        'mgmt-liability-generic',
                        'commercial-auto-liability',
                        'commercial-auto-no-fault',
                        'commercial-auto-add-no-fault',
                        'commercial-auto-medical-payments',
                        'commercial-auto-uninsured-motorists',
                        'commercial-auto-underinsured-motorist',
                        'commercial-auto-towing-labor',
                        'commercial-auto-specified-causes-loss',
                        'commercial-auto-fire',
                        'commercial-auto-fire-theft',
                        'commercial-auto-fire-theft-windstorm',
                        'commercial-auto-limited-specified-perils',
                        'commercial-auto-comprehensive-otc',
                        'commercial-auto-collision',
                        'commercial-property-building-coverage',
                        'commercial-property-bpp',
                        'commercial-property-flood-insurance',
                        'commercial-property-equipment-breakdown',
                        'commercial-property-ordinance-law',
                      ]}
                      value={product}
                      saveInto={(v) => setProduct(v)}
                      placeholder="Select Product"
                      required={true}
                    />
                      <div />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="Title"
                      value={title}
                      saveInto={(v) => setTitle(v)}
                      required={true}
                    />
                    <div />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900 mb-2">Supporting Documents</p>
                      <div className="border border-dashed border-gray-300 rounded px-4 py-3 flex items-center gap-3">
                        <ButtonWidget label="UPLOAD" style="OUTLINE" color="SECONDARY" size="SMALL" />
                        <span className="text-[13px] text-gray-400 italic">Drop files here</span>
                      </div>
                      <p className="text-[11px] mt-2" style={{ color: '#6C6C75' }}>Please ensure any uploaded ACORD 125s, 140s, and 127s are smaller than 7.0 MB and less than 15 pages each. These documents will be auto-extracted.</p>
                    </div>
                    <div />
                    </div>
                  </div>
                )}
              </CardLayout>
              </div>

              {/* Policy Details */}
              <div className="mb-8">
              <CardLayout padding="STANDARD" showShadow={false} showBorder={true} shape="SEMI_ROUNDED" marginBelow="NONE">
                <div className="flex items-center justify-between mb-3 -mx-4 -mt-4 px-4 py-2 rounded-t-sm cursor-pointer" style={{ backgroundColor: '#E8E7FD' }} onClick={() => setPolicyOpen(!policyOpen)}>
                  <span className="text-[15px] font-semibold text-gray-900">Policy Information</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${policyOpen ? '' : '-rotate-90'}`} />
                </div>
                {policyOpen && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[14px] font-semibold text-gray-900 block mb-1">Proposed Effective Date</label>
                        <input
                          type="date"
                          value={proposedEffDate}
                          onChange={(e) => setProposedEffDate(e.target.value)}
                          className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-[14px] text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-[14px] font-semibold text-gray-900 block mb-1">Proposed Expiration Date</label>
                        <input
                          type="date"
                          value={proposedExpDate}
                          onChange={(e) => setProposedExpDate(e.target.value)}
                          className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-[14px] text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <TextField
                        label="Total Insurance Value"
                        value={totalInsuranceValue}
                        saveInto={(v) => setTotalInsuranceValue(v)}
                        placeholder="$1,000,000"
                      />
                      <TextField
                        label="Expiring Premium"
                        value={expiringPremium}
                        saveInto={(v) => setExpiringPremium(v)}
                        placeholder="500000"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <DropdownField
                        label="Product Segment"
                        choiceLabels={[
                          'Commercial', 'D&O Private/NFP', 'EPLI', 'Energy', 'Excess Casualty',
                          'Financial Institutions', 'GMI', 'General Casualty', 'General Casualty - Environmental',
                          'Healthcare Management Liability', 'Inland Marine', 'Lawyers E&O', 'Media', 'Medical',
                          'Mergers & Acquisitions', 'Miscellaneous E&O', 'Primary Casualty', 'Primary Construction',
                          'Product Recall', 'Property', 'SME', 'Surety Bond', 'Tech E&O',
                          'Trade Credit Whole Turnover', 'US Programs', 'i-bind',
                        ]}
                        choiceValues={[
                          'commercial', 'dno-private-nfp', 'epli', 'energy', 'excess-casualty',
                          'financial-institutions', 'gmi', 'general-casualty', 'general-casualty-environmental',
                          'healthcare-mgmt-liability', 'inland-marine', 'lawyers-eo', 'media', 'medical',
                          'mergers-acquisitions', 'miscellaneous-eo', 'primary-casualty', 'primary-construction',
                          'product-recall', 'property', 'sme', 'surety-bond', 'tech-eo',
                          'trade-credit-whole-turnover', 'us-programs', 'i-bind',
                        ]}
                        value={productSegment}
                        saveInto={(v) => setProductSegment(v)}
                        placeholder="Select Product Segment"
                      />
                      <TextField
                        label="Insurance Carrier Branch"
                        value={carrierBranch}
                        saveInto={(v) => setCarrierBranch(v)}
                        placeholder="LIC"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[14px] font-semibold text-gray-900 mb-1">Rush Status</p>
                        <RadioButtonField
                          choiceLabels={['Standard', 'Rush']}
                          choiceValues={['standard', 'rush']}
                          value={rushStatus}
                          saveInto={(v) => setRushStatus(v)}
                          labelPosition="COLLAPSED"
                          choiceLayout="COMPACT"
                        />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-gray-900 mb-1">Primary/ Excess Status</p>
                        <RadioButtonField
                          choiceLabels={['Primary', 'Excess']}
                          choiceValues={['primary', 'excess']}
                          value={primaryExcess}
                          saveInto={(v) => setPrimaryExcess(v)}
                          labelPosition="COLLAPSED"
                          choiceLayout="COMPACT"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardLayout>
              </div>
            </>)}

            {/* ══ Step 2: Additional Info (Management Liability only) ══ */}
            {isMgmtLiability && step === 3 && (
              <div className="mb-8">
              <CardLayout padding="STANDARD" showShadow={false} showBorder={true} shape="SEMI_ROUNDED" marginBelow="NONE">
                <div className="flex items-center justify-between mb-3 -mx-4 -mt-4 px-4 py-2 rounded-t-sm cursor-pointer" style={{ backgroundColor: '#E8E7FD' }}>
                  <span className="text-[15px] font-semibold text-gray-900">Management Liability Info</span>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      label="Account Coordinator"
                      value={accountCoordinator}
                      saveInto={(v) => setAccountCoordinator(v)}
                      placeholder="Enter Account Coordinator"
                    />
                    <div />
                  </div>
                </div>
              </CardLayout>
              </div>
            )}

            {/* ══ Customer & Broker Info (step 2) ══ */}
            {step === 2 && (<>
              {/* Customer Information */}
              <div className="mb-8">
              <CardLayout padding="STANDARD" showShadow={false} showBorder={true} shape="SEMI_ROUNDED" marginBelow="NONE">
                <div className="flex items-center justify-between mb-3 -mx-4 -mt-4 px-4 py-2 rounded-t-sm cursor-pointer" style={{ backgroundColor: '#E8E7FD' }} onClick={() => setCustomerOpen(!customerOpen)}>
                  <span className="text-[15px] font-semibold text-gray-900">Customer Information</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${customerOpen ? '' : '-rotate-90'}`} />
                </div>
                {customerOpen && (
                  <div className="space-y-4">
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
                    {customerType === 'existing' && (
                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          label="Customer and Contact Information"
                          value={customerSearch}
                          saveInto={(v) => setCustomerSearch(v)}
                          placeholder="Search customers or contacts"
                        />
                        <div />
                      </div>
                    )}
                    {customerType === 'new' && (<>
                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          label="Customer Name"
                          value={customerName}
                          saveInto={(v) => setCustomerName(v)}
                          placeholder="Customer Name"
                          required={true}
                        />
                        <DropdownField
                          label="Organization Type"
                          choiceLabels={['Corporation', 'LLC', 'Partnership', 'Sole Proprietorship', 'Non-Profit']}
                          choiceValues={['corporation', 'llc', 'partnership', 'sole-proprietorship', 'non-profit']}
                          value={orgType}
                          saveInto={(v) => setOrgType(v)}
                          placeholder="Select Organization Type"
                          required={true}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          label="Contact Email"
                          value={contactEmail}
                          saveInto={(v) => setContactEmail(v)}
                          placeholder="Contact Email"
                          required={true}
                        />
                        <TextField
                          label="Contact Name"
                          value={contactName}
                          saveInto={(v) => setContactName(v)}
                          placeholder="Contact Name"
                          required={true}
                        />
                      </div>
                    </>)}
                  </div>
                )}
              </CardLayout>
              </div>

              {/* Broker Information */}
              <div className="mb-8">
              <CardLayout padding="STANDARD" showShadow={false} showBorder={true} shape="SEMI_ROUNDED" marginBelow="NONE">
                <div className="flex items-center justify-between mb-3 -mx-4 -mt-4 px-4 py-2 rounded-t-sm cursor-pointer" style={{ backgroundColor: '#E8E7FD' }} onClick={() => setBrokerOpen(!brokerOpen)}>
                  <span className="text-[15px] font-semibold text-gray-900">Broker Information</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${brokerOpen ? '' : '-rotate-90'}`} />
                </div>
                {brokerOpen && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900 mb-1">Office Name</p>
                      <RadioButtonField
                        choiceLabels={['Existing', 'New']}
                        choiceValues={['existing', 'new']}
                        value={officeType}
                        saveInto={(v) => { setOfficeType(v); if (v === 'new') setBrokerType('new'); }}
                        labelPosition="COLLAPSED"
                        choiceLayout="COMPACT"
                      />
                    </div>
                    {officeType === 'existing' && (
                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          value={officeSearch}
                          saveInto={(v) => setOfficeSearch(v)}
                          placeholder="Search Offices"
                          labelPosition="COLLAPSED"
                        />
                        <div />
                      </div>
                    )}
                    {officeType === 'new' && (
                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          value={newOfficeName}
                          saveInto={(v) => setNewOfficeName(v)}
                          placeholder="Office Name"
                          labelPosition="COLLAPSED"
                        />
                        <div />
                      </div>
                    )}
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900 mb-1">Broker Name</p>
                      <RadioButtonField
                        choiceLabels={['Existing', 'New']}
                        choiceValues={['existing', 'new']}
                        value={officeType === 'new' ? 'new' : brokerType}
                        saveInto={(v) => setBrokerType(v)}
                        disabled={officeType === 'new'}
                        labelPosition="COLLAPSED"
                        choiceLayout="COMPACT"
                      />
                    </div>
                    {(officeType === 'new' ? 'new' : brokerType) === 'existing' && (
                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          value={brokerSearch}
                          saveInto={(v) => setBrokerSearch(v)}
                          placeholder="Search Brokers"
                          labelPosition="COLLAPSED"
                        />
                        <div />
                      </div>
                    )}
                    {(officeType === 'new' ? 'new' : brokerType) === 'new' && (
                      <div className="grid grid-cols-2 gap-4">
                        <TextField
                          label="Broker Name"
                          value={newBrokerName}
                          saveInto={(v) => setNewBrokerName(v)}
                          placeholder="Broker Name"
                        />
                        <TextField
                          label="Broker Email"
                          value={brokerEmail}
                          saveInto={(v) => setBrokerEmail(v)}
                          placeholder="Broker Email"
                        />
                      </div>
                    )}
                  </div>
                )}
              </CardLayout>
              </div>
            </>)}

          </div>
        </div>

        {/* ── Footer (bottom of form) ── */}
        <div className="border-t border-gray-200 px-6 py-3 pb-4 flex justify-between flex-shrink-0">
            <div className="flex gap-2 items-center">
              {step > 1 && (
                <ButtonWidget label="BACK" style="OUTLINE" color="ACCENT" size="SMALL" onClick={() => setStep(step - 1)} />
              )}
              {step === 1 && (
                <ButtonWidget label="CANCEL" style="OUTLINE" color="ACCENT" size="SMALL" onClick={resetAndClose} />
              )}
              {step > 1 && (
                <button onClick={resetAndClose} className="text-[13px] font-semibold text-[#2322F0] hover:underline px-2">CANCEL</button>
              )}
            </div>
            <ButtonWidget
              label={step === lastStep ? 'CREATE' : 'NEXT'}
              style="SOLID"
              color="ACCENT"
              size="SMALL"
              onClick={step < lastStep ? () => setStep(step + 1) : () => { resetAndClose(); onCreate(); }}
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
  const [chatInput, setChatInput] = useState('')
  const [chatOpen, setChatOpen] = useState(true)
  const [aiSummaryOpen, setAiSummaryOpen] = useState(true)
  const [commentTab, setCommentTab] = useState<'all' | 'pinned'>('all')
  const [commentSearch, setCommentSearch] = useState('')
  const [isAddingComment, setIsAddingComment] = useState(false)
  const [newCommentText, setNewCommentText] = useState('')
  const [comments, setComments] = useState([
    { id: 1, user: 'Anna Underwriter', initials: 'AU', text: 'Customer requested expedited review due to upcoming board meeting. Please prioritize this submission.', date: 'Apr 12, 2026 3:45 PM', pinned: true, edited: false, replies: [
      { id: 11, user: 'Dheeraj Nair', initials: 'DN', text: 'Noted. Moving this to the top of the queue.', date: 'Apr 12, 2026 4:10 PM', edited: false },
    ] },
    { id: 2, user: 'System', initials: 'SY', text: 'ACORD 125 received via email. Documents classified and extraction initiated.', date: 'Apr 10, 2026 9:15 AM', pinned: false, edited: false, replies: [] },
    { id: 3, user: 'Avinash Thangaretinam', initials: 'AT', text: 'Broker confirmed the total insurance value. Updated the policy details accordingly.', date: 'Apr 8, 2026 11:30 AM', pinned: false, edited: true, replies: [] },
  ])
  const [chatMessages, setChatMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: 'Hi! I can help you with this submission. What would you like to know?' },
  ])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setChatMessages(prev => [...prev, { role: 'user', text }, { role: 'bot', text: 'Analyzing submission data... In production, this would provide real-time insights from the record.' }])
    setChatInput('')
  }

  const submitComment = () => {
    if (!newCommentText.trim()) return
    setComments(prev => [{ id: Date.now(), user: 'Dheeraj Nair', initials: 'DN', text: newCommentText, date: 'Apr 27, 2026 ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), pinned: false, edited: false, replies: [] }, ...prev])
    setNewCommentText('')
    setIsAddingComment(false)
  }

  const togglePin = (id: number) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, pinned: !c.pinned } : c))
  }

  const filteredComments = commentTab === 'pinned' ? comments.filter(c => c.pinned) : comments
  const searchedComments = commentSearch ? filteredComments.filter(c => c.text.toLowerCase().includes(commentSearch.toLowerCase())) : filteredComments
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')

  const submitReply = (parentId: number) => {
    if (!replyText.trim()) return
    setComments(prev => prev.map(c => c.id === parentId ? { ...c, replies: [...c.replies, { id: Date.now(), user: 'Dheeraj Nair', initials: 'DN', text: replyText, date: 'Apr 27, 2026 ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), edited: false }] } : c))
    setReplyText('')
    setReplyingTo(null)
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
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 pb-2">
          {['Summary', 'Risk Details', 'Financial Performance', 'Quote', 'Submission Docs', 'History', 'Messages', 'Related Actions'].map((tab, i) => (
            <button key={tab} className={`px-4 py-1.5 text-[12px] font-medium rounded-sm transition-colors whitespace-nowrap ${i === 0 ? 'bg-[#2322F0] text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>{tab}</button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-4 pb-8 submission-summary-content">

        {/* ═══ 2-PANE: Left content | Right AI Chat ═══ */}
        <div className="flex gap-6">

          {/* ══ LEFT: All content ══ */}
          <div className="flex-[3] min-w-0">

            {/* KPI Strip */}
            {/* AI Copilot Summary */}
            <div className="mb-5">
              <div style={{ backgroundColor: '#EDEEFA', borderRadius: '6px', padding: '20px' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-[#2322F0]" />
                    <p className="text-[15px] font-bold text-gray-900">AI Copilot — Submission Summary</p>
                  </div>
                  <button onClick={() => setAiSummaryOpen(!aiSummaryOpen)} className="text-gray-400 hover:text-gray-600">
                    <ChevronDown size={18} className={`transition-transform ${aiSummaryOpen ? '' : '-rotate-90'}`} />
                  </button>
                </div>
                {aiSummaryOpen && (
                  <div className="bg-white rounded-md p-4 text-[13px] text-gray-700 leading-relaxed space-y-2 mt-3">
                    <p>This is a New Business submission for Universal Exports under Management Liability — Directors & Officers (D&O). The proposed policy period runs from 04/01/2026 to 04/30/2026 with a total insurance value of $1,000,000 and an expiring premium of $500,000.</p>
                    <p>The submission is currently in Ready to Quote status with a priority score of 55% (Tier B+, Medium risk). One open alert exists for a potential duplicate submission match. The broker on record is Amal Chen from Universal Exports — Main Office.</p>
                  </div>
                )}
              </div>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-4 gap-4 mb-5">
          <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
            <div className="flex items-center gap-3">
              <StampField icon="shield" backgroundColor="#E8E7FD" contentColor="#2322F0" size="LARGE" marginBelow="NONE" shape="SEMI_ROUNDED" />
              <div><p className="text-[11px] text-gray-400">Product</p><p className="text-[13px] font-semibold text-gray-900">Directors & Officers (D&O)</p></div>
            </div>
          </CardLayout>
          <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
            <div className="flex items-center gap-3">
              <StampField icon="briefcase" backgroundColor="#D4EDDA" contentColor="#15803d" size="LARGE" marginBelow="NONE" shape="SEMI_ROUNDED" />
              <div><p className="text-[11px] text-gray-400">Line of Business</p><p className="text-[13px] font-semibold text-gray-900">Management Liability</p></div>
            </div>
          </CardLayout>
          <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
            <div className="flex items-center gap-3">
              <StampField icon="file-text" backgroundColor="#FDDEDE" contentColor="#b91c1c" size="LARGE" marginBelow="NONE" shape="SEMI_ROUNDED" />
              <div><p className="text-[11px] text-gray-400">Submission Type</p><p className="text-[13px] font-semibold text-gray-900">New Business</p></div>
            </div>
          </CardLayout>
          <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
            <div className="flex items-center gap-3">
              <StampField icon="users" backgroundColor="#E2E3E5" contentColor="#374151" size="LARGE" marginBelow="NONE" shape="SEMI_ROUNDED" />
              <div><p className="text-[11px] text-gray-400">Assignment Group</p><p className="text-[13px] font-semibold text-gray-900">ISU Sample</p><p className="text-[11px] text-[#2322F0] cursor-pointer hover:underline">Reassign</p></div>
            </div>
          </CardLayout>
        </div>

            <div className="flex gap-6">
              {/* Left inner column (60%) */}
              <div className="flex-[3] min-w-0 space-y-5">

                {/* Customer and Broker Information */}
                <div>
                  <div className="flex items-center justify-between mb-3"><p className="text-[15px] font-bold text-gray-900">Customer and Broker Information</p><Icon icon="edit" size="MEDIUM" color="ACCENT" /></div>
                  <CardLayout padding="MORE" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                    <div className="flex gap-6 border-b border-gray-200 mb-4 px-2">
                      <button onClick={() => setOverviewTab('customer')} className={`pb-2 text-[13px] font-medium border-b-[3px] -mb-[1px] transition-colors ${overviewTab === 'customer' ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Customer</button>
                      <button onClick={() => setOverviewTab('broker')} className={`pb-2 text-[13px] font-medium border-b-[3px] -mb-[1px] transition-colors ${overviewTab === 'broker' ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Broker</button>
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
                          <div><p className="text-[12px] text-gray-400">Organization Type</p><p className="text-[13px] text-gray-900">Corporation</p></div>
                          <div><p className="text-[12px] text-gray-400">Contact Name</p><p className="text-[13px] text-gray-900">James Wilson</p></div>
                          <div><p className="text-[12px] text-gray-400">Contact Email</p><p className="text-[13px] text-gray-900">j.wilson@universalexports.com</p></div>
                        </div>
                        <div className="space-y-3">
                          <p className="text-[11px] text-gray-400 uppercase tracking-wide">Additional</p>
                          <div><p className="text-[12px] text-gray-400">NAICS Code</p><p className="text-[13px] text-gray-900">481 - Air Transportation</p></div>
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
                          <div><p className="text-[12px] text-gray-400">Broker Email</p><p className="text-[13px] text-gray-900">amal.chen@universalexports.com</p></div>
                        </div>
                      </div>
                    )}
                  </CardLayout>
                </div>

                {/* Risk Information */}
                <div>
                  <div className="flex items-center justify-between mb-3"><p className="text-[15px] font-bold text-gray-900">Risk Information</p><Icon icon="edit" size="MEDIUM" color="ACCENT" /></div>
                  <CardLayout padding="MORE" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">

                    {/* Top row: Score + Exposure side by side */}
                    <div className="flex gap-4 mb-4">

                      {/* Submission Score — compact left panel */}
                      <div className="w-[240px] flex-shrink-0 border border-gray-100 rounded-lg p-4 bg-white">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-[14px] font-bold text-gray-900">Submission Score</p>
                          <Icon icon="info" size="SMALL" color="ACCENT" />
                        </div>
                        <div className="flex items-center gap-5">
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E5E7EB" strokeWidth="2.5" />
                              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="54 46" strokeLinecap="round" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-[16px] font-bold text-gray-900">54%</span>
                          </div>
                          <div className="space-y-2.5">
                            <div><p className="text-[11px] text-gray-400">Customer Employee Count</p><p className="text-[13px] font-bold text-gray-900">50</p></div>
                            <div><p className="text-[11px] text-gray-400">Rush Status</p><p className="text-[13px] font-bold text-gray-900">0</p></div>
                            <div><p className="text-[11px] text-gray-400">Submission Channel</p><p className="text-[13px] font-bold text-gray-900">4</p></div>
                          </div>
                        </div>
                      </div>

                      {/* Exposure and Coverage — fills remaining space */}
                      <div className="flex-1 border border-gray-100 rounded-lg p-4 bg-white">
                        <p className="text-[14px] font-bold text-gray-900 mb-3">Exposure and Coverage Information</p>
                        <div className="flex gap-8 mb-4">
                          <div><p className="text-[11px] text-gray-400">Total Assets</p><p className="text-[13px] text-gray-500">-</p></div>
                          <div><p className="text-[11px] text-gray-400">Calculated FTE</p><p className="text-[13px] text-gray-500">-</p></div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <p className="text-[13px] font-bold text-gray-900">Coverage Details</p>
                          <Icon icon="edit" size="SMALL" color="ACCENT" />
                        </div>
                        <table className="w-full text-left table-fixed">
                          <thead><tr className="border-b border-gray-200">{['Coverage', 'Per Claim Limit', 'Aggregate Limit', 'Retention'].map(h => <th key={h} className="text-[11px] font-semibold text-gray-900 py-2 pr-3">{h}</th>)}</tr></thead>
                          <tbody>
                            <tr className="border-b border-gray-100"><td className="py-2.5 pr-3 text-[13px] text-gray-900">D&O</td><td className="py-2.5 pr-3 text-[13px] text-gray-400">-</td><td className="py-2.5 pr-3 text-[13px] text-gray-400">-</td><td className="py-2.5 pr-3 text-[13px] text-gray-400">-</td></tr>
                            <tr><td className="py-2.5 pr-3 text-[13px] text-gray-900">EPL</td><td className="py-2.5 pr-3 text-[13px] text-gray-400">-</td><td className="py-2.5 pr-3 text-[13px] text-gray-400">-</td><td className="py-2.5 pr-3 text-[13px] text-gray-400">-</td></tr>
                          </tbody>
                        </table>
                      </div>

                    </div>

                    {/* Loss History — full width bottom */}
                    <div className="border border-gray-100 rounded-lg p-4 bg-white">
                      <p className="text-[14px] font-bold text-gray-900 mb-2">Loss History</p>
                      <div className="flex items-center gap-3 py-2">
                        <FileText size={24} className="text-gray-300" />
                        <div>
                          <p className="text-[13px] text-gray-500">No loss history information available.</p>
                          <button className="text-[13px] text-[#2322F0] hover:underline">Update Information</button>
                        </div>
                      </div>
                    </div>

                  </CardLayout>
                </div>
                {/* Comments (moved from right column) */}
                <div>
                  <p className="text-[15px] font-bold text-gray-900 mb-3">Comments</p>
                  <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                    {/* Tabs */}
                    <div className="flex gap-6 border-b border-gray-200 mb-3 px-2">
                      <button onClick={() => setCommentTab('all')} className={`pb-2 text-[13px] font-medium border-b-[3px] -mb-[1px] transition-colors ${commentTab === 'all' ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>All</button>
                      <button onClick={() => setCommentTab('pinned')} className={`pb-2 text-[13px] font-medium border-b-[3px] -mb-[1px] transition-colors ${commentTab === 'pinned' ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Pinned</button>
                    </div>

                    {/* Add Comment button + Search row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {!isAddingComment && (
                        <button onClick={() => setIsAddingComment(true)} className="flex items-center gap-1.5 border border-gray-300 rounded px-3 py-1.5 text-[12px] font-semibold text-gray-700 hover:bg-gray-50">
                          + ADD COMMENT
                        </button>
                      )}
                      {!isAddingComment && (
                        <div className="flex items-center border border-gray-300 rounded px-2 py-1 bg-white flex-1 min-w-0 ml-2">
                          <Search size={12} className="text-gray-400 mr-1.5 flex-shrink-0" />
                          <input type="text" value={commentSearch} onChange={(e) => setCommentSearch(e.target.value)} placeholder="Search comments..." className="text-[12px] outline-none w-full bg-transparent" />
                        </div>
                      )}
                    </div>

                    {/* AI Summary banner */}
                    <div className="flex items-center gap-2 bg-[#EDEEFA] rounded px-3 py-2 mb-3">
                      <Sparkles size={14} className="text-[#2322F0] flex-shrink-0" />
                      <p className="text-[12px] text-gray-600">AI-generated summary will become available as additional comments are added.</p>
                    </div>

                    {/* Inline Comment Input */}
                    {isAddingComment && (
                      <div className="border border-gray-200 rounded mb-3">
                        <p className="text-[13px] font-semibold text-gray-900 px-3 pt-3 mb-1">Add Comment <span className="text-[#2322F0]">*</span></p>
                        <div className="border border-gray-300 rounded mx-3">
                          <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-200 bg-gray-50">
                            <button className="px-1.5 py-0.5 text-[12px] font-bold text-gray-600 hover:bg-gray-200 rounded">B</button>
                            <button className="px-1.5 py-0.5 text-[12px] italic text-gray-600 hover:bg-gray-200 rounded">I</button>
                            <button className="px-1.5 py-0.5 text-[12px] underline text-gray-600 hover:bg-gray-200 rounded">U</button>
                            <button className="px-1.5 py-0.5 text-[12px] line-through text-gray-600 hover:bg-gray-200 rounded">S</button>
                            <button className="px-1.5 py-0.5 text-[12px] text-gray-600 hover:bg-gray-200 rounded">🔗</button>
                            <span className="w-px h-4 bg-gray-300 mx-1" />
                            <button className="px-1.5 py-0.5 text-[12px] text-gray-600 hover:bg-gray-200 rounded">≡</button>
                            <button className="px-1.5 py-0.5 text-[12px] text-gray-600 hover:bg-gray-200 rounded">☰</button>
                            <div className="ml-auto"><Icon icon="info" size="SMALL" color="ACCENT" /></div>
                          </div>
                          <textarea
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            placeholder=""
                            className="w-full px-3 py-2 text-[13px] resize-none h-28 outline-none bg-transparent"
                          />
                        </div>
                        <div className="flex items-end gap-4 px-3 py-3">
                          <div className="flex-1">
                            <p className="text-[12px] font-semibold text-gray-900 mb-1">Upload Documents</p>
                            <div className="border border-dashed border-gray-300 rounded px-2 py-1.5 flex items-center gap-2">
                              <button className="text-[11px] border border-gray-300 rounded px-2 py-0.5 text-gray-600 hover:bg-gray-50">UPLOAD</button>
                              <span className="text-[11px] text-gray-400">Drop or paste files h...</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-[12px] font-semibold text-gray-900 mb-1">Link Documents</p>
                            <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[12px] outline-none" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[12px] font-semibold text-gray-900 mb-1">Tag Users</p>
                            <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[12px] outline-none" />
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 px-3 pb-3">
                          <button onClick={() => { setIsAddingComment(false); setNewCommentText('') }} className="text-[12px] font-semibold text-gray-500 hover:text-gray-700 px-2">CANCEL</button>
                          <ButtonWidget label="ADD COMMENT" style="SOLID" color="ACCENT" size="SMALL" onClick={submitComment} />
                        </div>
                      </div>
                    )}

                    {/* Comment Thread */}
                    <div className="space-y-0">
                      {searchedComments.length === 0 && (
                        <p className="text-[13px] text-gray-400 italic py-4 text-center">No comments yet.</p>
                      )}
                      {searchedComments.map((comment) => (
                        <div key={comment.id} className="border-b border-gray-100 py-3 last:border-b-0">
                          <div className="flex items-start gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#2322F0] text-white flex items-center justify-center text-[11px] font-semibold flex-shrink-0">{comment.initials}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-[13px] font-semibold text-gray-900">{comment.user}</span>
                                  <p className="text-[11px] text-gray-400">{comment.date}{comment.edited ? ' (edited)' : ''}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-300 cursor-pointer hover:text-gray-500">⋮</span>
                                  <button onClick={() => togglePin(comment.id)} className="hover:opacity-80" title={comment.pinned ? 'Unpin' : 'Pin'}>
                                    <Bookmark size={16} className={comment.pinned ? 'fill-[#2322F0] text-[#2322F0]' : 'text-gray-300'} />
                                  </button>
                                </div>
                              </div>
                              <p className="text-[13px] text-gray-700 mt-1.5 leading-relaxed">{comment.text}</p>
                              <button onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} className="text-[12px] text-gray-400 hover:text-[#2322F0] mt-1.5 flex items-center gap-1">
                                <Icon icon="reply" size="SMALL" color="SECONDARY" /> Reply
                              </button>
                            </div>
                          </div>

                          {/* Replies */}
                          {comment.replies.length > 0 && (
                            <div className="ml-10 mt-2 space-y-2">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="border-l-2 border-gray-200 pl-3 py-2">
                                  <div className="flex items-start gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#2322F0] text-white flex items-center justify-center text-[9px] font-semibold flex-shrink-0">{reply.initials}</div>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-[12px] font-semibold text-gray-900">{reply.user}</span>
                                      <p className="text-[11px] text-gray-400">{reply.date}{reply.edited ? ' (edited)' : ''}</p>
                                      <p className="text-[12px] text-gray-700 mt-0.5">{reply.text}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Inline Reply Input */}
                          {replyingTo === comment.id && (
                            <div className="ml-10 mt-2 bg-gray-50 rounded p-3">
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                className="w-full border border-gray-300 rounded px-3 py-2 text-[12px] resize-none h-16 outline-none focus:border-[#2322F0] bg-white mb-2"
                              />
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => { setReplyingTo(null); setReplyText('') }} className="text-[11px] text-gray-500 hover:text-gray-700">Cancel</button>
                                <ButtonWidget label="REPLY" style="SOLID" color="ACCENT" size="SMALL" onClick={() => submitReply(comment.id)} />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardLayout>
                </div>

              </div>

              {/* Right inner column (40%) */}
              <div className="flex-[2] flex-shrink-0 space-y-5">

                {/* Policy Details */}
                <div>
                  <div className="flex items-center justify-between mb-3"><p className="text-[15px] font-bold text-gray-900">Policy Details</p><Icon icon="edit" size="MEDIUM" color="ACCENT" /></div>
                  <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                      <div><p className="text-[12px] text-gray-400">Product Segment</p><p className="text-[13px] text-gray-900">Commercial</p></div>
                      <div><p className="text-[12px] text-gray-400">Insurance Carrier Branch</p><p className="text-[13px] text-gray-900">LIC</p></div>
                      <div><p className="text-[12px] text-gray-400">Proposed Effective Date</p><p className="text-[13px] text-gray-900">04/01/2026</p></div>
                      <div><p className="text-[12px] text-gray-400">Proposed Expiration Date</p><p className="text-[13px] text-gray-900">04/30/2026</p></div>
                      <div><p className="text-[12px] text-gray-400">Total Insurance Value</p><p className="text-[13px] text-gray-900">$1,000,000</p></div>
                      <div><p className="text-[12px] text-gray-400">Expiring Premium</p><p className="text-[13px] text-gray-900">$500,000</p></div>
                      <div><p className="text-[12px] text-gray-400">Rush Status</p><p className="text-[13px] text-gray-900">Standard</p></div>
                      <div><p className="text-[12px] text-gray-400">Primary / Excess Status</p><p className="text-[13px] text-gray-900">Primary</p></div>
                      <div><p className="text-[12px] text-gray-400">Status</p><TagField tags={[{ text: "Ready to Quote", backgroundColor: "POSITIVE" }]} size="SMALL" marginBelow="NONE" /></div>
                    </div>
                  </CardLayout>
                </div>

                {/* Related Submissions */}
                <div>
                  <div className="flex items-center justify-between mb-3"><p className="text-[15px] font-bold text-gray-900">Related Submissions</p></div>
                  <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                    <div className="flex items-center justify-between mb-2"><span className="text-[12px] text-gray-400">3 related submissions</span></div>
                    <div className="flex items-center gap-3 py-2 border-b border-gray-100">
                      <StampField icon="file-text" backgroundColor="#E8E7FD" contentColor="#2322F0" size="SMALL" marginBelow="NONE" />
                      <div><p className="text-[13px] font-semibold text-[#2322F0] hover:underline cursor-pointer">SUB0401XUSC</p><p className="text-[12px] text-gray-400">Renewal · Bound 4/1/2025</p></div>
                    </div>
                    <div className="flex items-center gap-3 py-2 border-b border-gray-100">
                      <StampField icon="file-text" backgroundColor="#E8E7FD" contentColor="#2322F0" size="SMALL" marginBelow="NONE" />
                      <div><p className="text-[13px] font-semibold text-[#2322F0] hover:underline cursor-pointer">SUB0312PRPC</p><p className="text-[12px] text-gray-400">New Business · Quoted 3/12/2025</p></div>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <StampField icon="file-text" backgroundColor="#E8E7FD" contentColor="#2322F0" size="SMALL" marginBelow="NONE" />
                      <div><p className="text-[13px] font-semibold text-[#2322F0] hover:underline cursor-pointer">SUB0228GLXS</p><p className="text-[12px] text-gray-400">Renewal · Bound 2/28/2025</p></div>
                    </div>
                  </CardLayout>
                </div>

                {/* Open Alerts */}
                <div>
                  <div className="flex items-center justify-between mb-3"><p className="text-[15px] font-bold text-gray-900">Open Alerts</p><span className="text-[11px] text-gray-400">1 of 1</span></div>
                  <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                  <div className="flex items-start gap-2.5 py-2">
                    <StampField icon="mail" backgroundColor="#E8E7FD" contentColor="#2322F0" size="MEDIUM" marginBelow="NONE" shape="SEMI_ROUNDED" />
                    <div><p className="text-[13px] font-semibold text-[#2322F0]">Duplicate Submission Detected</p><p className="text-[12px] text-gray-400">Match: SUB0401XUSC</p></div>
                  </div>
                </CardLayout>
                </div>

                {/* Tasks */}
                <div>
                  <div className="flex items-center justify-between mb-3"><p className="text-[15px] font-bold text-gray-900">Tasks</p><ButtonWidget label="CREATE TASK" style="OUTLINE" color="ACCENT" size="SMALL" /></div>
                  <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
                    <div className="flex gap-6 border-b border-gray-200 mb-3 px-2">
                      {([{ key: 'open' as const, label: 'Open' }, { key: 'completed' as const, label: 'Completed' }, { key: 'not-needed' as const, label: 'Not Needed' }]).map(t => (
                        <button key={t.key} onClick={() => setTaskTab(t.key)} className={`pb-2 text-[13px] font-medium border-b-[3px] -mb-[1px] transition-colors ${taskTab === t.key ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>{t.label}</button>
                      ))}
                    </div>
                    <table className="w-full text-left table-fixed">
                      <thead>
                        <tr className="border-b border-gray-200">
                          {(taskTab === 'completed' ? ['Task', 'Type', 'Completed On'] : ['Task', 'Type', 'Due Date']).map((h, i) => <th key={h} className={`text-[11px] font-semibold text-gray-900 py-2 pr-3 ${i === 0 ? 'w-[50%]' : 'w-[25%]'}`}>{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {taskTab === 'open' && (<>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 pr-3"><p className="text-[13px] font-semibold text-gray-900">Upload loss runs for Acme Corp</p><p className="text-[12px] text-gray-400">Anna Underwriter</p></td>
                            <td className="py-3 pr-3 text-[13px] text-gray-700">Upload Document</td>
                            <td className="py-3 pr-3 text-[13px] text-gray-900">Due 2 days ago</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 pr-3"><p className="text-[13px] font-semibold text-gray-900">Complete sanctions review for TechStart</p><p className="text-[12px] text-gray-400">Anna Underwriter</p></td>
                            <td className="py-3 pr-3 text-[13px] text-gray-700">Sanctions Check</td>
                            <td className="py-3 pr-3 text-[13px] text-gray-900">Due today</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 pr-3"><p className="text-[13px] font-semibold text-gray-900">Confirm broker details for Global Logistics</p><p className="text-[12px] text-gray-400">Dhruva K.</p></td>
                            <td className="py-3 pr-3 text-[13px] text-gray-700">Confirmation</td>
                            <td className="py-3 pr-3 text-[13px] text-gray-900">Due in 3 days</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 pr-3"><p className="text-[13px] font-semibold text-gray-900">Manager referral — TIV exceeds authority</p><p className="text-[12px] text-gray-400">Anna Underwriter</p></td>
                            <td className="py-3 pr-3 text-[13px] text-gray-700">Referral</td>
                            <td className="py-3 pr-3 text-[13px] text-gray-900">Due in 5 days</td>
                          </tr>
                        </>)}
                        {taskTab === 'completed' && (<>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 pr-3"><p className="text-[13px] font-semibold text-gray-900">Upload ACORD 125 for Summit Construction</p><p className="text-[12px] text-gray-400">Anna Underwriter</p></td>
                            <td className="py-3 pr-3 text-[13px] text-gray-700">Upload Document</td>
                            <td className="py-3 pr-3 text-[13px] text-gray-700">Apr 22, 2026</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-3 pr-3"><p className="text-[13px] font-semibold text-gray-900">Review extracted ACORD 140 data</p><p className="text-[12px] text-gray-400">Dhruva K.</p></td>
                            <td className="py-3 pr-3 text-[13px] text-gray-700">Document Review</td>
                            <td className="py-3 pr-3 text-[13px] text-gray-700">Apr 20, 2026</td>
                          </tr>
                        </>)}
                        {taskTab === 'not-needed' && (
                          <tr><td colSpan={3} className="py-8 text-center text-[13px] text-gray-400">No tasks available</td></tr>
                        )}
                      </tbody>
                    </table>
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
          <span title="AI Chat"><Sparkles size={16} className="text-[#2322F0]" /></span>
        </div>
      )}
    </>
  )
}

// ── Exception Queue Data ──
const messageExceptions = [
  { id: 'ME-001', subject: 'Missing policy number in submission', senderEmail: 'broker@acmecorp.com', reason: 'Incomplete Data', receivedOn: 'Apr 20, 2026 10:32 AM' },
  { id: 'ME-002', subject: 'Duplicate submission detected', senderEmail: 'agent@pacificretail.com', reason: 'Duplicate Entry', receivedOn: 'Apr 19, 2026 3:15 PM' },
  { id: 'ME-003', subject: 'Unrecognized broker code', senderEmail: 'ops@coastalshipping.com', reason: 'Invalid Reference', receivedOn: 'Apr 18, 2026 9:45 AM' },
  { id: 'ME-004', subject: 'Premium mismatch on renewal', senderEmail: 'underwriting@metrofoods.com', reason: 'Data Mismatch', receivedOn: 'Apr 17, 2026 2:20 PM' },
]

const classificationExceptions = [
  { id: 'CE-001', documentName: 'ACORD_125_AcmeCorp.pdf', submissionId: 'SUB-10482', receivedOn: 'Apr 21, 2026 11:00 AM' },
  { id: 'CE-002', documentName: 'Loss_Run_PacificRetail.pdf', submissionId: 'SUB-10471', receivedOn: 'Apr 20, 2026 4:30 PM' },
  { id: 'CE-003', documentName: 'Endorsement_CoastalShipping.pdf', submissionId: 'SUB-10465', receivedOn: 'Apr 19, 2026 1:10 PM' },
]

const reconciliationExceptions = [
  { id: 'RE-001', documentName: 'ACORD_140_RiversideHotels.pdf', lastOpened: 'Dheeraj at 10:15 AM', submissionId: 'SUB-10471', documentType: 'ACORD 140', receivedOn: 'Apr 22, 2026 8:30 AM' },
  { id: 'RE-002', documentName: 'ACORD_125_MetroFoods.pdf', lastOpened: '', submissionId: 'SUB-10460', documentType: 'ACORD 125', receivedOn: 'Apr 21, 2026 2:45 PM' },
  { id: 'RE-003', documentName: 'ACORD_127_AcmeCorp.pdf', lastOpened: 'Sarah at 9:00 AM', submissionId: 'SUB-10482', documentType: 'ACORD 127', receivedOn: 'Apr 20, 2026 11:20 AM' },
  { id: 'RE-004', documentName: 'Schedule_PacificRetail.pdf', lastOpened: '', submissionId: 'SUB-10471', documentType: 'Schedule', receivedOn: 'Apr 19, 2026 5:00 PM' },
  { id: 'RE-005', documentName: 'ACORD_125_CoastalShipping.pdf', lastOpened: 'Dheeraj at 3:30 PM', submissionId: 'SUB-10465', documentType: 'ACORD 125', receivedOn: 'Apr 18, 2026 10:00 AM' },
]

function ExceptionsView() {
  const [exceptionTab, setExceptionTab] = useState<'message' | 'classification' | 'reconciliation'>('message')
  return (
    <div>
      <p className="text-[15px] font-bold text-gray-900 mb-4">Exception Queue</p>
      <div className="flex gap-0 min-h-[calc(100vh-250px)]">
        {/* Side Nav */}
        <div className="w-52 flex-shrink-0 bg-white">
          <CardLayout padding="NONE" showShadow={false} showBorder={false} shape="SQUARED">
            {([
              { key: 'message' as const, label: 'Message' },
              { key: 'classification' as const, label: 'Classification' },
              { key: 'reconciliation' as const, label: 'Reconciliation' },
            ]).map(t => (
              <button key={t.key} onClick={() => setExceptionTab(t.key)}
                className={`w-full text-left px-5 py-4 text-[14px] transition-colors border-l-[4px] ${
                  exceptionTab === t.key
                    ? 'text-gray-900 font-bold border-[#2322F0] bg-[#EDEEFA]'
                    : 'text-gray-600 font-normal border-transparent hover:bg-gray-50'
                }`}>
                {t.label}
              </button>
            ))}
          </CardLayout>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pl-4">
          <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">

        {/* Message Exceptions Table */}
        {exceptionTab === 'message' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  {['Subject', 'Sender Email', 'Reason', 'Received On'].map(h => (
                    <th key={h} className="text-[12px] font-semibold text-gray-900 tracking-wide py-2 pr-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {messageExceptions.map(row => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-3"><a href="#" className="text-[13px] font-semibold text-[#2322F0] hover:underline">{row.subject}</a></td>
                    <td className="py-3 pr-3 text-[13px] text-gray-700">{row.senderEmail}</td>
                    <td className="py-3 pr-3 text-[13px] text-gray-700">{row.reason}</td>
                    <td className="py-3 pr-3 text-[13px] text-gray-700">{row.receivedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Classification Exceptions Table */}
        {exceptionTab === 'classification' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  {['Document Name', 'Submission ID', 'Received On'].map(h => (
                    <th key={h} className="text-[12px] font-semibold text-gray-900 tracking-wide py-2 pr-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {classificationExceptions.map(row => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-3"><a href="#" className="text-[13px] font-semibold text-[#2322F0] hover:underline">{row.documentName}</a></td>
                    <td className="py-3 pr-3"><a href="#" className="text-[13px] text-[#2322F0] hover:underline">{row.submissionId}</a></td>
                    <td className="py-3 pr-3 text-[13px] text-gray-700">{row.receivedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reconciliation Exceptions Table */}
        {exceptionTab === 'reconciliation' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  {['Document Name', 'Submission ID', 'Document Type', 'Last Opened', 'Received On'].map(h => (
                    <th key={h} className="text-[12px] font-semibold text-gray-900 tracking-wide py-2 pr-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reconciliationExceptions.map(row => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-3"><a href="#" className="text-[13px] font-semibold text-[#2322F0] hover:underline">{row.documentName}</a></td>
                    <td className="py-3 pr-3"><a href="#" className="text-[13px] text-[#2322F0] hover:underline">{row.submissionId}</a></td>
                    <td className="py-3 pr-3 text-[13px] text-gray-700">{row.documentType}</td>
                    <td className="py-3 pr-3 text-[13px] text-gray-500">{row.lastOpened || '—'}</td>
                    <td className="py-3 pr-3 text-[13px] text-gray-700">{row.receivedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
          </CardLayout>
        </div>
      </div>
    </div>
  )
}

export default function InsuranceWorkspace() {
  const [contentTab, setContentTab] = useState<'dashboard' | 'submissions' | 'exceptions'>('submissions')
  const [dashboardPersona, setDashboardPersona] = useState<'underwriter' | 'manager'>('underwriter')
  const [mainTab, setMainTab] = useState<'my' | 'shared'>('my')
  const [activeView, setActiveView] = useState<'cards' | 'list'>('cards')
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([])
  const [rightPaneOpen, setRightPaneOpen] = useState(true)
  const [statusOpen, setStatusOpen] = useState(true)
  const [todoOpen, setTodoOpen] = useState(true)
  const [alertsOpen, setAlertsOpen] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [currentPage, setCurrentPage] = useState<'workspace' | 'summary' | 'submissions-site'>('workspace')
  const [selectedSub, setSelectedSub] = useState<{ id: string; title: string } | null>(null)
  const visibleAlerts = alerts.filter((_, idx) => !dismissedAlerts.includes(idx))

  if (currentPage === 'submissions-site') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 h-12 flex items-center">
          <img src="/appian-logo.png" alt="Appian" className="h-6 mr-8" />
          <nav className="flex h-full">
            {['WORKBENCH', 'SUBMISSIONS', 'PARTIES', 'MESSAGES', 'REPORTS'].map((item, i) => (
              <a key={item} href="#"
                onClick={(e) => { e.preventDefault(); if (item === 'WORKBENCH') setCurrentPage('workspace'); if (item === 'SUBMISSIONS') setCurrentPage('submissions-site') }}
                className={`px-4 h-full flex items-center text-[13px] font-semibold tracking-wide border-b-[3px] transition-colors ${
                  i === 1 ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-500 border-transparent hover:text-gray-900'
                }`}>{item}</a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-[13px] text-gray-500">Connected Underwriting ▾</span>
            <div className="w-8 h-8 rounded-full bg-[#2322F0] text-white flex items-center justify-center text-[13px] font-semibold">AU</div>
          </div>
        </div>
        <div className="pt-12 px-6">
          <div className="flex items-center justify-between mt-5 mb-4">
            <h1 className="text-[21px] font-semibold text-gray-900 uppercase">Submissions</h1>
            <ButtonWidget label="+ CREATE SUBMISSION" style="SOLID" color="ACCENT" size="SMALL" onClick={() => setShowCreateModal(true)} />
          </div>
          <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="SEMI_ROUNDED">
            {/* Search + Filters */}
            <div className="flex items-center gap-2 mb-3 w-full">
              <div className="flex items-center border border-gray-300 rounded px-2 py-1.5 bg-white flex-1 min-w-0">
                <Search size={12} className="text-gray-400 mr-1.5 flex-shrink-0" />
                <input type="text" placeholder="Search Submissions" className="text-[12px] outline-none w-full bg-transparent" />
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 flex-1 min-w-0 border-l border-gray-200 pl-2 ml-1">
                <span className="font-semibold uppercase whitespace-nowrap">Status</span>
                <select className="text-[12px] border border-gray-300 rounded px-1.5 py-1 text-gray-600 flex-1 min-w-0"><option>Any</option></select>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 flex-1 min-w-0">
                <span className="font-semibold uppercase whitespace-nowrap">Assignee</span>
                <select className="text-[12px] border border-gray-300 rounded px-1.5 py-1 text-gray-600 flex-1 min-w-0"><option>Any</option></select>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 flex-1 min-w-0">
                <span className="font-semibold uppercase whitespace-nowrap">Line of Business</span>
                <select className="text-[12px] border border-gray-300 rounded px-1.5 py-1 text-gray-600 flex-1 min-w-0"><option>Any</option></select>
              </div>
            </div>
            {/* Full submissions grid — all columns */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    {['Submission', 'Status', 'Channel', 'Customer', 'Line of Business', 'Score', 'Created', 'Last Modified'].map(h => (
                      <th key={h} className="text-[12px] font-semibold text-gray-900 tracking-wide py-2 pr-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listData.map((row) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => { setSelectedSub({ id: row.id, title: row.customer }); setCurrentPage('summary') }}>
                      <td className="py-3 pr-3">
                        <span className="text-[13px] font-semibold text-[#2322F0] hover:underline">{row.id} - {row.customer}</span>
                        <p className="text-[12px] text-gray-400">{row.group}</p>
                        {row.alerts > 0 && <p className="text-[12px] text-red-500 flex items-center gap-0.5"><AlertTriangle size={9} /> {row.alerts} Alert{row.alerts > 1 ? 's' : ''}</p>}
                      </td>
                      <td className="py-3 pr-3">
                        <TagField tags={[{ text: row.status, backgroundColor: row.statusColor }]} size="SMALL" marginBelow="NONE" />
                      </td>
                      <td className="py-3 pr-3">
                        <p className="text-[13px] text-gray-700">{row.channel}</p>
                        <p className="text-[12px] text-gray-400 flex items-center gap-0.5"><FileText size={9} /> {row.docs} Document{row.docs !== 1 ? 's' : ''}</p>
                      </td>
                      <td className="py-3 pr-3 text-[13px] text-[#2322F0]">{row.customer}</td>
                      <td className="py-3 pr-3 text-[13px] text-gray-700">{row.lob}</td>
                      <td className="py-3 pr-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[13px] font-semibold ${
                          row.score <= 45 ? 'bg-red-100 text-red-700' :
                          row.score >= 66 ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-900'
                        }`}>{row.score}%</span>
                      </td>
                      <td className="py-3 pr-3 text-[12px] text-gray-500">Apr 20, 2026</td>
                      <td className="py-3 pr-3 text-[12px] text-gray-500">2 hours ago</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardLayout>
        </div>
        <CreateSubmissionWizard open={showCreateModal} onClose={() => setShowCreateModal(false)} onCreate={() => { setSelectedSub({ id: 'SUB0326STKW', title: 'Universal Exports' }); setCurrentPage('summary') }} />
      </div>
    )
  }

  if (currentPage === 'summary') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* ═══ TOP NAV (fixed) ═══ */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 h-12 flex items-center">
          <img src="/appian-logo.png" alt="Appian" className="h-6 mr-8" />
          <nav className="flex h-full">
            {['WORKBENCH', 'SUBMISSIONS', 'PARTIES', 'MESSAGES', 'REPORTS'].map((item, i) => (
              <a key={item} href="#"
                onClick={(e) => { e.preventDefault(); if (item === 'WORKBENCH') setCurrentPage('workspace'); if (item === 'SUBMISSIONS') setCurrentPage('submissions-site') }}
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
              onClick={(e) => { e.preventDefault(); if (item === 'WORKBENCH') setCurrentPage('workspace'); if (item === 'SUBMISSIONS') setCurrentPage('submissions-site') }}
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
          <ButtonWidget label="+ CREATE SUBMISSION" style="SOLID" color="ACCENT" size="SMALL" onClick={() => setShowCreateModal(true)} />
        </div>
        <div className="flex border-b-2 border-gray-200">
              <button onClick={() => setContentTab('dashboard')}
                className={`px-6 pb-2.5 text-[15px] font-medium border-b-[3px] -mb-[2px] transition-colors ${contentTab === 'dashboard' ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Dashboard</button>
              <button onClick={() => { setContentTab('submissions'); setMainTab('my') }}
                className={`px-6 pb-2.5 text-[15px] font-medium border-b-[3px] -mb-[2px] transition-colors ${contentTab === 'submissions' && mainTab === 'my' ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Submissions</button>
              <button onClick={() => setContentTab('exceptions')}
                className={`px-6 pb-2.5 text-[15px] font-medium border-b-[3px] -mb-[2px] transition-colors ${contentTab === 'exceptions' ? 'text-gray-900 font-bold border-[#2322F0]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Exceptions</button>
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
                <div className="grid grid-cols-2 gap-4">
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
                        <Bar dataKey="count" fill="#152B99" radius={[0, 4, 4, 0]} barSize={18} isAnimationActive={false} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardLayout>
                </div>

                {/* ── Row 3: My Pipeline + Upcoming Renewals ── */}
                <div className="grid grid-cols-2 gap-5">
                  <CardLayout padding="MORE" showShadow={true}>
                    <RichTextDisplayField value={[<TextItem key="h" text="My Submission Pipeline" size="MEDIUM" style="STRONG" />]} marginBelow="LESS" />
                    <RichTextDisplayField value={[<TextItem key="sub" text="Your submissions by current status" size="SMALL" color="SECONDARY" />]} marginBelow="STANDARD" />
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={[
                        { status: 'Ready', count: 3 },
                        { status: 'In Review', count: 5 },
                        { status: 'Missing Info', count: 2 },
                        { status: 'On Hold', count: 1 },
                        { status: 'Ready to Quote', count: 2 },
                        { status: 'Processing', count: 1 },
                      ]} margin={{ left: 0, right: 16, top: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="status" tick={{ fontSize: 10, fill: '#374151' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: '1px solid #e5e7eb', boxShadow: 'none' }} />
                        <Bar dataKey="count" fill="#152B99" radius={[4, 4, 0, 0]} barSize={28} isAnimationActive={false} />
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
                      <Line type="monotone" dataKey="days" stroke="#152B99" strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: '#2322F0', strokeWidth: 2 }} activeDot={{ r: 5, fill: '#2322F0' }} isAnimationActive={false} />
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
                        <Bar dataKey="inProgress" stackId="a" fill="#152B99" name="In Progress" barSize={24} isAnimationActive={false} />
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
                          { name: 'Assigned to Underwriter', value: 26, color: '#2322F0' },
                          { name: 'Assigned to Group', value: 14, color: '#FFB300' },
                        ]} cx="50%" cy="45%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={2} stroke="none" isAnimationActive={false}>
                          <Cell fill="#152B99" /><Cell fill="#FFB300" />
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
                        <Line type="monotone" dataKey="days" stroke="#152B99" strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: '#2322F0', strokeWidth: 2 }} activeDot={{ r: 5, fill: '#2322F0' }} isAnimationActive={false} />
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
                        <Bar dataKey="count" fill="#152B99" radius={[0, 4, 4, 0]} barSize={18} isAnimationActive={false} />
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
                    <ListView onSelectSubmission={(id, title) => { setSelectedSub({ id, title }); setCurrentPage('summary') }} />
                  </CardLayout>
                )}
              </>
            )}

            {/* ═══ EXCEPTIONS ═══ */}
            {contentTab === 'exceptions' && (
              <ExceptionsView />
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
                  <Cell fill="#ef4444" /><Cell fill="#152B99" /><Cell fill="#FFB300" />
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
                    <StampField icon="mail" backgroundColor="#E8E7FD" contentColor="#2322F0" size="MEDIUM" marginBelow="NONE" shape="SEMI_ROUNDED" />
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
      <CreateSubmissionWizard open={showCreateModal} onClose={() => setShowCreateModal(false)} onCreate={() => { setSelectedSub({ id: 'SUB0326STKW', title: 'Universal Exports' }); setCurrentPage('summary') }} />
    </div>
  )
}
