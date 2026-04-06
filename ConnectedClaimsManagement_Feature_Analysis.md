# Connected Claims Management — Feature & UX Analysis

**Application Version:** 1.2.1  
**Analysis Date:** March 23, 2026  
**Perspective:** Product Owner & User Experience  
**Source:** Appian Atlas Knowledge Base (`ConnectedClaimsManagementDemo`)

---

## Executive Summary

Connected Claims Management is a comprehensive insurance claims platform that enables organizations to manage the full claims lifecycle — from first notice of loss through investigation, settlement, payment, and closure. It provides a workspace for claims adjusters and managers to handle day-to-day claim operations, an email triage system for processing inbound claim communications, and a Claims Studio (admin control panel) for configuring claim types, workflows, tasks, products, and email templates.

The application supports multiple insurance lines of business including Automobile, Home Owners, Life, and Workers' Compensation, each with category-specific data models (vehicles, treatments, beneficiaries, injuries).

---

## 1. User Personas & Entry Points

### Claims Adjusters / Internal Users
- Access the **Workspace Site** (`ccm-workspace`)
- Primary activities: view assigned claims, work tasks, manage documents, track due dates, handle settlements and payments
- See claim grids, task lists, due date calendars, work-in-progress charts

### Claims Managers
- Access both Workspace and **Claims Studio** (`ccm-studio`)
- Primary activities: configure claim types, define workflows, manage reference tasks, set up automation rules
- Oversee team workload and claim assignments

### Email Triage Users
- Access the **Email Triage Site** (`triage`)
- Primary activities: review inbound emails, create claims from emails, link emails to existing claims, archive/delete threads
- Process email communications with attachment handling

### External Users (Portal)
- Limited portal access for claim creation via Web API
- External claim submission and document upload capabilities

---

## 2. Core Feature Areas

### 2.1 Claim Lifecycle Management

The central feature of the application. Users can:

- **Create Claims** — via intake forms, email triage, or external API; captures loss details, related parties, policy information, and category-specific data
- **View Claim Summary** — rich record view showing claim details, status, assigned roles, milestones, workflow progress, and financial summary
- **Edit Claim Details** — update loss details, manage properties, change status
- **Manage Loss Details** — capture and update loss-specific information per claim type
- **Determine Liability** — assess and record liability decisions with comments
- **Manage Related Parties** — add claimants, witnesses, attorneys, and other parties with contact details and role assignments
- **Manage Party Associations** — define relationships between related parties (e.g., parent/child, employer/employee)
- **Upload Documents** — attach supporting documents with type classification and AI-powered document summarization
- **View Event History** — full audit trail of all changes, comments, and actions on a claim
- **Link Related Claims** — connect claims that are related for cross-referencing
- **Manage Tags** — apply tags for categorization and filtering
- **Close/Reopen Claims** — close claims with reason codes; reopen if needed
- **Bulk Update Claims** — update multiple claim details simultaneously

**User Actions Available (from Claim record):**

| Action | Description |
|--------|-------------|
| Edit Claim Details | Update claim information and loss details |
| Manage Workflow | View and modify the claim's workflow |
| Add Comment | Post comments with document attachments |
| Upload Document | Attach files with AI summarization |
| Manage Related Parties | Add/edit claimants, witnesses, attorneys |
| Manage Party Associations | Define relationships between parties |
| Determine Liability | Assess and record liability |
| Manage Reserves | Set and adjust loss/expense/recovery reserves |
| Create Payment | Process claim payments |
| Manage Settlement | Handle settlement negotiations and offers |
| Manage Cost Estimates | Track estimated costs |
| Manage Injuries | Record injury details (category-specific) |
| Add Policy | Link policies to claims |
| Compose Email | Send emails from within the claim |
| Close Claim | Close with reason code |
| Reopen Claim | Reopen a closed claim |
| View Reserve Breakdown | View loss/expense/recovery reserve details |

### 2.2 Task Management

Tasks are the work items within a claim workflow:

