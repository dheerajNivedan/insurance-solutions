# Connected Underwriting — Comprehensive UX Screen Analysis

**Application:** Connected Underwriting v1.71.0 (Appian Platform 26.01)  
**Total Objects:** 2,658 across all bundles  
**Analysis Date:** March 2026  
**Source:** Appian Atlas structural analysis via MCP

---

## 1. Information Architecture Overview

Connected Underwriting is organized as a dual-site architecture:

### Primary Site: Connected Underwriting
**URL:** `/connected-underwriting`  
**Objects:** 556 | **Pages:** 5

| Page | URL Stub | Purpose |
|------|----------|---------|
| My Workbench (Home) | `/home` | Dashboard landing page with metrics, submissions, tasks, alerts, exceptions |
| Submissions | `/submissions` | Full submissions list with filtering and tabbed views |
| Parties | `/parties` | Customers, Brokers, and Broker Offices management |
| Messages | `/messages` | Inbox/Outbox messaging with threaded conversations |
| Reports | `/reports` | On-demand reports, trend analytics, workload metrics, Power BI portfolio |

### Admin Site: Connected Underwriting Settings
**URL:** `/connected-underwriting-settings`  
**Objects:** 176 | **Pages:** 1 (single page with side navigation)

Settings sections: Scoring Tables, Scoring Rules, Alert Configurations, User Security (Role Groups + Assignment Groups), Surveys/Questionnaires, Email Templates

---

## 2. Screen-by-Screen Analysis

### 2.1 My Workbench (Home/Landing Page)

**Interface:** `ISU_workbenchSitePage` → Header content layout for the landing page  
**Key Components:**

- **Workbench Metrics** (`ISU_workbenchMetrics`): KPI cards showing newly received submissions, older submissions, average cycle time, overdue tasks. Uses `ISU_displayCardLayoutReportMetrics` for metric card rendering.
- **Submissions List** (`ISU_workbenchSubmissionsList`): Dedicated submissions grid for the workbench tab with tabbed filtering (New Business, Renewals, Last Modified).
- **Tasks List** (`ISU_tasksList`): Open tasks grid with due dates, overdue indicators, and task type icons.
- **Alerts List** (`ISU_alertsList`): Open alerts with bell icons and alert count badges.
- **Exception Queue** (`ISU_workbenchExceptionsList`): Three exception types displayed via tabs:
  - Classification Exceptions (`ISU_classificationExceptionList`)
  - Extraction Reconciliation Exceptions (`ISU_extractionReconciliationExceptionsList`)
  - Message Exceptions (`ISU_messageExceptionsList`)

**Workload Metrics (Manager View):**
- Group Workload chart (Top 5) — `ISU_workloadMetricsGroupWorkloadChart`
- Submission Assignment pie chart (User vs Group) — `ISU_workloadMetricsSubmissionAssignmentPieChart`
- Volume by LOB In-flight pie chart — `ISU_workloadMetricsVolumeByLobPieChart`
- In Progress vs Overdue Tasks chart (Top 10) — `ISU_workloadMetricsInProgressAndOverDueTaskChart`

**UX Observations:**
- High information density — metrics, submissions, tasks, alerts, and exceptions all on one page
- Tab-based navigation (`ISU_cardTabs`) used to segment content within sections
- Relative time display ("3 hours ago", "Yesterday") via `ISU_CO_UT_returnUserTimeDifferenceDisplay` improves scannability
- Manager-specific workload metrics section provides role-based content differentiation
- Warning banner component (`ISU_CO_DSP_warningBanner`) available for system alerts
- Page layout uses `ISU_siteTabPageLayout` wrapper with `ISU_siteTabPageHeader` for consistent header treatment

---

### 2.2 Submissions List Page

**Interface:** `ISU_submissionsSitePage`  
**Core Grid:** `ISU_submissionsList` (reusable — appears in Workbench, Customer record, and Submissions page)

**Grid Columns:**
| Column | Details |
|--------|---------|
| ID | Submission ID with link, Assignee name below, Alert count with bell icon |
| Customer | Customer name as record link |
| Type | New Business / Renewal |
| Line of Business | Auto, Property, Management Liability |
| Score | Priority score with color-coded tachometer icon and tooltip |
| Channel | Submission channel with document count and attachment indicator |
| Status | Processing, Ready, In Review, Hold, Review Complete, Missing Critical Info |
| Received | Date received |
| Last Modified | Relative time display |
| Sanctions Flag | Icon indicator when sanctions results exist |

