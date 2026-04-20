import { HeadingField, CardLayout, TagField, ButtonWidget, TextItem, ButtonArrayLayout } from '@pglevy/sailwind'
import { Link } from 'wouter'

export default function FinancialPerformance() {
  const balanceSheetData = [
    { item: 'Cash', latest: '$1,933,800.00', prior: '$144,735.00', change: '1236%', changeColor: 'POSITIVE' },
    { item: 'Accounts Receivable', latest: '-', prior: '-', change: '-', changeColor: 'STANDARD' },
    { item: 'Inventories', latest: '-', prior: '-', change: '-', changeColor: 'STANDARD' },
    { item: 'Total Current Assets', latest: '-', prior: '-', change: '-', changeColor: 'STANDARD' },
    { item: 'Goodwill', latest: '-', prior: '-', change: '-', changeColor: 'STANDARD' },
    { item: 'Total Assets', latest: '$10,000,000.00', prior: '$10,000,000.00', change: '0%', changeColor: 'STANDARD' },
    { item: 'Current Portion of Long Term Debt', latest: '-', prior: '-', change: '-', changeColor: 'STANDARD' },
    { item: 'Total Current Liabilities', latest: '$6,632,301.00', prior: '$7,843,516.00', change: '-15%', changeColor: 'NEGATIVE' },
    { item: 'Long Term Debt', latest: '$2,280,550.00', prior: '$3,397,618.00', change: '-33%', changeColor: 'NEGATIVE' },
    { item: 'Total Liabilities', latest: '$8,912,851.00', prior: '$10,000,000.00', change: '-11%', changeColor: 'NEGATIVE' },
    { item: 'Retained Earnings', latest: '-', prior: '-', change: '-', changeColor: 'STANDARD' },
    { item: 'Equity', latest: '$1,087,149.00', prior: '$0.00', change: '-', changeColor: 'STANDARD' },
  ]

  const incomeData = [
    { item: 'Total Revenue', latest: '$10,000,000.00', prior: '$10,000,000.00', change: '0%', changeColor: 'STANDARD' },
  ]

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Top Navigation Bar */}
      <CardLayout padding="STANDARD" showShadow={true} marginBelow="STANDARD">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <TagField tags={[{ text: "AT", backgroundColor: "NEGATIVE" }]} size="SMALL" />
            <ButtonArrayLayout
              buttons={[
                { label: "MY WORKBENCH", style: "LINK", color: "STANDARD" },
                { label: "SUBMISSIONS", style: "LINK", color: "ACCENT" },
                { label: "PARTIES", style: "LINK", color: "STANDARD" },
                { label: "MESSAGES", style: "LINK", color: "STANDARD" },
                { label: "REPORTS", style: "LINK", color: "STANDARD" }
              ]}
              align="START"
            />
          </div>
          <div className="flex items-center gap-4">
            <TextItem text="Connected Underwriting" size="SMALL" />
            <TagField tags={[{ text: "ML", backgroundColor: "SECONDARY" }]} size="SMALL" />
            <TextItem text="appian" size="SMALL" />
          </div>
        </div>
      </CardLayout>

      <div className="container mx-auto px-8 py-8">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Home</Link>
        
        {/* Company Header */}
        <HeadingField 
          text="SUB1014MZ5Y | Bag Makers Inc" 
          size="LARGE" 
          marginBelow="MORE" 
        />
        
        {/* Tab Navigation */}
        <CardLayout padding="STANDARD" showShadow={false} marginBelow="MORE">
          <div className="flex gap-2">
            <TagField tags={[{ text: "Summary", backgroundColor: "STANDARD" }]} size="STANDARD" />
            <TagField tags={[{ text: "Risk Details", backgroundColor: "NEGATIVE" }]} size="STANDARD" />
            <TagField tags={[{ text: "Quote", backgroundColor: "STANDARD" }]} size="STANDARD" />
            <TagField tags={[{ text: "Submission Docs", backgroundColor: "STANDARD" }]} size="STANDARD" />
            <TagField tags={[{ text: "History", backgroundColor: "STANDARD" }]} size="STANDARD" />
            <TagField tags={[{ text: "Messages", backgroundColor: "STANDARD" }]} size="STANDARD" />
            <TagField tags={[{ text: "Related Actions", backgroundColor: "STANDARD" }]} size="STANDARD" />
          </div>
        </CardLayout>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <CardLayout padding="MORE" showShadow={true}>
              <HeadingField text="pHD" size="MEDIUM" marginBelow="MORE" />
              <div className="space-y-3">
                <TextItem text="Loss History" size="SMALL" color="SECONDARY" />
                <CardLayout padding="STANDARD" showShadow={false}>
                  <TextItem text="Financial Performance" size="SMALL" style="STRONG" color="STANDARD" />
                </CardLayout>
                <TextItem text="Risk Exposure" size="SMALL" color="SECONDARY" />
                <TextItem text="Underwriting Questions" size="SMALL" color="SECONDARY" />
              </div>
            </CardLayout>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <CardLayout padding="MORE" showShadow={true}>
              {/* Header with Button */}
              <div className="flex justify-between items-center mb-6">
                <HeadingField text="Financial Performance" size="MEDIUM" />
                <ButtonWidget label="EDIT FINANCIALS" style="OUTLINE" color="ACCENT" size="SMALL" />
              </div>

              {/* Balance Sheet Section */}
              <CardLayout padding="MORE" showShadow={false} marginBelow="MORE">
                <HeadingField text="Balance Sheet" size="MEDIUM" marginBelow="MORE" />
                
                {/* Table Header */}
                <CardLayout padding="MORE" showShadow={false} marginBelow="STANDARD">
                  <div className="grid grid-cols-4 gap-4">
                    <TextItem text="" size="SMALL" style="STRONG" />
                    <TextItem text="Latest Fiscal Year (2023)" size="SMALL" style="STRONG" />
                    <TextItem text="Prior Fiscal Year (2022)" size="SMALL" style="STRONG" />
                    <TextItem text="% Change" size="SMALL" style="STRONG" />
                  </div>
                </CardLayout>
                
                {/* Data Rows */}
                {balanceSheetData.map((row, index) => (
                  <CardLayout key={index} padding="MORE" showShadow={false} marginBelow="STANDARD">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <TextItem text={row.item} size="SMALL" />
                      <TextItem text={row.latest} size="SMALL" />
                      <TextItem text={row.prior} size="SMALL" />
                      <TagField 
                        tags={[{ text: row.change, backgroundColor: row.changeColor }]} 
                        size="SMALL" 
                        marginBelow="NONE"
                      />
                    </div>
                  </CardLayout>
                ))}
              </CardLayout>

              {/* Income/Cashflow Statement Section */}
              <CardLayout padding="MORE" showShadow={false} marginBelow="MORE">
                <HeadingField text="Income/Cashflow Statement" size="MEDIUM" marginBelow="MORE" />
                
                {/* Table Header */}
                <CardLayout padding="MORE" showShadow={false} marginBelow="STANDARD">
                  <div className="grid grid-cols-4 gap-4">
                    <TextItem text="" size="SMALL" style="STRONG" />
                    <TextItem text="Latest Fiscal Year (2023)" size="SMALL" style="STRONG" />
                    <TextItem text="Prior Fiscal Year (2022)" size="SMALL" style="STRONG" />
                    <TextItem text="% Change" size="SMALL" style="STRONG" />
                  </div>
                </CardLayout>
                
                {/* Data Rows */}
                {incomeData.map((row, index) => (
                  <CardLayout key={index} padding="MORE" showShadow={false} marginBelow="STANDARD">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <TextItem text={row.item} size="SMALL" />
                      <TextItem text={row.latest} size="SMALL" />
                      <TextItem text={row.prior} size="SMALL" />
                      <TagField 
                        tags={[{ text: row.change, backgroundColor: row.changeColor }]} 
                        size="SMALL" 
                        marginBelow="NONE"
                      />
                    </div>
                  </CardLayout>
                ))}
              </CardLayout>

              {/* Item Count */}
              <div className="text-right">
                <TextItem text="12 items" size="SMALL" color="SECONDARY" />
              </div>
            </CardLayout>
          </div>
        </div>
      </div>
    </div>
  )
}
