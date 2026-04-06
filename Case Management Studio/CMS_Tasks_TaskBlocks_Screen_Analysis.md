# Case Management Studio — Tasks & Task Blocks Screen Analysis

**Application:** Case Management Studio v2.2.0  
**Scope:** Control Panel → Tasking Page (`CMGT_ControlPanel_Tasking`)  
**Analysis Date:** March 2026  
**Method:** Dependency graph analysis via Appian Atlas MCP + screenshot comparison

---

## 1. Page Architecture

The Tasking page (`CMGT_ControlPanel_Tasking`) is a tabbed container using `CMGT_UTIL_TabLayout` with two tabs:

| Tab | Interface | Description |
|-----|-----------|-------------|
| Tasks | `CMGT_ControlPanel_Tasking_Task` | Manage reference tasks |
| Task Blocks | `CMGT_ControlPanel_Tasking_TaskBlocks` | Manage task blocks (grouped task sets) |

Both tabs are called by the parent `CMGT_ControlPanel_Tasking`, which itself is called by the root `CMGT_ControlPanel` dashboard.

---

## 2. Tasks Tab — `CMGT_ControlPanel_Tasking_Task`

### 2.1 Layout Structure

The Tasks tab has two sections:

1. **"Recent" section** (top) — shows recently created/updated task cards
2. **"All Tasks" section** (below) — a searchable record grid of all reference tasks

### 2.2 Component Breakdown

| Component | Interface / Rule | Purpose |
|-----------|-----------------|---------|
| Section headers ("Recent", "All Tasks") | `CMGT_UTIL_HeaderField` | Renders section titles |
| Recent task cards | *Inline card rendering* | Displays task cards with name, last updated date, edit icon |
| All Tasks grid | `CMGT_WFL_ReferenceTask_RecordGrid` | Record grid with columns: Name, Assigned Group, Added, Last Updated |
| Empty state | `CMGT_UTIL_DisplayEmptyState` | Shown when no tasks exist |

### 2.3 Data Sources

| Data | Source |
|------|--------|
| Reference tasks query | `CMGT_WFL_QR_GetReferenceTask` → `CMGT_WFL_CFG_ReferenceTask` record type |
| Date formatting | `CMGT_UTIL_FormatDateTime` |
| Blank checks | `CMGT_UTIL_IsNotBlank` |
| Branding | `CMGT_CB_UTIL_LoadBrandingMap` |

### 2.4 Translation Strings Used

| String Description | Section |
|-------------------|---------|
| "Label to represent recently created / updated items" | "Recent" header |
| "Text to represent All Tasks section" | "All Tasks" header |
| "Related Cases and suggested cases Last updated date display" | Last updated formatting |
| "Text used as label in Multiple places" | Generic labels |
| "Empty state primary text of tasks page" | Empty state |
| "Empty state secondary text of tasks page" | Empty state |

### 2.5 Grid Columns (All Tasks — `CMGT_WFL_ReferenceTask_RecordGrid`)

| Column | Translation String |
|--------|-------------------|
| Name | "Field Label in Contact Information section" |
| Type / Behavior | "Field Label in the Task Creation screen" |
| Assigned Group | "Text that represents Assigned Group field in Modify Workflow action" |
| Added | "Label for column 'Added' that contains added by and added on details" |
| Last Updated | "Label used in Multiple Places" |

The grid also shows an "(Inactive)" label for inactive tasks and uses `CMGT_INT_BATCH_SIZE_LARGE` (25) for page size.

### 2.6 Recent Section — Card Pattern

Based on the screenshot and dependency analysis:
- Cards show the **task name** as the primary text
- **Last updated date** displayed below (using `CMGT_UTIL_FormatDateTime`)
- An **edit icon** on each card for quick access
- Automation tasks (behavior type = `CMGT_REFID_TASK_BEHAVIOR_TYPE_AUTOMATION`) are visually distinguished
- Cards are rendered inline (no separate card component — the rendering logic is within `CMGT_ControlPanel_Tasking_Task` itself)

