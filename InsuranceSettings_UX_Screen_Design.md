# Insurance Settings — UX Screen Design

**Application:** Connected Underwriting — Insurance Settings  
**Pattern Reference:** Case Management Studio Control Panel  
**Design Date:** March 12, 2026  
**Visibility:** Open (all authenticated users)

---

## Layout Pattern

The Insurance Settings screen follows the Case Management Studio Control Panel pattern:

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Insurance Settings                                            [User ▾] │
├────────────────────┬─────────────────────────────────────────────────────┤
│                    │                                                     │
│  LEFT PANEL        │  RIGHT PANEL                                        │
│  (Navigation)      │  (Content Area with Sub-Tab Navigation)             │
│                    │                                                     │
│  ┌──────────────┐  │  ┌─────────┬──────┬────────────┬──────────┐        │
│  │ Submissions  │◄─┼──│Overview │ Data │ Interfaces │ Workflow │        │
│  ├──────────────┤  │  └─────────┴──────┴────────────┴──────────┘        │
│  │ Underwriting │  │  ┌─────────────────────────────────────────┐        │
│  ├──────────────┤  │  │                                         │        │
│  │ Claims       │  │  │  Tab Content Area                       │        │
│  ├──────────────┤  │  │                                         │        │
│  │ Policies     │  │  │                                         │        │
│  ├──────────────┤  │  │                                         │        │
│  │ Email        │  │  │                                         │        │
│  │ Templates    │  │  │                                         │        │
│  ├──────────────┤  │  │                                         │        │
│  │ User         │  │  │                                         │        │
│  │ Security     │  │  │                                         │        │
│  ├──────────────┤  │  │                                         │        │
│  │ Alerts &     │  │  │                                         │        │
│  │ Notifications│  │  │                                         │        │
│  ├──────────────┤  │  └─────────────────────────────────────────┘        │
│  │ Integrations │  │                                                     │
│  └──────────────┘  │                                                     │
│                    │                                                     │
└────────────────────┴─────────────────────────────────────────────────────┘
```

---

## Left Panel — Navigation Items

| # | Nav Item | Icon | Description |
|---|----------|------|-------------|
| 1 | Submissions | 📋 | Submission intake, channels, classification, and processing settings |
| 2 | Underwriting | 📊 | Scoring tables, scoring rules, risk thresholds, and decision criteria |
| 3 | Claims | 📁 | Claim types, SLA timers, assignment rules, and resolution workflows |
| 4 | Policies | 📄 | Policy types, coverage templates, limits, deductibles, and renewal rules |
| 5 | Email Templates | ✉️ | Message templates for automated and manual communications |
| 6 | User Security | 🔒 | Role groups, assignment groups, and member management |
| 7 | Alerts & Notifications | 🔔 | Alert configurations, notification rules, and escalation triggers |
| 8 | Integrations | 🔗 | External data providers, sanctions services, and API configurations |

---

## Right Panel — Section Details with Sub-Tab Navigation

---

### 1. Submissions

Sub-tabs: **Overview** | **Channels** | **Classification** | **Processing Rules**

#### Overview Tab
Summary cards displaying current submission configuration:

```
┌─────────────────────────────────────────────────────────────────────┐
│  Overview  │  Channels  │  Classification  │  Processing Rules      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │ Active Channels  │  │ Avg Processing   │  │ Classification   │     │
│  │       4          │  │    2.3 days      │  │  Rules: 12       │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘     │
│                                                                     │
│  Recent Configuration Changes                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Date        │ Change                    │ Changed By        │   │
│  │ Mar 10      │ Added Portal channel      │ J. Smith          │   │
│  │ Mar 8       │ Updated email parsing rule │ A. Johnson        │   │
│  │ Mar 5       │ New LOB classification     │ M. Williams       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### Channels Tab
Configure how submissions enter the system.

| Field | Type | Description |
|-------|------|-------------|
| Channel Name | Text | Display name (e.g., Email, Portal, API, Broker Upload) |
| Channel Type | Dropdown | Email / Web Portal / API / Manual Upload |
| Active | Toggle | Enable or disable the channel |
| Auto-Extract | Toggle | Automatically extract data from submitted documents |
| Default LOB | Dropdown | Default line of business assignment |
| Default Priority | Dropdown | Low / Medium / High / Rush |