**Grid Features:**
- 14 configurable parameters controlling column visibility (showLastModified, showCustomerName, showStatus, showScore, showAlertCount, showAssignee, showSubmissionType, showSanctionResultsExists)
- User filters support for faceted search
- Custom page size (default 25 via `ISU_CO_INT_QUERY_BATCH_SIZE_MEDIUM`)
- Configurable link behavior (same tab vs new tab) for submission and customer links
- Priority score color coding via branding configuration (`ISU_returnColorBasedOnPriorityScore`)
- Tabbed views: New Business, Renewals, Last Modified (`ISU_CONF_submissionsTabs`)

**UX Observations:**
- The grid is highly parameterized, enabling reuse across 3+ contexts with different column configurations
- Priority score visualization (color + icon + tooltip) provides quick risk assessment
- Sanctions flag as a visual indicator is a good pattern for compliance-critical information
- Channel column shows both the channel type and document count — efficient information density
- Alert count under the submission ID is a smart use of vertical space

---

### 2.3 Submission Record (Detail View)

**Bundle:** `ISU_Record_Submission` — 719 objects, 20 record actions, 7 detail views + list view

**Record Views (Tabs):**

| # | View | Key Interface |
|---|------|---------------|
| 1 | Summary | `ISU_submissionRecordViewSummary` |
| 2 | Risk Details | `ISU_submissionRecordViewRiskDetails` |
| 3 | Documents | `ISU_submissionRecordViewDocuments` |
| 4 | Financial Performance | `ISU_Submission_RecordView_FinancialPerformance` |
| 5 | Messages | `ISU_MSG_submissionRecordViewMessages` |
| 6 | Sanctions Results | `ISU_submissionRecordViewSanctions` |
| 7 | History | `ISU_submissionRecordViewEventHistory` |

**Record Actions (20 total):**
- Submission lifecycle: New Submission, Edit Submission Details, Update Status, Submit Decision, Reassign Submission
- Customer/Broker: Edit Customer Information, Edit Broker and Broker Office Info
- Risk: Edit Property Risk Info, Edit Auto Risk Info, Edit Risk Exposure, Edit Submission Coverages
- Documents: Upload Documents
- Financial: Add Financials, Edit Financials
- Communication: Compose New Message, Add Note, Edit Watchers
- Tasks: Create Task
- Compliance: Re-Execute Sanctions Check, Update Critical Information

#### 2.3.1 Summary View
**Interface:** `ISU_submissionRecordViewSummary`

Composed of multiple card sections:
- **General Information** (`ISU_submissionRecordGeneralInformation`): Submission type, channel, proposed dates, line of business, status, assignee
- **Customer Information** (`ISU_submissionRecordCustomerInformation`): Customer name/address, NAICS codes, employee count, organization type
- **Broker & Office Information** (`ISU_submissionRecordBrokerAndOfficeInformation`): Broker details, office name, contact info
- **Risk Information** (`ISU_submissionRecordRiskInformation`): LOB-specific risk summaries
- **Priority Score** (`ISU_priorityScoreSummary`): Gauge visualization with scoring breakdown
- **Notes** (`ISU_notesList` / `ISU_displayNoteInfo`): Submission notes with user attribution
- **Tasks** (`ISU_submissionTasksList`): Open/overdue task grid
- **Alerts** (`ISU_alertsList`): Open alerts with banner alerts (`ISU_bannerAlertsList`)
- **Surveys** (`ISU_ViewSubmissionSurveys`): Completed questionnaire responses

**Missing Data Handling:**
- `ISU_cardLayoutForMissingSectionMessage` displays contextual messages when data is missing
- `ISU_richTextItemMissingFieldMessage` highlights individual missing fields
- `ISU_fieldsToCheckForMissingData*` rules check for completeness across customer, broker, address, and general info
- Processing state image (`ISU_DOC_IMAGE_PROCESSING`) shown when submission is still being processed
- Missing Critical Info image (`ISU_DOC_IMAGE_MISSING_CRITICAL_INFO`) for incomplete submissions

#### 2.3.2 Risk Details View
**Interface:** `ISU_submissionRecordViewRiskDetails`