---

## 3. Task Blocks Tab — `CMGT_ControlPanel_Tasking_TaskBlocks`

### 3.1 Layout Structure

The Task Blocks tab has two sections:

1. **"Recent" section** (top) — shows recently created/updated task block workflow visualization thumbnails
2. **"All Task Blocks" section** (below) — a searchable grid of all task blocks

### 3.2 Component Breakdown

| Component | Interface / Rule | Purpose |
|-----------|-----------------|---------|
| Section headers ("Recent", "All Task Blocks") | `CMGT_UTIL_HeaderField` | Renders section titles |
| Recent workflow thumbnails | `CMGT_WFL_TaskBlock_Visualization` | Network chart showing START → Tasks → END flow |
| All Task Blocks grid | *Inline grid rendering* | Grid with columns: Name, Task Count, Description, Last Updated |
| Empty state | `CMGT_UTIL_DisplayEmptyState` | Shown when no task blocks exist |
| Search/filter | `CMGT_UTIL_Filter` | Filtering for the grid |

### 3.3 Data Sources

| Data | Source |
|------|--------|
| Task blocks query | `CMGT_WFL_QR_GetTaskBlock` → `CMGT_WFL_CFG_TaskBlock` record type |
| Task block tasks query | `CMGT_WFL_QR_GetTaskBlockTask` → `CMGT_WFL_CFG_TaskBlockTask` record type |
| Date formatting | `CMGT_UTIL_FormatDateTime` |
| Blank checks | `CMGT_UTIL_IsNotBlank` |
| Branding | `CMGT_CB_UTIL_LoadBrandingMap` |

### 3.4 Translation Strings Used

| String Description | Section |
|-------------------|---------|
| "Label to represent recently created / updated items" | "Recent" header |
| "Section header text to represent all task blocks" | "All Task Blocks" header |
| "Label/Header of Task blocks" | Tab label / header |
| "Label to represent the number of tasks associated to a block" | Task count badge (e.g., "1 Task") |
| "Label to represent name field in Modify Workflow action" | Name column |
| "Label to represent description field in Modify Workflow action" | Description column |
| "Label used in Multiple Places" | Last Updated column |
| "Related Cases and suggested cases Last updated date display" | Date formatting |
| "(Inactive)" | Inactive indicator |
| "Singular value for Tasks" | Task count label |
| "Task blocks empty state primary text" | Empty state |
| "Task blocks empty state secondary text" | Empty state |
| "Empty state text when there are no task blocks" | No results state |

### 3.5 Workflow Visualization — `CMGT_WFL_TaskBlock_Visualization`

This is the key differentiator from the Tasks tab. Each recent task block is rendered as a **network chart thumbnail** showing:

- **START node** → Task nodes → **END node** (directed flow diagram)
- Uses `CMGT_PLUGIN_NetworkChartField` (wrapper for the Network Chart Plugin component)
- Node ordering logic via `CMGT_NetworkChartField_FixNodeEdgeOrder_Logic` and related rules
- Standard formatting via `CMGT_NetworkChartField_StandardFormatting`
- Mobile-responsive via `CMGT_UTIL_IsMobileScreenSize`
- Text truncation via `CMGT_UTIL_TruncateText`

**Visualization data model:**
| Record Type | Purpose |
|-------------|---------|
| `CMGT_WFL_CFG_TaskBlockTask` | Tasks within a block |
| `CMGT_WFL_CFG_TaskBlockTaskBranch` | Branching connections between tasks |
| `CMGT_WFL_CFG_TaskBlockTaskResponseOption` | Response options that determine branching |

**Validation rules built into the visualization:**
- Max 10 task dependencies per activity
- Must have a link to START node
- Must have a link to END node
- All activities must have precedents
- Tasks must have valid activity details

### 3.6 Recent Section — Thumbnail Card Pattern