Grid displays all configured channels with inline edit and +Add Channel button.

#### Classification Tab
Rules that auto-classify incoming submissions by line of business.

| Field | Type | Description |
|-------|------|-------------|
| Rule Name | Text | Descriptive name for the classification rule |
| Condition Field | Dropdown | Field to evaluate (NAICS code, SIC code, Document keywords, Broker) |
| Operator | Dropdown | Equals / Contains / Starts With / In List |
| Value | Text/Multi | Match value(s) |
| Assign LOB | Dropdown | Auto / Property / Management Liability / General Liability / Workers Comp |
| Priority | Integer | Rule execution order (lower = first) |
| Active | Toggle | Enable or disable |

#### Processing Rules Tab
Configure submission processing behavior.

| Field | Type | Description |
|-------|------|-------------|
| Auto-Assignment | Toggle + Config | Automatically assign submissions to underwriters based on LOB, workload, or round-robin |
| SLA Timer | Number + Unit | Days/hours before a submission is flagged overdue |
| Business Days Only | Toggle | SLA counts business days only |
| Missing Info Grace Period | Number + Unit | Time allowed before marking "Missing Critical Info" |
| Duplicate Detection | Toggle + Config | Check for duplicate submissions by customer + LOB + date range |
| Sanctions Auto-Check | Toggle | Automatically run sanctions screening on new submissions |

---

### 2. Underwriting

Sub-tabs: **Overview** | **Scoring Tables** | **Scoring Rules** | **Decision Criteria**

#### Overview Tab
Summary of underwriting configuration with metric cards:
- Active Scoring Tables count (by LOB)
- Scoring Rules count (15 field codes available)
- Auto-Approve threshold and hit rate
- Average priority score distribution chart

#### Scoring Tables Tab
Grid of scoring tables grouped by Line of Business.

| Column | Description |
|--------|-------------|
| Table Name | Descriptive name |
| Line of Business | Auto / Property / Management Liability / General Liability |
| Scoring Fields | Number of active scoring fields in this table |
| Status | Active / Inactive toggle |
| Last Modified | Date and user |

Actions: +New Scoring Table, Edit, Clone, Deactivate

Drill-in to a scoring table shows the field-level configuration:

| Scoring Field Code | Weight | Min Score | Max Score | Conditions |
|--------------------|--------|-----------|-----------|------------|
| Broker State | 10 | 0 | 100 | State-based lookup |
| Construction Type | 15 | 0 | 100 | Type mapping |
| Roof Age | 10 | 0 | 100 | Age ranges |
| TIV | 20 | 0 | 100 | Value brackets |
| Loss History | 15 | 0 | 100 | Claims count + severity |
| Customer Employee Count | 5 | 0 | 100 | Size brackets |
| Channel | 5 | 0 | 100 | Channel type mapping |
| Rush Indicator | 10 | 0 | 100 | Boolean flag |
| Timing | 10 | 0 | 100 | Days to effective date |

#### Scoring Rules Tab
Configure how individual scoring fields are evaluated.

| Field | Type | Description |
|-------|------|-------------|
| Field Code | Dropdown | One of 15 available codes (broker state, email, office, construction type/year, customer state/employee count, loss history, primary/excess, roof age, rush, channel, customer, timing, TIV) |
| Condition | Config | Field-specific condition builder |
| Score Value | Number | Points assigned when condition is met |
| Active | Toggle | Enable or disable |

Visual score preview: tachometer-style gauge showing how a sample submission would score.

#### Decision Criteria Tab
Configure auto-decision thresholds and referral rules.

| Field | Type | Description |
|-------|------|-------------|
| Auto-Approve Threshold | Number | Score above which submissions auto-approve |
| Auto-Decline Threshold | Number | Score below which submissions auto-decline |
| Referral Range | Range | Score range requiring manual review |
| Referral Reason Codes | Multi-select | Reasons that force manual referral regardless of score |
| Authority Limits by Role | Grid | Max coverage limits each role can approve |
| Peer Review Threshold | Number | Coverage amount above which peer review is required |