Side navigation pattern (`ISU_sideNavBar`) with LOB-specific sections:
- **Property**: Premise information (`ISU_lobSummaryProperty`), Property subjects list (`ISU_propertySubjectsList`) with construction type, year built, roof age, TIV, valuation
- **Auto**: Auto risk details (`ISU_autoRiskDetails`), Vehicle list (`ISU_autoVehiclesList`) with VIN, year/make/model, body type, garaging address; Driver list (`ISU_autoDriversList`) with DOB, license info, marital status
- **Management Liability**: Risk exposure section (`ISU_managementLiabilityRiskDetails`) with D&O, EPL coverage details
- **Loss History**: Loss runs (`ISU_lossHistoryList`) with claim numbers, dates, loss types, paid amounts; Summary card (`ISU_lossHistorySummary`) with total incurred
- **Coverages**: Coverage details grid (`ISU_QR_getCoverages`) with limits, deductibles, coinsurance

#### 2.3.3 Documents View
**Interface:** `ISU_submissionRecordViewDocuments`

- Document grid with name, type, file type, status (Auto Extracting, Completed, Extraction Not Supported)
- Document detail viewer (`ISU_viewDocumentDetails`) with PDF viewer component (`ISU_CO_CP_documentViewerField`)
- Metadata card (`ISU_viewDocumentDetails_metadataCard`) alongside document preview
- Back navigation link (`ISU_CO_DSP_backLink`) to return to document list
- Reconciliation support for extraction exceptions

#### 2.3.4 Financial Performance View
**Interface:** `ISU_Submission_RecordView_FinancialPerformance`

- **AI Summary** (`ISU_financialPerformance_Sub_AiSummary`): AI-generated financial analysis with sparkle icon branding
- **Key Metrics** (`ISU_FinancialPerfomanceKeyMetricCard`): KPI cards for key financial indicators with empty state handling
- **Financial Overview** (`ISU_FinancialPerformance_Sub_Overview`): Tabbed view across three statement types:
  - Income Statement (`ISU_financialPerformance_incomeStatementList`): Revenue, COGS, gross profit, SG&A, EBIT, net income
  - Balance Sheet (`ISU_financialPerformance_balanceSheetList`): Assets, liabilities, equity, retained earnings
  - Cash Flow Statement (`ISU_financialPerformance_cashFlowStatementList`): Operating, investing, financing activities
- Currency formatting with configurable precision (`ISU_CO_UT_formatCurrencyValue`, default USD)
- Total change calculations (`ISU_returnTotalChangeForGivenMetric`) with millions formatting

#### 2.3.5 Messages View
**Interface:** `ISU_MSG_submissionRecordViewMessages`

Record-level messaging with threaded conversations:
- Conversation list (`ISU_MSG_COL_recordLevelConversations`) with thread cards
- Message display (`ISU_MSG_COL_messagesDisplayForSelectedConversation`) with sender initials, full name, recipients, timestamps
- Attachment support (`ISU_MSG_COL_attachmentsForSingleMessage`) with card-based display (3-column layout)
- Hidden/collapsed messages (`ISU_MSG_COL_hiddenMessages`) for long threads
- Empty state handling (`ISU_MSG_CRD_messagingInboxEmptyState`)

#### 2.3.6 Sanctions Results View
**Interface:** `ISU_submissionRecordViewSanctions`

- Sanctions check history (`ISU_sanctionsCheckHistory`)
- Tabbed results: Matches vs Does Not Match (`ISU_sanctionsResultListTabs`)
- Results grid (`ISU_sanctionsCheckResultList`) with: Name (linked to OFAC), Alias, Source List (CAP, CMIC, FSE, MBS, PLC, SDI, SDN), Search Score with tooltip, Last Pulled date, Pulled By user
- Empty state with success message and image when no results found
- Re-execute sanctions check action available

#### 2.3.7 History View
**Interface:** `ISU_submissionRecordViewEventHistory`

- Submission Event Audit History grid
- Event type, event details, user, and timestamp columns

---

### 2.4 Parties Page

**Interface:** `ISU_partiesSitePage`

Three tabbed lists:
- **Customers** (`ISU_partiesPageCustomersList` / `ISU_CustomersList`): Customer name/address, contact info
- **Brokers** (`ISU_partiesPageBrokersList`): Broker name, email, office associations
- **Broker Offices** (`ISU_partiesPageBrokerOfficesList`): Office name, address, phone, broker count

