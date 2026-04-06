# Case Management Studio — Feature & UX Analysis

**Application Version:** 2.2.0  
**Analysis Date:** March 9, 2026  
**Perspective:** Product Owner & User Experience

---

## Executive Summary

Case Management Studio is a configurable case management platform that enables organizations to track, manage, and resolve cases through structured workflows. It provides both an internal user workspace for day-to-day case handling and an admin-facing control panel (studio) for configuring case types, workflows, automation rules, and templates.

The application is built around a core loop: cases are created, assigned to users, worked through configurable task workflows, and resolved — with full event history and audit trails throughout.

---

## 1. User Personas & Entry Points

### Internal Case Workers
- Access the application through the **Workspace Site**
- Primary activities: view assigned cases, work tasks, add comments, upload documents, manage entities
- See case grids, task lists, event history, and case summaries

### Case Managers / Administrators
- Access the **Control Panel (Studio Dashboard)** to configure the system
- Primary activities: define case types, build workflows, set up automation rules, manage email templates, configure task blocks and milestones

### External Users (Portal)
- Limited portal access is supported (the app detects anonymous/portal users)
- Likely used for case intake or status checking

---

## 2. Core Feature Areas

### 2.1 Case Lifecycle Management
The central feature of the application. Users can:

- **Create Cases** — via an intake form that captures case type, priority, description, and custom metadata
- **View Case Summary** — a rich summary page showing case details, status, assigned users, milestones, and workflow progress
- **Edit Cases** — update case details, reassign, change priority or status
- **Manage Case Metadata** — add custom fields and data specific to each case type
- **Tag Cases** — apply tags for categorization and filtering
- **Link Related Cases** — connect cases that are related to each other for cross-referencing
- **Link Entities to Cases** — associate people, organizations, or other entities with a case
- **Upload Documents** — attach supporting documents to cases with validation
- **View Event History** — full audit trail of all changes, comments, and actions on a case
- **Lock Cases** — API-driven locking to prevent concurrent edits

**User Actions Available (from Case record):**
| Action | Description |
|--------|-------------|
| Edit Case Details | Update case information |
| Manage Workflow | View and modify the case's workflow |
| Add Comment | Post comments with document attachments |
| Upload Document | Attach files to the case |
| Manage Tags | Add or remove tags |
| Manage Entities | Link people/organizations |
| Manage Related Cases | Link related cases |
| Update Status | Change case status |


### 2.2 Task Management
Tasks are the work items within a case. The system supports a rich task model:

- **Create Tasks** — manually or automatically generated from workflow definitions
- **Open / Work Tasks** — users open tasks to view details, add comments, and take action
- **Complete Tasks** — mark tasks as done, which can trigger downstream automation
- **Update Task Status** — change status independently of completion
- **Set Due Dates** — assign SLA-driven due dates to tasks
- **Rename Tasks** — update task names as needed
- **View Task Automation** — see what automation rules are attached to a task
- **View Task Summary** — detailed view of task details, assignments, and history
- **Task Visualization** — network chart showing task dependencies and flow
- **Lock Tasks** — API-driven locking for concurrent edit protection

**Task Behavior Types:**
- Manual tasks (assigned to users)
- Automated tasks (system-executed: send email, workflow routing)
- Task blocks (grouped sets of tasks)

### 2.3 Workflow Engine
The workflow system is the most complex and powerful feature area:

- **Configurable Workflows per Case Type** — each case type can have its own workflow definition
- **Milestone-Based Progression** — workflows are organized into milestones that represent major phases
- **Task Dependencies** — tasks can have precedent/dependent relationships creating a directed flow
- **Branching Logic** — tasks can have response options that determine which path the workflow takes next
- **Workflow Visualization** — interactive network chart showing the full workflow as a visual diagram with nodes and edges
- **Workflow Editing at Runtime** — case workers can modify the workflow on an active case (add tasks, change flow)
- **Workflow Path Tracking** — the system tracks which path through the workflow each case takes