---

### 3. Claims

Sub-tabs: **Overview** | **Claim Types** | **Assignment Rules** | **SLA Configuration**

#### Overview Tab
Summary cards:
- Active Claim Types count
- Open Claims by status (pie chart)
- Average resolution time
- SLA compliance rate (% within target)

#### Claim Types Tab
Define the types of claims the system handles.

| Column | Description |
|--------|-------------|
| Claim Type Name | e.g., Property Damage, Bodily Injury, Liability, Workers Comp |
| Line of Business | Associated LOB |
| Default Priority | Low / Medium / High / Critical |
| Default SLA | Resolution target in days |
| Requires Investigation | Toggle |
| Active | Toggle |

Actions: +New Claim Type, Edit, Deactivate

#### Assignment Rules Tab
Configure how claims are routed to adjusters.

| Field | Type | Description |
|-------|------|-------------|
| Rule Name | Text | Descriptive name |
| Trigger | Dropdown | On Creation / On Status Change / On Escalation |
| Condition | Builder | LOB, claim amount, priority, customer tier |
| Assign To | Dropdown | Specific user / Group / Round-robin / Least loaded |
| Escalation Timer | Number + Unit | Time before auto-escalation if unassigned |
| Active | Toggle | Enable or disable |

#### SLA Configuration Tab
Define service level agreements per claim type.

| Field | Type | Description |
|-------|------|-------------|
| Claim Type | Dropdown | Linked claim type |
| Acknowledgment SLA | Number + Unit | Time to first response |
| Investigation SLA | Number + Unit | Time to complete investigation |
| Resolution SLA | Number + Unit | Time to final resolution |
| Business Days Only | Toggle | Count only business days |
| Escalation Action | Dropdown | Notify Manager / Reassign / Flag Overdue |
| Warning Threshold | Percentage | % of SLA elapsed before warning (e.g., 75%) |

---

### 4. Policies

Sub-tabs: **Overview** | **Policy Types** | **Coverage Templates** | **Renewal Rules**

#### Overview Tab
Summary cards:
- Active Policy Types count
- Coverage Templates count
- Upcoming Renewals (next 30/60/90 days)
- Policy distribution by LOB (bar chart)

#### Policy Types Tab
Define available policy types.

| Column | Description |
|--------|-------------|
| Policy Type Name | e.g., Commercial Property, Commercial Auto, D&O, EPL, General Liability |
| Line of Business | Associated LOB |
| Default Term | 6 months / 12 months / Custom |
| Requires Underwriting | Toggle |
| Auto-Renewal Eligible | Toggle |
| Active | Toggle |

Actions: +New Policy Type, Edit, Clone, Deactivate

#### Coverage Templates Tab
Pre-configured coverage packages that can be applied to policies.

| Field | Type | Description |
|-------|------|-------------|
| Template Name | Text | e.g., "Standard Property Package", "Premium Auto Bundle" |
| Policy Type | Dropdown | Associated policy type |
| Coverages | Grid | List of included coverages with default limits and deductibles |

Coverage detail grid within each template:

| Coverage Name | Default Limit | Default Deductible | Coinsurance % | Required | Editable |
|---------------|---------------|--------------------|--------------:|----------|----------|
| Building | $1,000,000 | $5,000 | 80% | Yes | Yes |
| Contents | $500,000 | $2,500 | 80% | Yes | Yes |
| Business Income | $250,000 | 72 hours | — | No | Yes |
| Flood | $500,000 | $10,000 | — | No | Yes |
| Earthquake | $500,000 | 5% of TIV | — | No | Yes |

#### Renewal Rules Tab
Configure automatic renewal behavior.

| Field | Type | Description |
|-------|------|-------------|
| Policy Type | Dropdown | Which policy type this rule applies to |
| Auto-Renew | Toggle | Automatically generate renewal submissions |
| Lead Time | Number | Days before expiration to trigger renewal |
| Rate Change Cap | Percentage | Maximum automatic rate increase allowed |
| Requires Re-Underwriting | Condition | Conditions that force manual re-underwriting (e.g., claims count > 2, loss ratio > 60%) |
| Notification Template | Dropdown | Email template for renewal notice |
| Broker Notification | Toggle | Notify broker of upcoming renewal |