---

### 2.5 Customer Record

**Bundle:** `ISU_Record_Customer` — 122 objects, 2 actions, 3 views

**Views:**
1. **Summary** (`ISU_customerRecordViewSummary`):
   - General Information card (`ISU_customerRecordGeneralInformation`): Name/address, SIC code, NAICS codes, employee count, incorporation year, organization type, phone
   - Contact Information card (`ISU_customerRecordContactInformation`): Point of contact name, email, phone
   - Brokers list (`ISU_brokersListByCustomer`): Associated brokers with custom paging (page size 5)
   - Submissions list (reused `ISU_submissionsList`): Filtered to customer's submissions

2. **Sanctions Results** (`ISU_customerRecordViewSanctionsResult`):
   - Visibility controlled by `ISU_recordTabVisibilityCustomerSanctionsResults` — only visible to Internal Users group when sanctions data exists
   - Reuses sanctions result components from submission record

3. **List View**: Standard record list

**Actions:** New Customer, Edit Customer Information

**UX Observations:**
- Label-value side-by-side layout (`ISU_displayLabelValuesSideBySide`) with branding-aware styling
- Phone number formatting (`ISU_CO_UT_formatPhoneNumber`) for consistent display
- Role-based tab visibility for sanctions results — good security pattern

---

### 2.6 Broker Record

**Bundle:** `ISU_Record_Broker` — 130 objects, 2 actions, 2 views

**Views:**
1. **Summary** (`ISU_BrokerRecordViewSummary`):
   - Broker Information card (`ISU_brokerInformation`): Name, email, contact details
   - Broker Office Information card (`ISU_brokerOfficeInformation`): Office name, address (street, city, state, zip), phone
   - Submissions list (reused `ISU_submissionsList`)

2. **List View**: Standard record list

**Actions:** New Broker, Edit Broker
- Broker/Office picker components (`ISU_CO_CP_pickerFieldBroker`, `ISU_CO_CP_pickerFieldBrokerOffice`) for search-by-name-or-address
- Duplicate validation on broker email and office name
- State/Province dropdown (`ISU_stateProvinceField`) and zip code field with validation

---

### 2.7 Messages Site Page

**Interface:** `ISU_MSG_messagesSitePage` / `ISU_messagesSitePage`

Two-panel layout:
- **Left Panel** (`ISU_MSG_COL_userLevelConversations`):
  - Inbox/Sent tab navigation (`ISU_MSG_CRD_cardsAsSideNavigationForInboxAndSentTabs`)
  - Search/filter for conversations
  - Thread cards (`ISU_MSG_CRD_userLevelSingleConversationCard`) with subject (trimmed to 40 chars), sender initials, sent date, read/unread indicators
  - Bulk actions: Select All/Deselect All, Mark as Read/Unread
  - Custom paging for thread list (batch size 50)

- **Right Panel** (`ISU_MSG_COL_messagesDisplayForSelectedConversation`):
  - Thread subject and associated record link
  - Message list with sender avatar (initials), full name, recipients, timestamp
  - Expandable/collapsible message bodies
  - Attachment cards in 3-column grid layout
  - Rich text editor with table support (`ISU_MSG_INP_richTextFieldWithTablePlugin`, max 100K chars)
  - Hidden messages indicator for long threads

**UX Observations:**
- Familiar email-client pattern (list + detail split view)
- Accessibility: checkbox states announced ("Select message checkbox checked/unchecked for {threadSubject}")
- Thread collapse with count indicator ("{numberOfMessages} additional messages in thread collapsed")
- Record association links provide context for submission-related messages

---

### 2.8 Reports Page

**Interface:** `ISU_reportsSitePage`

Four report sections via tabs:

1. **On Demand Reports** (`ISU_onDemandReports`):
   - Filters (`ISU_onDemandReportFilters`): Date range (default 365 days), Line of Business, Report Type, Broker Office, Customer State
   - Metrics cards (`ISU_onDemandMetrics`): Configurable KPIs based on report type (Accept/Decline/New Business/Renewal)
   - Drilldown grid (`ISU_reportsDrillDownDynamic`) with breadcrumb navigation (`ISU_reportBreadCrumbsGeneric`)
   - Submissions list for drill-through (`ISU_reportsSubmissionsList`)