- **Open / Work Tasks** — users open tasks to view details, add comments, and take action
- **Complete Tasks** — mark tasks as done, which triggers downstream automation and opens next tasks
- **Update Task Details** — rename tasks, update costs, modify assignments
- **Task Behavior Types** — tasks can be configured with specific behaviors:
  - **Manual** — assigned to users for manual completion
  - **Decision** — requires a decision/response selection
  - **Send Email** — automatically sends templated emails
  - **Automation** — system-executed tasks (AI triage agent, etc.)
  - **Set Reserves** — prompts reserve management on completion
  - **Make Payment** — prompts payment creation on completion
  - **Settlement** — prompts settlement management on completion
  - **Estimate Cost** — prompts cost estimation on completion
  - **Liability Assessment** — prompts liability determination on completion
  - **Survey** — triggers questionnaire completion
- **Task Visualization** — network chart showing task dependencies and workflow flow
- **Task Due Dates & SLAs** — configurable SLA timers with overdue tracking
- **Task Assignment** — assign to users or groups with assignment history

### 2.3 Financial Management

A comprehensive financial tracking system for claims:

#### Reserves
- **Standard Reserves** — set and manage loss reserves by cost category
- **Expense Reserves** — track operational expense reserves
- **Recovery Reserves** — manage expected recoveries (subrogation, salvage)
- **Reserve Breakdown Views** — detailed breakdown by category and type

#### Payments
- **Create Payments** — process claim payments with transaction details
- **Payment Scheduling** — configure payment frequency and schedule types
- **Transaction Management** — track payment transactions with status (completed, cancelled)
- **Transaction Cancellation** — cancel transactions with reason codes

#### Settlements
- **Manage Settlements** — handle settlement negotiations
- **Settlement Lines** — detailed line items per settlement
- **Compensation Types** — categorize settlement compensation
- **Settlement Offers** — track offer history

#### Recoveries
- **Recovery Tracking** — manage subrogation and salvage recoveries
- **Recovery Status** — initiated, partially recovered, completely recovered, unrecoverable, withdrawn
- **Recovery Transactions** — link recoveries to financial transactions

### 2.4 Workflow Engine

The workflow system drives claim processing:

- **Configurable Workflows per Claim Type** — each claim type has its own workflow definition
- **Milestone-Based Progression** — workflows organized into milestones representing major phases
- **Task Dependencies** — tasks have precedent/dependent relationships creating directed flow
- **Branching Logic** — tasks can have response options that determine workflow path
- **Workflow Visualization** — interactive network chart showing full workflow as visual diagram
- **Workflow Editing at Runtime** — adjusters can modify workflow on active claims
- **Workflow Path Tracking** — system tracks which path through the workflow each claim takes
- **Automated Task Execution** — system automatically processes automation tasks (email sends, AI triage)

### 2.5 Automation Rules Engine

A rule-based automation system:

- **Condition-Based Triggers** — rules fire when specific conditions are met
- **Condition Sets** — groups of conditions combined with AND/OR logic
- **Available Automated Actions:**
  - Send Email — automatically send templated emails
  - Workflow Routing — route to next workflow step
  - Assign/Reassign — assign claims or tasks
  - Create Claim — create related claims
- **Rule Visualization** — formatted display of rule logic
- **Nightly Validation** — background processes check rule integrity

### 2.6 Email Triage System

A dedicated email processing module:

- **Email Ingestion** — polls configured mailbox for incoming emails
- **Thread Management** — organizes emails into threads with message history
- **Email Triage Workflow:**
  - Open → In Progress → Created Claim / Linked to Claim / Archived / Deleted
- **Create Claim from Email** — extract claim data from email content (AI-assisted)
- **Link to Existing Claim** — associate email thread with an existing claim
- **Reply to Emails** — compose and send replies from within the triage interface
- **Attachment Handling** — process and store email attachments as claim documents
- **Archive/Delete/Restore** — manage email thread lifecycle

### 2.7 Customer & Policy Management

- **Customer Records** — manage customer information with addresses and contacts
- **Customer Policies** — link customers to products with coverage details
- **Policy Documents** — upload and manage policy documents with AI summarization
- **Coverage & Deductibles** — view policy coverage limits and deductible amounts
- **Policy Status Tracking** — active, expired, cancelled