---

### 5. Email Templates

Sub-tabs: **Overview** | **Templates** | **Merge Fields**

#### Overview Tab
Summary cards:
- Total Templates count
- Templates by category (Submission, Claim, Policy, Renewal, General)
- Recently modified templates list

#### Templates Tab
Grid of all email templates with search and filter.

| Column | Description |
|--------|-------------|
| Template Name | Descriptive name |
| Category | Submission / Claim / Policy / Renewal / General |
| Subject Line | Email subject with merge field indicators |
| Last Modified | Date and user |
| Active | Toggle |

Actions: +New Template, Edit, Clone, Delete, Preview

Template editor (on drill-in):
- Rich text editor with formatting toolbar
- Merge field picker (insert dynamic values like {{CustomerName}}, {{SubmissionID}}, {{PolicyNumber}})
- Attachment management (add/remove file attachments)
- Preview pane showing rendered template with sample data
- Test Send button (sends to current user)

#### Merge Fields Tab
Reference list of all available merge fields grouped by context.

| Context | Available Fields |
|---------|-----------------|
| Submission | SubmissionID, CustomerName, BrokerName, LOB, Status, ReceivedDate, AssigneeName |
| Policy | PolicyNumber, PolicyType, EffectiveDate, ExpirationDate, Premium, CoverageList |
| Claim | ClaimNumber, ClaimType, DateOfLoss, ClaimantName, AdjusterName, Status |
| Customer | CustomerName, Address, Phone, Email, NAICS, SIC, EmployeeCount |
| General | CurrentDate, CompanyName, SenderName, SenderEmail, SenderPhone |

---

### 6. User Security

Sub-tabs: **Overview** | **Role Groups** | **Assignment Groups** | **Members**

#### Overview Tab
Summary cards:
- Total Users count
- Role Groups count
- Assignment Groups count
- Users by role distribution (bar chart)

#### Role Groups Tab
Define what users can do.

| Column | Description |
|--------|-------------|
| Group Name | e.g., Underwriters, Underwriter Assistants, Managers, Administrators |
| Description | What this role can access |
| Member Count | Number of users in this group |
| Permissions | Summary of key permissions |

Actions: +New Role Group, Edit, View Members

Drill-in shows permission matrix:

| Permission | Underwriters | UW Assistants | Managers | Admins |
|------------|:---:|:---:|:---:|:---:|
| View Submissions | ✓ | ✓ | ✓ | ✓ |
| Edit Submissions | ✓ | ✓ | ✓ | ✓ |
| Submit Decisions | ✓ | — | ✓ | ✓ |
| View Sanctions | ✓ | — | ✓ | ✓ |
| Manage Settings | — | — | — | ✓ |
| View Workload Metrics | — | — | ✓ | ✓ |
| Manage Users | — | — | — | ✓ |

#### Assignment Groups Tab
Define how work is distributed.

| Column | Description |
|--------|-------------|
| Group Name | e.g., Property Team, Auto Team, Management Liability Team, Triage |
| LOB | Associated line of business |
| Member Count | Number of users |
| Assignment Method | Round-robin / Least loaded / Manual |
| Active | Toggle |

Actions: +New Assignment Group, Edit, Manage Members

#### Members Tab
Searchable user directory with group membership.

| Column | Description |
|--------|-------------|
| User Name | Full name with link to profile |
| Email | User email |
| Role Groups | Badges showing role memberships |
| Assignment Groups | Badges showing assignment memberships |
| Last Active | Last login date |
| Status | Active / Inactive |

Actions: +Add Member, Edit Membership, Deactivate

---

### 7. Alerts & Notifications

Sub-tabs: **Overview** | **Alert Rules** | **Escalation Rules** | **Notification Preferences**

#### Overview Tab
Summary cards:
- Active Alert Rules count
- Alerts triggered (last 7 days)
- Escalation Rules count
- Top triggered alerts (bar chart)

#### Alert Rules Tab
Configure conditions that generate alerts.