2. **Trends** (`ISU_trendReports`):
   - Filters (`ISU_trendFilters`): Date range, LOB
   - Average Cycle Time metrics (`ISU_trendMetricAverageCycleTime`): Submission Received to Accept/Decline with last 10 submissions context
   - Charts:
     - Submission Decision pie chart (`ISU_trendsSubmissionDecisionPieChart`)
     - Declined Submission Reasons pie chart (`ISU_trendsSubmissionDecisionReasonPieChart`)
     - Submission by Broker Office bar chart (`ISU_trendsSubmissionByBrokerOfficeChart`) with drill-down grid
     - Volume by Customer State grid (`ISU_trendsSubmissionByCustomerStateCountGrid`)
     - Submission Creation by Type line chart (`ISU_trendsSubmissionsBySubmissionTypeLineChart`)
     - Volume by LOB pie chart (`ISU_trendsVolumeByLineOfBusinessPieChart`)
     - LOB by Customer chart (`ISU_trendsSubmissionLobByCustomerChart`)

3. **Workload Metrics** (`ISU_workloadMetricsReports`):
   - Group Workload (Top 5) chart and grid
   - In Progress vs Overdue Tasks (Top 10) chart and grid
   - Submission Assignment pie chart
   - Volume by LOB In-flight pie chart
   - Drill-down dynamic interface (`ISU_workloadMetricsDrillDownDynamic`)

4. **Portfolio View** (`ISU_powerBiPortfolioReports`):
   - Embedded Power BI report via connected system (`ISU_CS_POWER_BI`)
   - Configured with Group ID and Report ID constants

---

### 2.9 Settings Site

**Interface:** `ISU_configurationSitePage`  
**Navigation:** Side navigation bar (`ISU_sideNavBar`) with selectable pages

**Sections:**

| Section | Key Interface | Description |
|---------|---------------|-------------|
| Scoring Tables | `ISU_scoringTableList` | Grid of scoring tables by LOB with active/inactive toggle |
| Scoring Rules | `ISU_priorityScoreList` | Priority score configuration with 15 scoring field codes (broker state, email, office, construction type/year, customer state/employee count, loss history, primary/excess, roof age, rush, channel, customer, timing, TIV) |
| Alert Configurations | `ISU_alertConfigsList` | Alert name, description, active status management |
| User Security | `ISU_userSecurityWrapper` | Two sub-sections: Role Groups (`ISU_groupsListRoleGroups`) and Assignment Groups (`ISU_groupsListAssignmentGroups`) with member management (`ISU_addMembersToGroups`, `ISU_viewGroupDetails`) |
| Surveys | `ISU_STF_SitePage_Surveys` | Survey configuration with question management, LOB mapping, activation status |
| Questions | `ISU_STF_SitePage_Questions` | Question bank with 6 types: Short Text, Long Text, Number-Integer, Date/Time, Single Dropdown, Multiple Choice |
| Email Templates | `ISU_MSG_HCL_PUBLIC_messageTemplatesSettings` | Message template management (batch size 30) |

---

## 3. Reusable Component Patterns

### 3.1 Card Layout System
**`ISU_displayCardLayout`** — The primary content container used across all screens.

Parameters: contents, header, showMissingWarning, recordActionField, headerAdditionalRichText, height, showShadow, padding, headerWidth, accessibilityText, marginBelow, headerTooltip, showBorder, cardShape, cardStyle

Calls `ISU_richTextDisplayHeader` for consistent header rendering with optional tooltips, action buttons, and additional rich text.

### 3.2 Submissions Grid
**`ISU_submissionsList`** — Used in 3+ contexts (Workbench, Submissions page, Customer record, Broker record) with 14 configurable visibility parameters.

### 3.3 Paging Component
**`ISU_CO_DSP_customPaging_forListViews`** — Custom pagination with First/Previous/Next/Last page navigation, used across all list views.

### 3.4 Side Navigation
**`ISU_sideNavBar`** — Selectable sub-page navigation used in Risk Details view and Settings site.

### 3.5 Tab Component
**`ISU_cardTabs`** — Reusable tab toggle component used in Workbench, Submissions, Reports, Sanctions Results, and Settings.

---

## 4. Internationalization (i18n)

