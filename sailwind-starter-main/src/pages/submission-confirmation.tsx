import { HeadingField, CardLayout, ButtonArrayLayout, RichTextDisplayField, TextItem, StampField } from '@pglevy/sailwind'
import { useLocation } from 'wouter'

export default function SubmissionConfirmation() {
  const [, setLocation] = useLocation()

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

      <div className="max-w-xl mx-auto text-center py-16 px-8">
        <StampField icon="check" backgroundColor="POSITIVE" size="LARGE" />
        <HeadingField text="Submission Created Successfully" size="LARGE" align="CENTER" marginAbove="STANDARD" />
        <RichTextDisplayField value={[<TextItem key="id" text="SUB-2026-0043" color="ACCENT" size="LARGE" />]} align="CENTER" />
        <RichTextDisplayField value={[<TextItem key="msg" text="Your submission has been created and assigned to the underwriting team based on your configured assignment rules. Tasks have been generated from the applicable task blocks." color="SECONDARY" size="STANDARD" />]} align="CENTER" marginBelow="MORE" />

        <CardLayout padding="STANDARD" showBorder={true}>
          <div className="text-left space-y-2">
            {[['Category', 'New Business'], ['Type', 'Commercial Property'], ['Assigned To', 'Sarah Chen (Property Team)'], ['Tasks Generated', '5 tasks from Intake Processing block']].map(([label, val], i) => (
              <div key={i} className="flex py-1 border-b border-gray-100 last:border-b-0">
                <span className="text-xs text-gray-500 w-40">{label}</span>
                <span className="text-xs text-gray-900">{val}</span>
              </div>
            ))}
          </div>
        </CardLayout>

        <div className="mt-6">
          <ButtonArrayLayout
            buttons={[
              { label: 'Back to Submissions', style: 'OUTLINE', color: 'SECONDARY', onClick: () => setLocation('/submission-list') },
              { label: 'View Submission', style: 'SOLID', color: 'ACCENT', onClick: () => setLocation('/submission-summary') },
            ]}
            align="CENTER"
          />
        </div>
      </div>
    </div>
  )
}