### 2.8 AI-Powered Features

- **Claim Triage Agent** — AI agent that assists with claim triage decisions
- **Document Summarization** — AI-generated summaries for claim and policy documents
- **Coverage Verification** — AI-assisted coverage validation against policy terms
- **Comment Summarization** — AI-generated summaries of claim comment threads
- **Email Data Extraction** — AI-assisted extraction of claim data from emails

### 2.9 Comments & Collaboration

- **Add Comments** — post comments on claims and tasks
- **Comment with Attachments** — attach documents to comments
- **User Tagging** — tag other users in comments
- **Comment Tags** — categorize comments with tags
- **Comment History** — full thread of all comments

---

## 3. Admin / Claims Studio Configuration Features

The Claims Studio (`ccm-studio`) is the admin hub with the following navigation structure:

### 3.1 Claim Types (Main Page)

The primary configuration area:

- **View All Claim Types** — grid of configured claim types with category, status
- **Create/Edit Claim Types** — define claim type details, category, and associated workflows
- **Claim Type Categories:**
  - Automobile (First Party Property Damage, Third Party Liability, Property Damage & Liability, Generic)
  - Home Owners (Generic, Liability Injury Claim Workflow)
  - Life (Generic Life)
  - Workers' Compensation (Generic, Lost Time, Medical Only)
- **Workflow Configuration** — visual workflow builder per claim type using network chart
- **Intake Form Builder** — configure the claim creation form per type
- **Edit Form Builder** — configure the claim edit form per type
- **Automation Rules** — configure rules at the claim type and task level

### 3.2 Tasking Section

Sub-tabs: **Tasks** | **Task Blocks** | **Surveys** | **Questions**

#### Tasks Tab
- **Reference Tasks** — reusable task templates with configurable fields:
  - Name, Description, Assigned Group, SLA (days/hours/minutes with business day support)
  - Task Behavior Type (Manual, Decision, Send Email, Automation, etc.)
  - Response Options for decision tasks
  - Automation Rules per task
- **Recent Tasks** — cards showing recently created/updated tasks
- **All Tasks Grid** — searchable grid with columns: Name, Type, Assigned Group, Added, Last Updated
- **Create/Edit/Delete Tasks** — full CRUD operations

#### Task Blocks Tab
- **Task Blocks** — groups of related tasks that execute together as a unit
- **Task Block Visualization** — network chart showing task flow within the block (START → tasks → END)
- **Recent Task Blocks** — cards with task count badge and workflow preview
- **All Task Blocks Grid** — searchable grid with columns: Name, Task Count, Description, Last Updated
- **Configure Tasks within Blocks** — add tasks, set dependencies, configure branching
- **Create/Edit/Delete Task Blocks** — full CRUD operations

#### Surveys Tab
- **Survey Configuration** — create and manage questionnaires linked to tasks
- **Active Surveys** — view surveys currently in use
- **Question Mapping** — associate questions with surveys

#### Questions Tab (All Questions)
- **Question Bank** — manage reusable questions across surveys
- **Question Types:** Short Text, Long Text, Number-Integer, Multiple Choice, Single Select Dropdown, Date/Time
- **Create/Edit/Delete Questions** — full CRUD operations

### 3.3 Products Group Section

Sub-tabs: **Lines of Business** | **Products** | **Cost Categories**

#### Lines of Business Tab
- **LOB Configuration** — define available lines of business
- **LOB Grid** — searchable grid of all LOBs with status
- **Create/Edit LOBs** — full CRUD operations

#### Products Tab
- **Product Configuration** — define insurance products linked to LOBs
- **Product Details** — includes claim type mappings, coverages, deductibles
- **Product Summary View** — drill-in view showing full product configuration
- **Create/Edit Products** — full CRUD operations

#### Cost Categories Tab
- **Cost Category Configuration** — define cost categories for reserve management
- **Scope Options:** All LOBs or Specific LOBs
- **LOB Mapping** — associate cost categories with specific lines of business
- **Create/Edit Cost Categories** — full CRUD operations

