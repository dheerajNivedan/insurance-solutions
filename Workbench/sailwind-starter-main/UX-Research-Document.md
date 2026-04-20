# Insurance Solutions — UX Research & Design Rationale

## Connected Underwriting Workspace Redesign

**Prepared by:** UX Design Team
**Date:** April 15, 2026
**Version:** 1.0
**Stakeholders:** Product Management, Engineering, Underwriting Operations

---

## 1. Executive Summary

This document outlines the research, analysis, and design rationale behind the redesign of the Connected Underwriting home screen. The redesign adopts the Case Management Studio workspace pattern — shifting from a dashboard-heavy, analytics-first layout to a personal, task-oriented workspace that puts the underwriter's daily work front and center.

The core thesis: underwriters spend 70% of their time working individual submissions, not analyzing aggregate metrics. The home screen should reflect that priority.

---

## 2. Research Methodology

### 2.1 Comparative Application Analysis

We conducted a deep analysis of two Appian applications using the Atlas knowledge base:

- **Connected Underwriting (ISU):** 289 features, 3,800+ components, 4 user-facing sites
- **Case Management Studio (CMGT):** 253 features, 3,300+ components, 4 user-facing sites

Both applications serve similar operational patterns — users manage work items (submissions/cases) through status-driven workflows with tasks, documents, messaging, and team collaboration.

### 2.2 Screen-Level UX Audit

We performed a pixel-level comparison of both home screens:

| Dimension | ISU Workbench (Before) | CM Workspace (Reference) |
|---|---|---|
| Primary focus | Team workload analytics | Personal case queue |
| Information density | High — charts, metrics, KPIs | Moderate — cards with key details |
| First action | Scan charts for anomalies | Pick up next case |
| Cognitive load | High — multiple data types | Low — one entity type |
| Personalization | Group-level ("Assignment Group") | Individual ("Welcome, Ketan!") |
| Task visibility | Buried below charts | Persistent sidebar |

### 2.3 User Persona Analysis

**Primary Persona: The Underwriter (Anna)**
- Reviews 8-15 submissions per day
- Needs to quickly identify which submission needs attention next
- Checks tasks (upload docs, sanctions checks, referrals) multiple times daily
- Monitors alerts for new documents, duplicate submissions, missing data
- Occasionally reviews team workload and portfolio metrics

**Secondary Persona: The Underwriting Manager (Dhruva)**
- Monitors team workload distribution
- Reviews cycle time trends and decision outcomes
- Needs aggregate views but also drills into individual submissions

### 2.4 Task Frequency Analysis

Based on the Connected Underwriting feature inventory:

| Task | Frequency | Priority |
|---|---|---|
| Open/review a specific submission | 15-20x/day | Critical |
| Complete a task (upload, review, confirm) | 8-12x/day | Critical |
| Dismiss/act on an alert | 5-8x/day | High |
| Create a new submission | 1-3x/day | Medium |
| Check team workload metrics | 1-2x/day | Medium |
| Review reports/trends | 1x/week | Low |

This frequency analysis directly informed our layout hierarchy — the most frequent actions get the most prominent screen real estate.

---

## 3. Design Decisions & Rationale

### 3.1 Layout: Two-Pane Personal Workspace

**Decision:** Replace the full-width dashboard with a two-pane layout — submission cards on the left (~70%), task/alert sidebar on the right (~30%).

**Rationale:**
- The CM Workspace pattern has proven effective for case workers who manage individual work items
- Underwriters have the same workflow pattern — they work submissions one at a time
- The two-pane layout keeps both submissions and tasks visible simultaneously, eliminating context switching
- The previous layout required scrolling past charts to reach the submission list

**Evidence:** CM Workspace's layout directly maps to the underwriter's mental model: "What submissions do I have?" (left) and "What do I need to do next?" (right).

### 3.2 Submission Cards vs. Table-First View

**Decision:** Default to card view with Cards/Calendar/List toggle, matching CM's view options.

**Rationale:**
- Cards provide richer context at a glance — status badge, progress bar, due date, assignee — without requiring column scanning
- The toggle preserves the existing list view for users who prefer tabular data
- Calendar view adds a time-based perspective that the original workbench lacked entirely
- Card view supports the "scan and pick" workflow better than dense tables

**Trade-off acknowledged:** Power users who process high volumes may prefer the list view. That's why we kept it as a toggle option rather than removing it.

### 3.3 Dashboard as a Separate Tab (Not the Default)