Based on the screenshot:
- Each card shows a **workflow diagram thumbnail** (START → task nodes → END)
- **Task block name** displayed below the diagram
- **Task count badge** (e.g., "1 Task") shown on the card
- **Last updated date** displayed
- An **edit icon** for quick access to edit the task block
- Cards are wider than the Tasks tab cards to accommodate the workflow diagram

---

## 4. Shared Components Between Both Tabs

| Component | Used In | Purpose |
|-----------|---------|---------|
| `CMGT_UTIL_HeaderField` | Both tabs | Section headers ("Recent", "All Tasks", "All Task Blocks") |
| `CMGT_UTIL_DisplayEmptyState` | Both tabs | Empty state when no items exist |
| `CMGT_UTIL_FormatDateTime` | Both tabs | Date formatting for "Last Updated" |
| `CMGT_UTIL_IsNotBlank` | Both tabs | Null/blank checking |
| `CMGT_CB_UTIL_LoadBrandingMap` | Both tabs | Branding configuration |
| `CMGT_INT_BATCH_SIZE_LARGE` | Task Blocks grid (and Tasks grid) | Page size = 25 |
| `CMGT_TXT_EMPTY_VALUE` | Task Blocks grid (and Tasks grid) | Empty value display ("—") |

---

## 5. Header Pattern Analysis — `CMGT_UTIL_HeaderField`

This is the critical component for the UX audit. `CMGT_UTIL_HeaderField` is described as "Displays a single item with header" and is used extensively across the entire Case Management Studio app.

### 5.1 What `CMGT_UTIL_HeaderField` Calls

| Dependency | Type | Purpose |
|------------|------|---------|
| `CMGT_UTIL_IsBlank` | Expression Rule | Check if header text is blank |
| `CMGT_UTIL_ReplaceArgs` | Expression Rule | Replace arguments in header text (parameterized headers) |
| `CMGT_UTIL_GetSiteUrl` | Expression Rule | Get site URL (for header links) |
| `CMGT_UTIL_LoadBrandingMap` | Expression Rule | Load branding configuration |

### 5.2 Key Observations

- `CMGT_UTIL_HeaderField` does **NOT** call `a!heading()` as an outbound dependency
- It calls `CMGT_UTIL_LoadBrandingMap` — suggesting it renders a **custom branded header** using rich text or styled text, not the native `a!heading()` component
- It supports **parameterized text** (via `CMGT_UTIL_ReplaceArgs`) and **linked headers** (via `CMGT_UTIL_GetSiteUrl`)
- It is used by **37 interfaces** across the entire app — making it the primary header pattern in Case Management Studio

### 5.3 Where `CMGT_UTIL_HeaderField` Is Used (37 callers)

**Control Panel screens:**
- `CMGT_ControlPanel_Tasking_Task` — Tasks tab headers
- `CMGT_ControlPanel_Tasking_TaskBlocks` — Task Blocks tab headers
- `CMGT_ControlPanel_Workflow` — Workflow tab headers
- `CMGT_ControlPanel_CaseTypeMetadata` — Metadata tab headers

**Case record views:**
- `CMGT_Case_CaseDetailsSummary`, `CMGT_Case_CaseSummary`, `CMGT_Case_RecordView_Summary`
- `CMGT_Case_DisplayRolesAndRelationships`, `CMGT_Case_Milestones`, `CMGT_Case_RelatedContent`

**Task record views:**
- `CMGT_Task_RecordView_Summary`, `CMGT_Task_TaskDetailsSummary`, `CMGT_Task_PreviousTaskOccurences`
- `CMGT_Task_Sub_EmailTemplateAttachmentsCardGroup`

**Entity views:**
- `CMGT_Entity_Summary_Data`, `CMGT_Entity_Summary_Information`
- `CMGT_Entity_Summary_RelatedCases`, `CMGT_Entity_Summary_RelatedEntities`