### 3.4 Email Templates Section

- **Email Template Grid** — searchable grid of all templates
- **Create/Edit/Clone/Delete Templates** — full CRUD operations
- **Template Editor** — rich text editor with merge fields
- **Template Attachments** — manage file attachments per template
- **Info Banner** — contextual guidance for template configuration
- **Empty State** — guided onboarding when no templates exist

---

## 4. User Experience Analysis

### 4.1 Navigation & Information Architecture

**Workspace Site (4 pages):**
- Workspace Dashboard → My work, due dates calendar, work-in-progress chart, quick links
- Claims → Claim grid with search and filters
- Customers → Customer directory with contact details
- Policies → Policy grid with coverage information

**Claims Studio (5 top-level sections):**
- Claim Types → Workflow builder, intake/edit form configuration
- Tasking → Tasks, Task Blocks, Surveys, Questions (4 sub-tabs)
- Products Group → Lines of Business, Products, Cost Categories (3 sub-tabs)
- Email Templates → Template grid and editor

**Email Triage Site (1 page):**
- Triage → Email list pane + thread detail view (split-pane layout)

**Claim Record Views:**
- Summary → Claim details, milestones, workflow status, financial summary
- Tasks → Task grid with status, due dates, assignments
- Workflow → Visual workflow diagram
- Automation → Rules and automated actions
- Event History → Audit trail
- Related Claims, Documents, Emails, Comments

### 4.2 UX Strengths

