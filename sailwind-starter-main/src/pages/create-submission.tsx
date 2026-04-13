import { useState } from 'react'
import { HeadingField, CardLayout, ButtonWidget, ButtonArrayLayout, TextField, DropdownField, MilestoneField, RichTextDisplayField, TextItem, TagField, MessageBanner } from '@pglevy/sailwind'
import { useLocation } from 'wouter'

const typesByCategory: Record<string, string[]> = {
  'New Business': ['Commercial Property', 'Commercial Auto', 'D&O', 'General Liability'],
  'Renewals': ['Property Renewal', 'Auto Renewal', 'GL Renewal'],
  'Endorsements': ['Coverage Change', 'Named Insured Change'],
  'Quotes Only': ['Indication Request', 'Budgetary Quote'],
}
const categories = Object.keys(typesByCategory)
const lobs = ['Commercial Property', 'Commercial Auto', 'Management Liability', 'General Liability', 'Workers\' Compensation']
const priorities = ['Low', 'Medium', 'High', 'Rush']
const channels = ['Email Intake', 'Broker Portal', 'API', 'Manual Upload']
const states = ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania']

export default function CreateSubmission() {
  const [, setLocation] = useLocation()
  const [step, setStep] = useState(0)
  const [category, setCategory] = useState('')
  const [subType, setSubType] = useState('')
  const [lob, setLob] = useState('')
  const [name, setName] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [effDate, setEffDate] = useState('')
  const [tiv, setTiv] = useState('')
  const [state, setState] = useState('')
  const [custName, setCustName] = useState('Terminus Technologies')
  const [broker, setBroker] = useState('Marsh McLennan')

  const stepLabels = ['Category & Type', 'General Info', 'Customer & Broker', 'Documents', 'Review & Submit']
  const types = category ? typesByCategory[category] || [] : []

  return (
    <div className="min-h-screen bg-white">
      {/* Top Nav */}
      <div className="bg-gray-900 text-white px-6 py-2 flex items-center gap-6 text-sm">
        <span className="font-bold text-lg tracking-wide mr-4">appian</span>
        <span className="text-gray-500 cursor-pointer hover:text-white" onClick={() => setLocation('/')}>MY WORKBENCH</span>
        <span className="text-gray-500 cursor-pointer hover:text-white" onClick={() => setLocation('/submission-list')}>SUBMISSIONS</span>
        <span className="text-gray-500 cursor-pointer hover:text-white">PARTIES</span>
        <span className="text-gray-500 cursor-pointer hover:text-white">MESSAGES</span>
        <span className="text-gray-500 cursor-pointer hover:text-white">REPORTS</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-gray-200 text-xs">Connected Underwriting</span>
          <span className="bg-gray-700 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">DN</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-2">
          <HeadingField text="Create Submission" size="LARGE" marginBelow="NONE" />
          <ButtonWidget label="Cancel" style="OUTLINE" color="SECONDARY" onClick={() => setLocation('/submission-list')} />
        </div>
        <RichTextDisplayField value={[<TextItem key="req" text="Mandatory fields are marked with an asterisk (*)." color="SECONDARY" size="SMALL" />]} marginBelow="STANDARD" />

        <MilestoneField steps={stepLabels} />

        {/* STEP 1 */}
        {step === 0 && (
          <div className="space-y-6 mt-6">
            <CardLayout padding="MORE" showBorder={true}>
              <HeadingField text="Submission Category & Type" size="MEDIUM" marginBelow="STANDARD" />
              <div className="grid grid-cols-2 gap-4">
                <DropdownField label="Submission Category *" placeholder="Select Category" choiceLabels={categories} choiceValues={categories} value={category} onChange={(v) => { setCategory(v); setSubType('') }} />
                <DropdownField label="Submission Type *" placeholder={category ? 'Select Type' : 'Select a Category first'} choiceLabels={types} choiceValues={types} value={subType} onChange={setSubType} />
              </div>
            </CardLayout>
            <CardLayout padding="MORE" showBorder={true}>
              <HeadingField text="Line of Business" size="MEDIUM" marginBelow="STANDARD" />
              <div className="grid grid-cols-2 gap-4">
                <DropdownField label="Primary Line of Business *" placeholder="Select LOB" choiceLabels={lobs} choiceValues={lobs} value={lob} onChange={setLob} />
                <DropdownField label="Product" placeholder="Select Product (optional)" choiceLabels={['Personal Auto Standard', 'Commercial Auto Fleet']} choiceValues={['Personal Auto Standard', 'Commercial Auto Fleet']} value="" onChange={() => {}} />
              </div>
            </CardLayout>
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <div className="space-y-6 mt-6">
            <CardLayout padding="MORE" showBorder={true}>
              <HeadingField text="General Information" size="MEDIUM" marginBelow="STANDARD" />
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Submission Name *" placeholder="e.g. Terminus Technologies - Commercial Property" value={name} onChange={setName} />
                <DropdownField label="Priority" choiceLabels={priorities} choiceValues={priorities} value={priority} onChange={setPriority} />
                <TextField label="Effective Date *" placeholder="MM/DD/YYYY" value={effDate} onChange={setEffDate} />
                <TextField label="Expiration Date" placeholder="MM/DD/YYYY" />
                <TextField label="Total Insured Value" placeholder="$0.00" value={tiv} onChange={setTiv} />
                <DropdownField label="Channel" choiceLabels={channels} choiceValues={channels} value="Email Intake" onChange={() => {}} />
              </div>
            </CardLayout>
            <CardLayout padding="MORE" showBorder={true}>
              <HeadingField text="Risk Location" size="MEDIUM" marginBelow="STANDARD" />
              <div className="grid grid-cols-3 gap-4">
                <DropdownField label="State / Province *" placeholder="Select State" choiceLabels={states} choiceValues={states} value={state} onChange={setState} />
                <TextField label="City" placeholder="" />
                <TextField label="ZIP Code" placeholder="" />
              </div>
            </CardLayout>
          </div>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <div className="space-y-6 mt-6">
            <CardLayout padding="MORE" showBorder={true}>
              <HeadingField text="Customer Information" size="MEDIUM" marginBelow="STANDARD" />
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Customer Name *" value={custName} onChange={setCustName} />
                <TextField label="NAICS Code" value="236220" />
                <TextField label="Contact Name" value="Sandra Singh" />
                <TextField label="Contact Email" value="sandra@example.com" />
                <TextField label="Phone" value="(548) 667-3451" />
                <TextField label="Address" value="1025 South 6th Street, Springfield, NC 62703" />
              </div>
            </CardLayout>
            <CardLayout padding="MORE" showBorder={true}>
              <HeadingField text="Broker Information" size="MEDIUM" marginBelow="STANDARD" />
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Broker Name *" value={broker} onChange={setBroker} />
                <TextField label="Broker Office" value="New York Office" />
                <TextField label="Broker Contact" value="Emily Davis" />
                <TextField label="Broker Email" value="emily@example.com" />
              </div>
            </CardLayout>
          </div>
        )}

        {/* STEP 4 */}
        {step === 3 && (
          <div className="mt-6">
            <CardLayout padding="MORE" showBorder={true}>
              <HeadingField text="Upload Documents" size="MEDIUM" marginBelow="STANDARD" />
              <RichTextDisplayField value={[<TextItem key="d" text="Upload ACORD forms, loss runs, supplemental applications, and other supporting documents." color="SECONDARY" size="SMALL" />]} marginBelow="STANDARD" />
              <div className="border-2 border-dashed border-gray-200 rounded-sm p-10 text-center mb-4 cursor-pointer hover:border-blue-500 transition-colors">
                <div className="text-gray-200 text-3xl mb-2">📁</div>
                <div className="text-gray-500 text-sm">Drag & drop files here or <span className="text-blue-500 font-semibold">browse</span></div>
              </div>
              <div className="space-y-2">
                {['ACORD_125_Application.pdf', 'Loss_Run_Report_2025.xlsx'].map((doc, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-sm">
                    <span className="text-blue-500">📄</span>
                    <div className="flex-1 text-sm">{doc}<div className="text-xs text-gray-500">Uploaded just now</div></div>
                    <TagField tags={[{ text: 'Uploaded', backgroundColor: 'POSITIVE' }]} size="SMALL" marginBelow="NONE" />
                  </div>
                ))}
              </div>
            </CardLayout>
          </div>
        )}

        {/* STEP 5 */}
        {step === 4 && (
          <div className="space-y-4 mt-6">
            <MessageBanner primaryText="Please review all details before submitting." backgroundColor="INFO" highlightColor="INFO" icon="info" />
            {[
              { title: 'Category & Type', rows: [['Category', category], ['Submission Type', subType], ['Line of Business', lob]] },
              { title: 'General Information', rows: [['Submission Name', name], ['Priority', priority], ['Effective Date', effDate], ['TIV', tiv], ['State', state]] },
              { title: 'Customer & Broker', rows: [['Customer', custName], ['Broker', broker]] },
            ].map((section, si) => (
              <CardLayout key={si} padding="MORE" showBorder={true}>
                <HeadingField text={section.title} size="MEDIUM" marginBelow="STANDARD" />
                {section.rows.map(([label, val], ri) => (
                  <div key={ri} className="flex py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm text-gray-500 w-48">{label}</span>
                    <span className="text-sm text-gray-900">{val || '—'}</span>
                  </div>
                ))}
              </CardLayout>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
          <div>{step > 0 && <ButtonWidget label="Back" style="OUTLINE" color="SECONDARY" onClick={() => setStep(step - 1)} />}</div>
          <ButtonArrayLayout
            buttons={[
              { label: step === 4 ? 'Create' : 'Next', style: 'SOLID', color: 'ACCENT', onClick: () => step === 4 ? setLocation('/submission-confirmation') : setStep(step + 1) },
            ]}
            align="END"
          />
        </div>
      </div>
    </div>
  )
}