**Workspace:**
- `CMGT_SitePage_Cases`, `CMGT_SitePage_Workspace_InternalUser`, `CMGT_SitePage_Entities`
- `CMGT_Workspace_InternalUser_Sub_CalendarDisplay`, `CMGT_Workspace_InternalUser_Sub_QuickLinks`
- `CMGT_Workspace_InternalUser_Sub_MyWorkInProgress`

**Workflow editing:**
- `CMGT_WorkflowEdit_SelectAutomationType`, `CMGT_WFL_WorkflowEdit_SelectAutomationType`
- `CMGT_Task_RecordAction_WorkflowEdit_AddTaskBlocks`, `CMGT_Task_RecordAction_WorkflowEdit_AddTasks`
- `CMGT_WFL_CaseType_RecordAction_WorkflowCreateEdit_UpdateMilestones`
- `CMGT_WFL_CaseType_RecordAction_WorkflowTasksAdd_AddTaskBlocks`, `CMGT_WFL_CaseType_RecordAction_WorkflowTasksAdd_AddTasks`
- `CMGT_WFL_TaskBlock_RecordAction_CreateUpdate_AddTasks`

**Other:**
- `CMGT_Comment_Sub_CommentThread`, `CMGT_Document_Sub_DocumentCardGroup`
- `CMGT_Automation_AddOrEditCondition`, `CMGT_WFL_Automation_AddOrEditCondition`
- `CMGT_Case_RecordAction_WorkflowCreateEdit_UpdateMilestones`

---

## 6. Comparison: Tasks Tab vs Task Blocks Tab

| Aspect | Tasks Tab | Task Blocks Tab |
|--------|-----------|-----------------|
| **Parent interface** | `CMGT_ControlPanel_Tasking_Task` | `CMGT_ControlPanel_Tasking_TaskBlocks` |
| **"Recent" section header** | `CMGT_UTIL_HeaderField` ("Recent") | `CMGT_UTIL_HeaderField` ("Recent") |
| **"All" section header** | `CMGT_UTIL_HeaderField` ("All Tasks") | `CMGT_UTIL_HeaderField` ("All Task Blocks") |
| **Recent section content** | Task cards (name + last updated + edit icon) | Workflow visualization thumbnails (network chart + name + task count + last updated + edit icon) |
| **Recent section component** | Inline card rendering | `CMGT_WFL_TaskBlock_Visualization` (Network Chart Plugin) |
| **Grid component** | `CMGT_WFL_ReferenceTask_RecordGrid` (dedicated interface) | Inline grid rendering |
| **Grid columns** | Name, Type, Assigned Group, Added, Last Updated | Name, Task Count, Description, Last Updated |
| **Search/filter** | Via grid built-in | `CMGT_UTIL_Filter` |
| **Empty state** | `CMGT_UTIL_DisplayEmptyState` + `CMGT_WFL_CMS_TASKS_EMPTY_STATE` image | `CMGT_UTIL_DisplayEmptyState` + `CMGT_WFL_CMS_TASK_BLOCKS_EMPTY_STATE` image |
| **Data source** | `CMGT_WFL_CFG_ReferenceTask` | `CMGT_WFL_CFG_TaskBlock` + `CMGT_WFL_CFG_TaskBlockTask` |
| **Automation indicator** | Yes (checks `CMGT_REFID_TASK_BEHAVIOR_TYPE_AUTOMATION`) | No |
| **Inactive indicator** | Yes ("(Inactive)" label) | Yes ("(Inactive)" label) |

---

## 7. UX Consistency Findings

### ✅ Consistent Patterns

1. **Section headers** — Both tabs use `CMGT_UTIL_HeaderField` for "Recent" and "All [Items]" section headers. This is consistent.
2. **Empty states** — Both tabs use `CMGT_UTIL_DisplayEmptyState` with dedicated empty state images. Consistent pattern.
3. **Date formatting** — Both use `CMGT_UTIL_FormatDateTime` for "Last Updated" display. Consistent.
4. **Branding** — Both load branding via `CMGT_CB_UTIL_LoadBrandingMap`. Consistent.
5. **Page size** — Both use `CMGT_INT_BATCH_SIZE_LARGE` (25). Consistent.
6. **Two-section layout** — Both follow the "Recent" + "All [Items]" pattern. Consistent.