- **Visual Workflow Builder** — network chart visualization makes complex workflows understandable
- **Category-Specific Data Models** — each insurance line has tailored data capture (vehicles for auto, beneficiaries for life, treatments for workers' comp)
- **AI Integration** — document summarization, coverage verification, claim triage agent, and email data extraction reduce manual effort
- **Email Triage** — dedicated email processing workflow with thread management
- **Comprehensive Financial Tracking** — reserves, payments, settlements, and recoveries all managed within the claim
- **Configurable Without Code** — admins can set up claim types, workflows, and automation through the Studio UI
- **Rich Audit Trail** — comprehensive event history for compliance
- **Internationalization** — 1,664 translation strings enable multi-language deployment
- **Branding Support** — configurable branding maps for visual customization
- **Due Date Calendar** — visual calendar showing upcoming claim and task deadlines
- **Work-in-Progress Dashboard** — chart showing claim and task progress

### 4.3 UX Considerations & Opportunities

- **Workflow Complexity** — the workflow engine is powerful but may have a steep learning curve; the instruction page helps but guided wizards could improve onboarding
- **Category-Specific Complexity** — different claim categories have different data models, which adds configuration complexity
- **Financial Module Depth** — reserves, payments, settlements, and recoveries are deeply featured; progressive disclosure could help new users
- **Email Triage Separation** — email triage is a separate site; integration into the main workspace could improve workflow continuity

---

## 5. Category-Specific Features

### Automobile Claims
- **Vehicle Management** — year, make, model, vehicle type, value type, condition
- **Treatment Tracking** — medical treatments with injury mapping
- **Property Damage** — first party and third party damage tracking
- **Liability Assessment** — liability determination for multi-party accidents

### Home Owners Claims
- **Property Types** — property classification
- **Liability Injury Workflow** — specialized workflow for injury claims
- **Insured Details** — marital status, medical treatment authorization
- **Death Proceeds** — payment of death proceeds handling
- **Return to Work** — return to work type tracking

### Life Insurance Claims
- **Beneficiary Management** — beneficiary types, status tracking
- **Investigation Outcomes** — investigation result recording

### Workers' Compensation Claims
- **Treatment Management** — medical treatment tracking with injury mapping
- **Return to Work Status** — tracking employee return to work
- **Lost Time vs Medical Only** — different workflows for claim severity
- **Medical Treatment Authorization** — authorization status tracking

---

## 6. Integration Points

| Integration | Type | Purpose |
|-------------|------|---------|
| Claim Create API | Web API | External claim creation (portal, third-party) |
| Document Upload API | Web API | External document submission |
| Portal Claim Create API | Web API | Portal-specific claim creation |
| Email Poller | Process | Ingests emails from configured mailbox |
| AI Document Summarization | Connected System | AI-powered document analysis |
| AI Coverage Verification | Connected System | AI-powered coverage validation |
| AI Claim Triage Agent | Process | AI-assisted claim triage decisions |

---

## 7. Background Processes & System Health

| Process | Purpose |
|---------|---------|
| Nightly Workflow Path Cleanup | Removes workflow path data for completed claims past retention |
| Nightly Condition Validation | Checks automation rules for invalid conditions |
| Nightly Custom Field Check | Clears email recipients referencing deleted fields |
| Email Ingestion Poller | Polls mailbox for new emails on schedule |
| Email Migration | Batch processes for email data migration |
| Automation Evaluation | Evaluates and executes automation rules |
| Post-Deployment Updates | Updates default group assignees per category |

---

## 8. Feature Inventory Summary

| Feature Area | User Actions | Pages/Views | Processes | Complexity |
|-------------|-------------|-------------|-----------|------------|
| Claim Management | 17+ actions | Rich record views | Claim creation, submission | Very High |
| Task Management | 10+ actions | Task grid, summary, automation | Task create, complete, open | High |
| Financial (Reserves/Payments) | 8+ actions | Reserve, payment, settlement views | Transaction processing | Very High |
| Workflow Engine | 6+ actions | Visual workflow builder | Path creation, routing | Very High |
| Automation Rules | 3+ actions | Rule builder, preview | Evaluation, execution | Very High |
| Email Triage | 6+ actions | Split-pane email interface | Email ingestion, processing | High |
| Email Templates | 3 actions | Template editor, preview | Send email subprocess | Medium |
| Customer Management | 3+ actions | Customer summary, policies | Customer CRUD | Medium |
| Policy Management | 3+ actions | Policy summary, coverages | Policy CRUD | Medium |
| Claims Studio | — | 5-section dashboard | Nightly syncs | High |
| AI Features | 4 features | Integrated into views | AI processing | High |
| Comments | 4 actions | Comment thread | Comment events | Low |
| Document Management | 2+ actions | Upload interface | Storage, AI summarization | Medium |
| Tags | 2 actions | Tag selector | Tag CRUD | Low |

---

## 9. Key Metrics

- **Total Objects:** 3,788
- **User-Facing Actions:** 118
- **Pages/Views:** 184
- **Business Processes:** 62
- **Sites:** 3 (Workspace, Claims Studio, Email Triage)
- **Web APIs:** 3
- **Translation Strings:** 1,664 (full i18n support)
- **Record Types:** 192
- **Interfaces:** 426
- **Expression Rules:** 830
- **Constants:** 450
- **Groups:** 25

---

## 10. Claims Studio Navigation Map

```
Claims Studio
│
├── Claim Types
│   ├── All Claim Types Grid
│   ├── Claim Type Details ......... Category, status, configuration
│   ├── Workflow Builder ........... Visual network chart editor
│   ├── Intake Form Builder ........ Configure claim creation form
│   ├── Edit Form Builder .......... Configure claim edit form
│   └── Automation Rules ........... Condition-based rule configuration
│
├── Tasking
│   ├── Tasks ...................... Reference task templates
│   │   ├── Recent Tasks .......... Card view of recent tasks
│   │   └── All Tasks Grid ........ Searchable task grid
│   ├── Task Blocks ............... Grouped task workflows
│   │   ├── Recent Task Blocks .... Card view with workflow preview
│   │   └── All Task Blocks Grid .. Searchable block grid
│   ├── Surveys ................... Questionnaire configuration
│   └── Questions ................. Question bank management
│
├── Products Group
│   ├── Lines of Business ......... LOB configuration
│   ├── Products .................. Product definitions with coverages
│   └── Cost Categories ........... Reserve cost category setup
│
└── Email Templates
    ├── Template Grid .............. Searchable template list
    └── Template Editor ............ Rich text with merge fields
```

---

*This analysis was generated from the Appian Atlas knowledge base using the Product Owner power. It reflects the application structure as parsed from the v1.2.1 deployment package.*