| Field | Type | Description |
|-------|------|-------------|
| Alert Name | Text | e.g., "High TIV Submission", "Overdue Task", "Sanctions Match Found" |
| Description | Text | What this alert monitors |
| Trigger Event | Dropdown | New Submission / Status Change / SLA Breach / Score Threshold / Sanctions Match |
| Condition | Builder | Field-based condition with AND/OR logic |
| Severity | Dropdown | Info / Warning / Critical |
| Notify | Multi-select | Assignee / Manager / Group / Specific Users |
| Channel | Multi-select | In-App / Email / Both |
| Active | Toggle | Enable or disable |

Actions: +New Alert Rule, Edit, Clone, Deactivate

#### Escalation Rules Tab
Configure automatic escalation when conditions persist.

| Field | Type | Description |
|-------|------|-------------|
| Rule Name | Text | Descriptive name |
| Trigger | Dropdown | SLA Warning / SLA Breach / Unassigned Duration / No Activity |
| Time Threshold | Number + Unit | Duration before escalation fires |
| Escalate To | Dropdown | Direct Manager / Group Lead / Specific User / Next Level |
| Action | Multi-select | Reassign / Notify / Flag / Change Priority |
| Repeat | Toggle + Interval | Re-escalate if still unresolved |
| Active | Toggle | Enable or disable |

#### Notification Preferences Tab
System-wide default notification settings.

| Notification Event | In-App | Email | Default |
|--------------------|:---:|:---:|---------|
| New Submission Assigned | ✓ | ✓ | Both |
| Task Due Soon (24h) | ✓ | ✓ | Both |
| Task Overdue | ✓ | ✓ | Both |
| SLA Warning | ✓ | — | In-App |
| SLA Breach | ✓ | ✓ | Both |
| Sanctions Match | ✓ | ✓ | Both |
| Decision Required | ✓ | ✓ | Both |
| Submission Status Change | ✓ | — | In-App |
| New Message Received | ✓ | ✓ | Both |
| Renewal Upcoming | ✓ | ✓ | Both |

---

### 8. Integrations

Sub-tabs: **Overview** | **Data Providers** | **Sanctions Services** | **API Configuration**

#### Overview Tab
Summary cards showing connection health:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Data Providers   │  │ Sanctions        │  │ APIs             │
│   3 Connected    │  │   OFAC ✓ Active  │  │   2 Active       │
│   1 Error        │  │   Last: 2h ago   │  │   0 Errors       │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

Recent integration activity log (last 50 events).

#### Data Providers Tab
External data sources for enrichment.

| Column | Description |
|--------|-------------|
| Provider Name | e.g., D&B, LexisNexis, ISO, NAICS Lookup |
| Type | Financial Data / Risk Data / Customer Data / Reference Data |
| Connection Status | Connected / Error / Disabled |
| Last Sync | Timestamp of last successful data pull |
| Auto-Fetch | Toggle — automatically pull data on new submissions |
| Timeout | Seconds before request times out |

Actions: +Add Provider, Edit, Test Connection, View Logs

#### Sanctions Services Tab
Configure sanctions and compliance screening.

| Field | Type | Description |
|-------|------|-------------|
| Service | Text | e.g., OFAC SDN, EU Sanctions, UK HMT |
| Source Lists | Multi-select | CAP, CMIC, FSE, MBS, PLC, SDI, SDN |
| Auto-Screen | Toggle | Automatically screen new submissions |
| Screen On | Multi-select | Customer / Broker / Named Insureds / All Parties |
| Match Threshold | Number | Minimum score to flag as potential match (0-100) |
| Re-Screen Interval | Dropdown | Never / Daily / Weekly / Monthly |
| Active | Toggle | Enable or disable |

#### API Configuration Tab
Manage external API access to the system.

| Column | Description |
|--------|-------------|
| API Name | e.g., Submission Intake API, Lock Case API, Status Webhook |
| Endpoint | URL path |
| Method | GET / POST / PUT / DELETE |
| Authentication | API Key / OAuth / Certificate |
| Rate Limit | Requests per minute |
| Active | Toggle |

Actions: +New API, Edit, Regenerate Key, View Usage, Deactivate