### ⚠️ Differences (By Design)

1. **Recent section visualization** — Tasks shows simple cards; Task Blocks shows workflow diagram thumbnails. This is intentional — task blocks represent workflows and benefit from visual representation.
2. **Grid columns** — Different columns reflect different data models (tasks have assigned groups; task blocks have task counts and descriptions).
3. **Grid implementation** — Tasks uses a dedicated reusable grid interface (`CMGT_WFL_ReferenceTask_RecordGrid`); Task Blocks renders the grid inline. Minor architectural inconsistency but functionally equivalent.
4. **Filter approach** — Task Blocks explicitly uses `CMGT_UTIL_Filter`; Tasks relies on the grid's built-in filtering. Functionally similar.

### ⚠️ Heading Pattern Note

`CMGT_UTIL_HeaderField` is a **custom header component** — it does NOT use `a!heading()`. Based on its dependencies:
- It loads branding configuration (`CMGT_UTIL_LoadBrandingMap`)
- It supports parameterized text (`CMGT_UTIL_ReplaceArgs`)
- It supports linked headers (`CMGT_UTIL_GetSiteUrl`)

This means the entire Case Management Studio app uses a **custom branded header** rather than the native Appian `a!heading()` component. This is a different pattern from Connected Underwriting, which uses a mix of `a!heading()`, `ISU_richTextDisplayHeader`, and `ISU_cardTabs`.

---

## 8. Cross-App Comparison: Header Patterns

| App | Header Component | Uses `a!heading()`? | Custom Branding? |
|-----|-----------------|---------------------|------------------|
| **Case Management Studio** | `CMGT_UTIL_HeaderField` (37 callers) | ❌ No (based on dependency analysis) | ✅ Yes (`CMGT_UTIL_LoadBrandingMap`) |
| **Connected Underwriting** | Mixed: `a!heading()`, `ISU_richTextDisplayHeader`, `ISU_cardTabs` | ✅ Partially (some sections) | ✅ Yes (branding config) |

**Key Insight:** Case Management Studio is more consistent in its header approach — it uses a single custom header component (`CMGT_UTIL_HeaderField`) across all 37 interfaces. Connected Underwriting uses three different header patterns, creating inconsistency.

---

## 9. Recommendations

### For Case Management Studio (Tasks & Task Blocks)

1. **The two-section layout is well-designed** — "Recent" + "All [Items]" is a good pattern for admin screens where users frequently return to recently edited items.

2. **Workflow thumbnails in Task Blocks are a strong UX choice** — they give admins an at-a-glance view of the task flow without opening each block. Consider adding a similar visual preview for the Tasks tab (e.g., showing task type icon, SLA indicator, or automation badge on the card).

3. **Grid implementation could be standardized** — Tasks uses a dedicated grid interface (`CMGT_WFL_ReferenceTask_RecordGrid`) while Task Blocks renders inline. Extracting the Task Blocks grid into its own reusable interface would improve maintainability.

4. **Consider adding search to the Tasks tab** — Task Blocks has `CMGT_UTIL_Filter` for search, but the Tasks tab relies on the grid's built-in search. Adding explicit search would improve parity.

### For Cross-App Consistency

5. **`CMGT_UTIL_HeaderField` is a good model** — its consistent use across 37 interfaces shows disciplined component reuse. Connected Underwriting could benefit from a similar single-header-component approach.

6. **Neither app uses `a!heading()` consistently** — if the goal is to adopt Appian's native `a!heading()` component (per SAIL best practices), both apps would need migration. However, the custom header components provide branding flexibility that `a!heading()` may not support.

---

*Note: This analysis is based on dependency graph inspection via Appian Atlas MCP. The exact SAIL code for each interface could not be retrieved due to the large bundle size (260 objects). Classifications are based on which components each interface calls as outbound dependencies.*