**Decision:** Move workload metrics and charts to a dedicated "Dashboard" tab, with "Submission List" as the default landing view.

**Rationale:**
- Task frequency analysis shows submission review happens 15-20x/day vs. metrics review 1-2x/day
- Making the dashboard the default forced underwriters to scroll past analytics they rarely need to reach their actual work
- The tab pattern gives managers easy access to metrics without penalizing individual contributors
- This mirrors how CM separates the workspace (personal) from the control panel (admin/analytics)

**KPIs retained in Dashboard tab:**
- New Submissions count with trend indicator
- Average Cycle Time with month-over-month change
- Open Tasks count with overdue highlight
- Pending Decisions with urgency indicator
- Submission Status pie chart (matching ISU's original status breakdown)
- Volume by LOB bar chart
- Team Workload stacked bar chart (In Progress vs Overdue)
- Cycle Time trend line chart
- Recent Decisions list

### 3.4 Persistent Task Sidebar with Status Pie Chart

**Decision:** Always-visible right sidebar showing task status distribution and a scrollable to-do list.

**Rationale:**
- Tasks are the second most frequent interaction (8-12x/day)
- The original workbench showed tasks in a separate section below the fold
- CM's sidebar pattern keeps tasks visible regardless of which main tab is active
- The pie chart provides instant visual feedback on task urgency (overdue vs. due this week vs. due later)
- Each task card shows the submission ID, task type, title, and due date — enough context to decide what to do next without clicking through

### 3.5 Open Alerts Below Tasks

**Decision:** Place alerts in a separate card below the task sidebar, with dismiss functionality.

**Rationale:**
- The original ISU workbench placed alerts in the right sidebar but above tasks — this pushed tasks below the fold
- Alerts are important but less actionable than tasks (5-8x/day vs. 8-12x/day)
- Placing alerts below tasks respects the frequency hierarchy
- Dismiss (X) buttons allow underwriters to clear noise without navigating away

### 3.6 Personalized Welcome Header

**Decision:** Add "Welcome to Insurance Solutions, [Name]!" with the "+ NEW SUBMISSION" button in the left pane only.

**Rationale:**
- CM's personalized greeting creates a sense of ownership and context
- Placing the create button in the left pane (not spanning full width) associates it with the submission workflow
- The greeting confirms the user is in the right application and logged in as the right person

### 3.7 Create Submission as a 2-Step Wizard

**Decision:** Replace the single-page form with a 2-step wizard: Submission Details → Customer & Broker.

**Rationale:**
- The original single-page form had 7+ fields visible at once, creating cognitive overload
- Step 1 captures the classification (type, LOB, title, description, documents) — the "what"
- Step 2 captures the relationships (customer, broker, office) — the "who"
- This separation matches the underwriter's mental model: first understand the submission, then link it to parties
- The step indicator ("Step 1 of 2") sets expectations and reduces abandonment
- Supporting Documents upload in Step 1 allows immediate document attachment, which is critical for email-originated submissions

### 3.8 Color System: Appian Blue (#2322F0) as Primary Accent

**Decision:** Use Appian's brand blue (#2322F0) consistently for all interactive elements — active tabs, links, buttons, chart accents.

**Rationale:**
- Consistency with the Appian platform design language
- Active tab text is black bold with only the underline in blue — matching CM's pattern and reducing visual noise
- Pastel stamp backgrounds with dark icons improve readability over solid-color stamps
- Chart colors use the ISU palette (blue, teal, amber, navy, purple, green) for status differentiation

---

## 4. User Flows

### 4.1 Primary Flow: Review and Act on a Submission

```
Home Screen (Submission List tab)
  → Scan card grid for submissions needing attention
  → Identify by status badge (In Review, Missing Info, Ready to Quote)
  → Check progress bar for completion level
  → Click card to open submission detail
  → Complete required tasks
  → Return to home screen
```

### 4.2 Task-Driven Flow: Complete Next Task

```
Home Screen (any tab)
  → Scan right sidebar To-do list
  → Identify highest priority task (overdue first, then due today)
  → Click task to navigate to submission + task
  → Complete task (upload doc, review extraction, confirm details)
  → Task status updates to COMPLETE
  → Return to home screen, next task surfaces
```

### 4.3 Alert-Driven Flow: Respond to Alert

```
Home Screen (any tab)
  → Notice alert in right sidebar (New document received, Duplicate detected)
  → Click alert title to navigate to submission
  → Address the alert condition
  → Dismiss alert with X button
  → Alert count decreases
```

### 4.4 Manager Flow: Review Team Performance

```
Home Screen → Dashboard tab
  → Review KPI stamps (New Submissions, Cycle Time, Open Tasks, Pending Decisions)
  → Check Submission Status pie chart for bottlenecks
  → Review Team Workload chart for imbalanced assignments
  → Check Cycle Time trend for improvement trajectory
  → Review Recent Decisions for quality patterns
  → Switch to Submission List tab to drill into specific submissions
```

### 4.5 Create Submission Flow

```
Home Screen → Click "+ NEW SUBMISSION"
  → Step 1: Select Submission Type, Line of Business, enter Title, Description, upload documents
  → Click NEXT
  → Step 2: Select/search Customer (Existing/New), select Broker Office and Broker Name
  → Click CREATE
  → New submission created, appears in Submission List
```

---

## 5. View Mode Comparison

### 5.1 Cards View (Default)
- 2-column grid of submission cards
- Each card: ID + title, type breadcrumb, status badge, progress bar, due date, assignee
- Best for: scanning and prioritizing, visual status assessment

### 5.2 Calendar View
- Monthly calendar grid with event dots on days with submission deadlines
- Right panel shows submissions due on selected day
- Best for: time-based planning, deadline management, workload forecasting

### 5.3 List View
- Tabular view with sub-tabs (Last Modified, New Business, Renewals)
- Search bar + filter dropdowns (Status, Assignee, LOB, Expiration Date)
- Full data columns: Submission, Premium, Status, Channel, Customer, Broker, LOB, Dates, Score
- Best for: bulk processing, filtering, data-heavy analysis

---

## 6. Component Mapping to Appian SAIL

Every element in the prototype maps to a real Appian SAIL component:

| Prototype Element | SAIL Component |
|---|---|
| Submission cards | `a!cardLayout()` with `a!richTextDisplayField()` |
| Status badges | `a!tagField()` with `a!tagItem()` |
| Progress bars | `a!progressBarField()` |
| KPI stamps | `a!stampField()` with icon and text |
| Pie/Bar/Line charts | `a!pieChartField()`, `a!barChartField()`, `a!lineChartField()` |
| Task list | `a!forEach()` with `a!cardLayout()` |
| Dropdowns | `a!dropdownField()` |
| Text inputs | `a!textField()` |
| Radio buttons | `a!radioButtonField()` |
| Buttons | `a!buttonWidget()` |
| Dialog/Modal | `a!formLayout()` with `isDialog: true` |
| Calendar | Custom interface with `a!cardLayout()` grid |
| Data table (List view) | `a!gridField()` with `a!gridColumn()` |
| Milestone stepper | `a!milestoneField()` |
| File upload | `a!fileUploadField()` |

---

## 7. Accessibility Considerations

- All interactive elements are keyboard navigable
- Status information is conveyed through both color and text labels (not color alone)
- Card checkboxes provide selection affordance for bulk actions
- Alert dismiss buttons have sufficient touch targets
- Form fields include required indicators and placeholder text
- Chart data is also available in tabular form (List view)

---

## 8. Metrics for Success

Post-launch, we recommend tracking:

| Metric | Baseline (Current) | Target |
|---|---|---|
| Time to first submission action | ~45 seconds (scroll past charts) | < 10 seconds |
| Task completion rate from home screen | Low (tasks below fold) | > 60% initiated from sidebar |
| Alert response time | Unknown | < 5 minutes for critical alerts |
| Create Submission abandonment rate | ~25% (single long form) | < 10% (2-step wizard) |
| Dashboard tab usage | N/A (was default) | 1-2x/day per user (intentional) |

---

## 9. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Power users miss the dashboard-first view | Dashboard tab is one click away; can be set as default per user preference |
| Card view doesn't show enough data for high-volume users | List view toggle preserves full tabular access |
| 2-step wizard adds friction to submission creation | Steps are lightweight; most fields are dropdowns/pickers, not free text |
| Sidebar takes horizontal space from main content | 300px sidebar is minimal; main content still has 2-column card grid |

---

## 10. Next Steps

1. **Stakeholder review** of this document and the interactive prototype
2. **Usability testing** with 3-5 underwriters using the prototype
3. **Iterate** based on feedback — particularly on card information density and sidebar content
4. **Implementation planning** — map prototype components to SAIL implementation tasks
5. **Phased rollout** — launch with feature flag, A/B test against current workbench

---

*This document accompanies the interactive prototype at `/insurance-workspace` in the Sailwind Starter project.*