**Workflow Components:**
| Component | Purpose |
|-----------|---------|
| Milestones | Major phases in the case lifecycle |
| Reference Tasks | Reusable task templates |
| Task Blocks | Groups of related tasks that execute together |
| Task Branches | Decision points that route to different paths |
| Response Options | Choices available when completing a task |

### 2.4 Automation Rules Engine
A rule-based automation system that triggers actions based on conditions:

- **Condition-Based Triggers** — rules fire when specific conditions are met (field changes, status updates, etc.)
- **Condition Sets** — groups of conditions combined with AND/OR logic
- **Available Automated Actions:**
  - **Send Email** — automatically send templated emails when conditions are met
  - **Workflow Routing** — automatically route the case to the next workflow step
  - **Assign/Reassign** — automatically assign cases or tasks to users or groups
  - **Create Case** — automatically create a new related case
- **Rule Visualization** — formatted HTML display of rule logic for easy review
- **Nightly Validation** — background processes that check rule integrity and clean up invalid conditions

### 2.5 Email Templates
A template system for automated and manual email communications:

- **Create Email Templates** — rich text templates with merge fields
- **Edit and Clone Templates** — modify existing templates or create copies
- **Delete Templates** — remove unused templates
- **Template Attachments** — attach documents to email templates
- **Template Preview** — preview how emails will look before saving
- **Integration with Automation** — templates are used by the "Send Email" automation action

### 2.6 Entity Management
Entities represent people, organizations, or other parties involved in cases:

- **Create Entities** — add new people or organizations with contact details
- **Edit Entities** — update entity information
- **View Entity Summary** — see entity details, contact info, and related cases
- **Link Entities to Cases** — associate entities with specific cases
- **Manage Entity Relationships** — define how entities relate to each other (e.g., parent/subsidiary)
- **Entity Categories & Types** — classify entities for organization
- **View Related Cases** — from an entity, see all cases they're involved in
- **Event History** — track all changes to entity records

### 2.7 Comments & Collaboration
- **Add Comments** — post comments on cases and tasks
- **Comment with Attachments** — attach documents to comments
- **User Tagging** — tag other users in comments for notifications
- **Comment History** — full thread of all comments on a case or task

### 2.8 Document Management
- **Upload Documents** — attach files to cases with type validation
- **Document Categories** — classify documents (e.g., "Supporting Document")
- **Document Storage** — organized folder structure per case
- **Document Migration** — tools for migrating documents between storage locations


---

## 3. Admin / Studio Configuration Features

The Control Panel (Studio) is the admin hub. It has four main tabs:

### 3.1 Workflow Tab
- Visual workflow builder using network chart diagrams
- Create and edit workflows per case type
- Define milestones and task sequences
- Configure task dependencies and branching
- Set SLA timers (days, hours, minutes — with business day support)
- Instruction page with step-by-step guidance for workflow configuration

### 3.2 Tasking Tab
- **Reference Tasks** — reusable task templates with configurable fields (name, description, assigned group, SLA, behavior type)
- **Task Blocks** — groups of tasks that can be applied as a unit, with their own visualization and dependency management
- Task configuration includes: response options, automation rules, email triggers

### 3.3 Rules Tab
- Create and manage automation rules at various hierarchy levels (case type, task, etc.)
- Visual rule builder with condition sets
- Formatted HTML preview of rule logic
- Rules can trigger: email sends, workflow routing, task assignment, case creation

### 3.4 Email Templates Tab
- Create, edit, clone, and delete email templates
- Rich text editor with merge fields
- Attachment management
- Search and browse templates
- Preview functionality

### 3.5 Metadata Tab
- Define custom metadata fields per case type
- Configure default case values
- Manage case type settings (prefix, name, description)

---

## 4. User Experience Analysis

### 4.1 Navigation & Information Architecture

**Primary Navigation:**
- Workspace Site → Case list, task list, entity list (for case workers)
- Control Panel → Workflow, Tasking, Rules, Email Templates, Metadata (for admins)

