import { HeadingField, ButtonWidget } from '@pglevy/sailwind'
import { useLocation } from 'wouter'

const submissions = [
  { id: 'SUB0408EEUV', assignee: 'Serena Julius', status: 'Marked For Renewal', statusColor: 'text-purple-700', alerts: 1, channel: 'Manual', docs: 1, customer: 'Yavin Enterprises', lob: 'Commercial Property', score: 36, scoreColor: 'text-red-500', received: '4/8/2026', receivedBy: 'Serena Julius', modified: '4/8/2026', modifiedBy: 'Serena Julius' },
  { id: 'SUB0406IT90', assignee: '', status: 'Review Complete-Issued', statusColor: 'text-red-700', alerts: 0, channel: 'Manual', docs: 1, customer: 'Yavin Enterprises', lob: 'Commercial Property', score: 36, scoreColor: 'text-red-500', received: '4/6/2026', receivedBy: 'Serena Julius', modified: '4/6/2026', modifiedBy: 'Serena Julius', flagged: true },
  { id: 'SUB0406RP54', assignee: 'Serena Julius', status: 'Renewal Approved', statusColor: 'text-green-700', alerts: 1, channel: 'Manual', docs: 6, customer: '82 Elm Realty', lob: 'Commercial Auto', score: 80, scoreColor: 'text-green-700', received: '4/6/2026', receivedBy: 'Serena Julius', modified: '4/6/2026', modifiedBy: 'Serena Julius' },
  { id: 'SUB04034SSO', assignee: '', status: 'Marked For Renewal', statusColor: 'text-purple-700', alerts: 1, channel: 'Manual', docs: 6, customer: 'Sculptor Bank', lob: 'Management Liability', score: 5, scoreColor: 'text-red-500', received: '4/3/2026', receivedBy: 'admin user', modified: '4/3/2026', modifiedBy: 'admin user' },
  { id: 'SUB0403WSGD', assignee: 'Rithanyhaa Eswaramoorthi', status: 'Ready', statusColor: 'text-gray-900', alerts: 1, channel: 'Manual', docs: 3, customer: 'Terminus Technologies', lob: 'Commercial Package', score: 50, scoreColor: 'text-orange-500', received: '4/3/2026', receivedBy: 'Rithanyhaa Eswaramoorthi', modified: '4/3/2026', modifiedBy: 'Rithanyhaa Eswaramoorthi' },
  { id: 'SUB0403UXSN', assignee: 'ISU Sample Assignment Group', status: 'Ready', statusColor: 'text-gray-900', alerts: 3, channel: 'Manual', docs: 3, customer: 'Universal Exports', lob: 'Commercial Package', score: 61, scoreColor: 'text-orange-500', received: '4/3/2026', receivedBy: 'Rithanyhaa Eswaramoorthi', modified: '4/3/2026', modifiedBy: 'Rithanyhaa Eswaramoorthi' },
  { id: 'SUB0403CT20', assignee: '', status: 'In Review', statusColor: 'text-gray-900', alerts: 2, channel: 'Manual', docs: 3, customer: '', lob: 'Management Liability', score: 5, scoreColor: 'text-red-500', received: '4/3/2026', receivedBy: 'Rithanyhaa Eswaramoorthi', modified: '4/3/2026', modifiedBy: 'Rithanyhaa Eswaramoorthi' },
  { id: 'SUB04019PPQ', assignee: '', status: 'Ready', statusColor: 'text-gray-900', alerts: 3, channel: 'Manual', docs: 1, customer: 'Terminus Technologies', lob: 'Commercial Package', score: 27, scoreColor: 'text-red-500', received: '4/1/2026', receivedBy: 'Serena Julius', modified: '4/3/2026', modifiedBy: 'Rithanyhaa Eswaramoorthi' },
]

export default function SubmissionList() {
  const [, setLocation] = useLocation()

  return (
    <div className="min-h-screen bg-white">
      {/* Top Nav */}
      <div className="bg-gray-900 text-white px-6 py-2 flex items-center gap-6 text-sm">
        <span className="font-bold text-lg tracking-wide mr-4">appian</span>
        <span className="text-gray-500 cursor-pointer hover:text-white" onClick={() => setLocation('/')}>MY WORKBENCH</span>
        <span className="text-white border-b-2 border-yellow-500 pb-1 cursor-pointer">SUBMISSIONS</span>
        <span className="text-gray-500 cursor-pointer hover:text-white">PARTIES</span>
        <span className="text-gray-500 cursor-pointer hover:text-white">MESSAGES</span>
        <span className="text-gray-500 cursor-pointer hover:text-white">REPORTS</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-gray-200 text-xs">Connected Underwriting</span>
          <span className="bg-gray-700 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">DN</span>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <HeadingField text="ALL SUBMISSIONS" size="LARGE" marginBelow="NONE" />
          <ButtonWidget label="+ NEW SUBMISSION" style="OUTLINE" color="SECONDARY" onClick={() => setLocation('/create-submission')} />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-4 border border-gray-200 rounded-sm p-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-sm px-3 py-1.5">
            <span className="text-gray-500 text-xs">🔍</span>
            <input type="text" placeholder="Search Submissions" className="text-sm outline-none bg-transparent w-40" />
          </div>
          <button className="bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-sm border border-blue-500">SEARCH</button>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>STATUS</span>
            <select className="border border-gray-200 rounded-sm px-2 py-1 text-sm bg-white"><option>Any</option><option>Ready</option><option>In Review</option><option>Marked For Renewal</option></select>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>ASSIGNEE</span>
            <select className="border border-gray-200 rounded-sm px-2 py-1 text-sm bg-white min-w-[120px]"><option>Any</option></select>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 ml-auto">
            <span>LINE OF BUSINESS</span>
            <select className="border border-gray-200 rounded-sm px-2 py-1 text-sm bg-white"><option>Any</option><option>Commercial Property</option><option>Commercial Auto</option><option>Management Liability</option></select>
          </div>
        </div>

        {/* Grid */}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Submission</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">↓ Status</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Channel ⓘ</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Customer</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Line of Business</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Score ⓘ</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Received</th>
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => setLocation('/submission-summary')}>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1">
                    {s.flagged && <span className="text-red-500 text-xs">🚩</span>}
                    <span className="text-blue-500 font-semibold text-xs">{s.id}</span>
                  </div>
                  <div className="text-xs text-gray-500">{s.assignee || ''}</div>
                  {s.alerts > 0 && <div className="text-xs text-red-500">⚠ {s.alerts} Alert{s.alerts > 1 ? 's' : ''}</div>}
                </td>
                <td className="py-3 px-3"><span className={`text-xs font-semibold ${s.statusColor}`}>{s.status}</span></td>
                <td className="py-3 px-3"><div className="text-xs">{s.channel}</div><div className="text-xs text-blue-500">📎 {s.docs} Document{s.docs > 1 ? 's' : ''}</div></td>
                <td className="py-3 px-3 text-xs text-blue-500 font-medium">{s.customer}</td>
                <td className="py-3 px-3 text-xs">{s.lob}</td>
                <td className="py-3 px-3"><span className={`text-xs font-bold ${s.scoreColor}`}>{s.score}%</span></td>
                <td className="py-3 px-3"><div className="text-xs">{s.received}</div><div className="text-xs text-gray-500">{s.receivedBy}</div></td>
                <td className="py-3 px-3"><div className="text-xs">{s.modified}</div><div className="text-xs text-gray-500">{s.modifiedBy}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