The application uses Appian Translation Strings extensively:
- **200+ translation strings** identified across all bundles
- All user-facing labels use translation references (e.g., `AS.ISU.AllBundles.lbl_Customer`)
- Parameterized strings for dynamic content (e.g., `"{numberOfHours} Hours Ago"`, `"{status} Submissions for {user}"`)
- Locale-aware formatting: `ISU_CO_UT_isUserLocaleEnglishUs` checks locale for date/time formatting
- Full i18n readiness for multi-language deployment

---

## 5. Accessibility Considerations

**Positive patterns identified:**
- `accessibilityText` parameter on `ISU_displayCardLayout` for screen reader support
- Checkbox state announcements in messaging: "Select message checkbox checked/unchecked for {threadSubject}"
- Thread state indicators: "Read Thread" / "Unread Thread", "Expanded" / "Collapsed"
- Tooltip text on interactive elements (priority score, sanctions score, submission channel)
- Navigation state announcements: "Collapse Navigation" / "Expand Navigation"

**Areas for review:**
- Color-coded priority scores should ensure sufficient contrast ratios
- Chart-heavy reports pages (7+ chart types in Trends) need alternative text or data table equivalents
- Embedded Power BI reports may have their own accessibility considerations
- Icon-only indicators (sanctions flag, alert bell) should have text alternatives

---

## 6. Data Density & Performance Considerations

| Screen | Data Sources | Estimated Query Load |
|--------|-------------|---------------------|
| Workbench | Submissions, Tasks, Alerts, Exceptions, Metrics aggregations | High — 6+ concurrent queries |
| Submission Summary | Submission, Customer, Broker, Office, Notes, Tasks, Alerts, Surveys, Priority Score | Very High — 10+ queries |
| Risk Details | Property premises/subjects, Auto vehicles/drivers, Loss runs, Coverages | High — LOB-dependent |
| Financial Performance | Financials, AI Summary, Income/Balance/Cash Flow statements | Medium-High |
| Reports - Trends | 7 aggregation queries for charts + filter queries | High |
| Messages | Threads, Messages, Recipients, Attachments | Medium — paginated |

**Batch size strategy:**
- Extra Small: 10 (compact grids)
- Small: 5-15 (embedded lists like brokers-by-customer)
- Medium: 25 (standard grids)
- Large: 50 (message threads)
- Max: 1,000-5,000 (background queries)

---

## 7. User Role Differentiation

| Role Group | Capabilities |
|------------|-------------|
| Underwriters | Full submission management, decision authority |
| Underwriter Assistants | Support tasks, document management |
| Managers | Workload metrics visibility, team oversight |
| Administrators | Settings site access, scoring table management |
| Internal Users | Sanctions results visibility on customer records |

---

## 8. Key UX Strengths

1. **Consistent component library**: Card layouts, headers, paging, tabs, and side navigation are standardized across all screens
2. **Configurable grid reuse**: The submissions grid adapts to 3+ contexts through parameter-driven visibility
3. **Progressive disclosure**: Side navigation in Risk Details, collapsible messages, expandable text fields
4. **Role-based content**: Manager workload metrics, admin settings, internal-only sanctions views
5. **AI integration**: Financial performance AI summaries with branded sparkle icon
6. **Compliance-first design**: Sanctions checking with OFAC source links, audit history, re-execution capability
7. **Multi-channel support**: Email, document, and portal submission channels with document count indicators
8. **Branding system**: Centralized branding configuration file for colors, styles, and theming

---

## 9. UX Improvement Opportunities

1. **Workbench cognitive load**: Consider progressive disclosure or customizable dashboard widgets to reduce initial information density
2. **Chart accessibility**: Add data table alternatives for all chart visualizations in Reports
3. **Search**: No global search capability identified — consider adding cross-entity search
4. **Mobile responsiveness**: Column-heavy grids (submissions list has 10+ columns) may need responsive breakpoint strategies
5. **Empty states**: Good coverage on messages and sanctions — extend consistent empty state patterns to all grid views
6. **Notification preferences**: Alert configurations exist in settings but user-level notification preferences are not evident
7. **Bulk operations**: Limited to messaging (select all/mark read) — consider bulk status updates or reassignment for submissions
8. **Document preview**: PDF viewer exists but non-PDF preview messaging could be more actionable
9. **Financial data entry**: Consider inline editing for financial statements rather than separate add/edit actions
10. **Onboarding**: No guided tour or contextual help system identified for new users