**Record Views (Case):**
- Summary view (overview of case details, milestones, workflow status)
- Tasks view (list of all tasks with status, due dates, assignments)
- Automation view (rules and automated actions)
- Event History (audit trail)
- Related Cases, Entities, Tags, Documents

**Record Views (Task):**
- Summary view (task details, assignment, SLA)
- Automation view (rules attached to this task)

### 4.2 UX Strengths
- **Visual Workflow Builder** — the network chart visualization makes complex workflows understandable at a glance
- **Configurable Without Code** — admins can set up case types, workflows, and automation rules through the UI
- **Rich Audit Trail** — comprehensive event history for compliance and accountability
- **Internationalization** — full translation support (805 translation strings) enables multi-language deployment
- **Mobile Responsive** — the app detects mobile screen sizes and adapts the layout
- **Portal Support** — external users can interact with cases through a portal interface
- **Empty States** — well-designed empty states guide users when no data exists yet
- **Branding Support** — configurable branding maps allow visual customization

### 4.3 UX Considerations & Opportunities
- **Workflow Complexity** — the workflow engine is powerful but may have a steep learning curve for new admins; the instruction page helps but guided wizards could improve onboarding
- **Action Density on Cases** — cases have many available actions (13+ record actions); progressive disclosure or contextual grouping could reduce cognitive load
- **Task Visualization Limits** — the network chart has a 10-task dependency limit per activity, which may constrain complex workflows
- **Automation Rule Readability** — rules are displayed as formatted HTML; a more visual rule builder (drag-and-drop) could improve usability
- **Search & Filtering** — case and task grids support filtering, but advanced saved filters or smart views could improve daily workflows

---

## 5. Integration Points

| Integration | Type | Purpose |
|-------------|------|---------|
| Lock Case API | Web API | Prevents concurrent edits to a case |
| Lock Task API | Web API | Prevents concurrent edits to a task |
| Email System | Process | Sends automated emails using templates |
| Document Storage | Process | Manages file storage and folder structure |

---

## 6. Background Processes & System Health

| Process | Purpose |
|---------|---------|
| Nightly Workflow Path Cleanup | Removes workflow path data for completed cases past retention period |
| Nightly Condition Validation | Checks automation rules for invalid conditions (deleted fields, changed data) |
| Nightly Custom Field Check | Clears email recipients referencing deleted custom fields |
| Data Migration Tools | One-time processes for document migration and rule backfill |

---

## 7. Feature Inventory Summary

| Feature Area | User Actions | Pages/Views | Processes | Complexity |
|-------------|-------------|-------------|-----------|------------|
| Case Management | 14 actions | Rich record views | Case creation, submission | High |
| Task Management | 15 actions | Task grid, summary, automation views | Task create, complete, open | High |
| Workflow Engine | 6 actions | Visual workflow builder | Path creation, routing | Very High |
| Automation Rules | 3 actions | Rule builder, HTML preview | Evaluation, execution | Very High |
| Email Templates | 3 actions | Template editor, preview | Send email subprocess | Medium |
| Entity Management | 4 actions | Entity summary, related cases | Entity CRUD | Medium |
| Comments | 4 actions | Comment thread | Comment events | Low |
| Document Management | 1 action | Upload interface | Storage, migration | Low |
| Admin Control Panel | — | 4-tab dashboard | Nightly syncs | High |
| Tags | 2 actions | Tag selector | Tag CRUD | Low |

---

## 8. Key Metrics

- **Total Objects:** 2,024
- **User-Facing Actions:** 53
- **Pages/Views:** 72
- **Business Processes:** 46
- **Dashboard:** 1 (Control Panel)
- **Sites:** 1 (Workspace)
- **Web APIs:** 2
- **Translation Strings:** 805 (full i18n support)
- **Record Types:** 72
- **Interfaces:** 249

---

*This analysis was generated from the Appian Atlas knowledge base using the Product Owner power. It reflects the application structure as parsed from the v2.2.0 deployment package.*