---

## Interaction Patterns

### Left Panel Behavior
- Persistent left panel visible at all times (collapsible on mobile)
- Selected item highlighted with accent color and left border indicator
- Badge counts on nav items showing active configurations (e.g., "Submissions (4 channels)")
- Default selection: Submissions on first load

### Sub-Tab Navigation Behavior
- Horizontal tabs across the top of the right panel
- First tab (Overview) selected by default when switching left panel items
- Tab state preserved when navigating back to a previously visited section
- Active tab indicated with underline accent and bold text

### Grid Interactions
- Inline toggle for Active/Inactive status changes (no modal required)
- Click row to drill into detail/edit view
- +Add button positioned top-right of each grid
- Bulk actions via checkbox selection (Activate, Deactivate, Delete)
- Search bar above grids for filtering by name/keyword
- Custom paging with 25 items per page (consistent with Connected Underwriting pattern)

### Overview Tab Pattern (consistent across all sections)
Each Overview tab follows the same layout:
1. Row of 3-4 metric summary cards at the top
2. Optional chart or visualization below the cards
3. Recent changes / activity log at the bottom

### Empty States
When a section has no configured items:
- Centered illustration with contextual message
- e.g., "No scoring tables configured yet. Create your first scoring table to start prioritizing submissions."
- Primary action button: "+Create Scoring Table"

---

## Component Reuse from Connected Underwriting

| Insurance Settings Component | Reuses From |
|------------------------------|-------------|
| Card Layout | `ISU_displayCardLayout` — consistent card containers with headers |
| Side Navigation (Left Panel) | `ISU_sideNavBar` — selectable navigation with highlight state |
| Tab Navigation (Sub-tabs) | `ISU_cardTabs` — horizontal tab toggle component |
| Grid with Paging | `ISU_CO_DSP_customPaging_forListViews` — First/Prev/Next/Last |
| Metric Cards | `ISU_displayCardLayoutReportMetrics` — KPI card rendering |
| Toggle Fields | Standard Appian toggle component |
| Search/Filter Bar | User filter pattern from submissions grid |
| Empty States | `ISU_cardLayoutForMissingSectionMessage` — contextual empty messages |
| Rich Text Editor | `ISU_MSG_INP_richTextFieldWithTablePlugin` — for email templates |
| Condition Builder | Adapted from alert configurations pattern |

---

## Navigation Map

```
Insurance Settings
│
├── Submissions
│   ├── Overview .............. Metric cards + recent changes
│   ├── Channels .............. Channel grid (Email, Portal, API, Upload)
│   ├── Classification ........ LOB classification rules
│   └── Processing Rules ...... Auto-assignment, SLAs, duplicate detection
│
├── Underwriting
│   ├── Overview .............. Scoring summary + distribution chart
│   ├── Scoring Tables ........ Tables by LOB → drill into field config
│   ├── Scoring Rules ......... Field-level scoring conditions
│   └── Decision Criteria ..... Auto-approve/decline thresholds
│
├── Claims
│   ├── Overview .............. Claims summary + SLA compliance
│   ├── Claim Types ........... Type definitions with defaults
│   ├── Assignment Rules ...... Routing and auto-assignment
│   └── SLA Configuration ..... Per-type SLA targets and escalation
│
├── Policies
│   ├── Overview .............. Policy type + renewal summary
│   ├── Policy Types .......... Type definitions and terms
│   ├── Coverage Templates .... Pre-built coverage packages
│   └── Renewal Rules ......... Auto-renewal behavior and notifications
│
├── Email Templates
│   ├── Overview .............. Template inventory + recent edits
│   ├── Templates ............. Grid → drill into rich text editor
│   └── Merge Fields .......... Reference list by context
│
├── User Security
│   ├── Overview .............. User + group counts
│   ├── Role Groups ........... Permission definitions
│   ├── Assignment Groups ..... Work distribution groups
│   └── Members ............... User directory with memberships
│
├── Alerts & Notifications
│   ├── Overview .............. Alert activity summary
│   ├── Alert Rules ........... Condition-based alert triggers
│   ├── Escalation Rules ...... Time-based escalation config
│   └── Notificat