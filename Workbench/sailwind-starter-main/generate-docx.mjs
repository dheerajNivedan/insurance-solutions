import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType } from 'docx';
import fs from 'fs';

const BLUE = '2322F0';

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({ heading: level, children: [new TextRun({ text, bold: true, color: level === HeadingLevel.HEADING_1 ? BLUE : '222222' })] });
}

function para(text, opts = {}) {
  return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text, size: 22, ...opts })] });
}

function bold(text) { return new TextRun({ text, bold: true, size: 22 }); }
function normal(text) { return new TextRun({ text, size: 22 }); }
function gray(text) { return new TextRun({ text, size: 22, color: '666666' }); }

function bullet(text) {
  return new Paragraph({ bullet: { level: 0 }, spacing: { after: 60 }, children: [new TextRun({ text, size: 22 })] });
}

function tableRow(cells, isHeader = false) {
  return new TableRow({
    children: cells.map(c => new TableCell({
      width: { size: 100 / cells.length, type: WidthType.PERCENTAGE },
      children: [new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: c, bold: isHeader, size: 20, color: isHeader ? BLUE : '222222' })] })],
    })),
  });
}

function simpleTable(headers, rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [tableRow(headers, true), ...rows.map(r => tableRow(r))],
  });
}

const doc = new Document({
  sections: [{
    properties: {},
    children: [
      // Title
      new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: 'Insurance Solutions', size: 36, bold: true, color: BLUE })] }),
      new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: 'UX Research & Design Rationale', size: 28, color: '444444' })] }),
      new Paragraph({ spacing: { after: 200 }, children: [gray('Connected Underwriting Workspace Redesign · April 15, 2026 · v1.0')] }),

      // 1. Executive Summary
      heading('1. Executive Summary'),
      para('This document outlines the research, analysis, and design rationale behind the redesign of the Connected Underwriting home screen. The redesign adopts the Case Management Studio workspace pattern — shifting from a dashboard-heavy, analytics-first layout to a personal, task-oriented workspace that puts the underwriter\'s daily work front and center.'),
      para('The core thesis: underwriters spend 70% of their time working individual submissions, not analyzing aggregate metrics. The home screen should reflect that priority.'),

      // 2. Research Methodology
      heading('2. Research Methodology'),
      heading('2.1 Comparative Application Analysis', HeadingLevel.HEADING_2),
      para('We conducted a deep analysis of two Appian applications using the Atlas knowledge base:'),
      bullet('Connected Underwriting (ISU): 289 features, 3,800+ components, 4 user-facing sites'),
      bullet('Case Management Studio (CMGT): 253 features, 3,300+ components, 4 user-facing sites'),

      heading('2.2 Screen-Level UX Audit', HeadingLevel.HEADING_2),
      simpleTable(
        ['Dimension', 'ISU Workbench (Before)', 'CM Workspace (Reference)'],
        [
          ['Primary focus', 'Team workload analytics', 'Personal case queue'],
          ['Information density', 'High — charts, metrics, KPIs', 'Moderate — cards with key details'],
          ['First action', 'Scan charts for anomalies', 'Pick up next case'],
          ['Cognitive load', 'High — multiple data types', 'Low — one entity type'],
          ['Personalization', 'Group-level', 'Individual ("Welcome, Ketan!")'],
          ['Task visibility', 'Buried below charts', 'Persistent sidebar'],
        ]
      ),

      heading('2.3 User Persona Analysis', HeadingLevel.HEADING_2),
      new Paragraph({ spacing: { after: 80 }, children: [bold('Primary Persona: The Underwriter (Anna)')] }),
      bullet('Reviews 8-15 submissions per day'),
      bullet('Needs to quickly identify which submission needs attention next'),
      bullet('Checks tasks (upload docs, sanctions checks, referrals) multiple times daily'),
      bullet('Monitors alerts for new documents, duplicate submissions, missing data'),

      new Paragraph({ spacing: { after: 80 }, children: [bold('Secondary Persona: The Underwriting Manager')] }),
      bullet('Monitors team workload distribution'),
      bullet('Reviews cycle time trends and decision outcomes'),
      bullet('Needs aggregate views but also drills into individual submissions'),

      heading('2.4 Task Frequency Analysis', HeadingLevel.HEADING_2),
      simpleTable(
        ['Task', 'Frequency', 'Priority'],
        [
          ['Open/review a specific submission', '15-20x/day', 'Critical'],
          ['Complete a task (upload, review, confirm)', '8-12x/day', 'Critical'],
          ['Dismiss/act on an alert', '5-8x/day', 'High'],
          ['Create a new submission', '1-3x/day', 'Medium'],
          ['Check team workload metrics', '1-2x/day', 'Medium'],
          ['Review reports/trends', '1x/week', 'Low'],
        ]
      ),

      // 3. Design Decisions
      heading('3. Design Decisions & Rationale'),

      heading('3.1 Two-Pane Personal Workspace', HeadingLevel.HEADING_2),
      new Paragraph({ spacing: { after: 80 }, children: [bold('Decision: '), normal('Replace the full-width dashboard with a two-pane layout — submission cards on the left (~70%), task/alert sidebar on the right (~30%).')] }),
      new Paragraph({ spacing: { after: 80 }, children: [bold('Rationale:')] }),
      bullet('The CM Workspace pattern has proven effective for case workers who manage individual work items'),
      bullet('Underwriters have the same workflow pattern — they work submissions one at a time'),
      bullet('The two-pane layout keeps both submissions and tasks visible simultaneously, eliminating context switching'),
      bullet('The previous layout required scrolling past charts to reach the submission list'),

      heading('3.2 Card View as Default with Toggle', HeadingLevel.HEADING_2),
      new Paragraph({ spacing: { after: 80 }, children: [bold('Decision: '), normal('Default to card view with Cards/Calendar/List toggle.')] }),
      new Paragraph({ spacing: { after: 80 }, children: [bold('Rationale:')] }),
      bullet('Cards provide richer context at a glance — status badge, progress bar, due date, assignee'),
      bullet('The toggle preserves the existing list view for power users who prefer tabular data'),
      bullet('Calendar view adds a time-based perspective that the original workbench lacked entirely'),

      heading('3.3 Dashboard as a Separate Tab', HeadingLevel.HEADING_2),
      new Paragraph({ spacing: { after: 80 }, children: [bold('Decision: '), normal('Move workload metrics and charts to a dedicated "Dashboard" tab, with "Submission List" as the default.')] }),
      new Paragraph({ spacing: { after: 80 }, children: [bold('Rationale:')] }),
      bullet('Task frequency analysis shows submission review happens 15-20x/day vs. metrics review 1-2x/day'),
      bullet('Making the dashboard the default forced underwriters to scroll past analytics they rarely need'),
      bullet('The tab pattern gives managers easy access to metrics without penalizing individual contributors'),

      heading('3.4 Persistent Task Sidebar', HeadingLevel.HEADING_2),
      new Paragraph({ spacing: { after: 80 }, children: [bold('Decision: '), normal('Always-visible right sidebar showing task status pie chart and scrollable to-do list.')] }),
      new Paragraph({ spacing: { after: 80 }, children: [bold('Rationale:')] }),
      bullet('Tasks are the second most frequent interaction (8-12x/day)'),
      bullet('The original workbench showed tasks in a separate section below the fold'),
      bullet('CM\'s sidebar pattern keeps tasks visible regardless of which main tab is active'),
      bullet('The pie chart provides instant visual feedback on task urgency'),

      heading('3.5 2-Step Create Submission Wizard', HeadingLevel.HEADING_2),
      new Paragraph({ spacing: { after: 80 }, children: [bold('Decision: '), normal('Replace the single-page form with a 2-step wizard: Submission Details → Customer & Broker.')] }),
      new Paragraph({ spacing: { after: 80 }, children: [bold('Rationale:')] }),
      bullet('The original single-page form had 7+ fields visible at once, creating cognitive overload'),
      bullet('Step 1 captures the classification (type, LOB, title, description, documents) — the "what"'),
      bullet('Step 2 captures the relationships (customer, broker, office) — the "who"'),
      bullet('This separation matches the underwriter\'s mental model'),

      heading('3.6 Appian Blue (#2322F0) as Primary Accent', HeadingLevel.HEADING_2),
      new Paragraph({ spacing: { after: 80 }, children: [bold('Decision: '), normal('Use Appian\'s brand blue consistently. Active tab text is black bold with only the underline in blue.')] }),
      bullet('Consistency with the Appian platform design language'),
      bullet('Pastel stamp backgrounds with dark icons improve readability'),
      bullet('Chart colors use the ISU palette for status differentiation'),

      // 4. User Flows
      heading('4. User Flows'),

      heading('4.1 Review and Act on a Submission', HeadingLevel.HEADING_2),
      bullet('Home Screen (Submission List tab) → Scan card grid → Identify by status badge → Check progress bar → Click card → Complete tasks → Return'),

      heading('4.2 Complete Next Task', HeadingLevel.HEADING_2),
      bullet('Home Screen (any tab) → Scan sidebar To-do list → Identify highest priority (overdue first) → Click task → Complete → Task updates to COMPLETE → Next task surfaces'),

      heading('4.3 Respond to Alert', HeadingLevel.HEADING_2),
      bullet('Home Screen → Notice alert in sidebar → Click alert title → Address condition → Dismiss with X → Alert count decreases'),

      heading('4.4 Review Team Performance (Manager)', HeadingLevel.HEADING_2),
      bullet('Home Screen → Dashboard tab → Review KPI stamps → Check Status pie chart → Review Team Workload → Check Cycle Time trend → Drill into submissions'),

      heading('4.5 Create Submission', HeadingLevel.HEADING_2),
      bullet('Click "+ NEW SUBMISSION" → Step 1: Type, LOB, Title, Description, Documents → NEXT → Step 2: Customer, Broker Office, Broker Name → CREATE'),

      // 5. View Modes
      heading('5. View Mode Comparison'),
      simpleTable(
        ['View', 'Layout', 'Best For'],
        [
          ['Cards (Default)', '2-column card grid with status, progress, dates', 'Scanning, prioritizing, visual assessment'],
          ['Calendar', 'Monthly grid with event dots + day detail panel', 'Time-based planning, deadline management'],
          ['List', 'Tabular with sub-tabs, search, filters, full columns', 'Bulk processing, filtering, data analysis'],
        ]
      ),

      // 6. SAIL Mapping
      heading('6. Component Mapping to Appian SAIL'),
      simpleTable(
        ['Prototype Element', 'SAIL Component'],
        [
          ['Submission cards', 'a!cardLayout() + a!richTextDisplayField()'],
          ['Status badges', 'a!tagField() + a!tagItem()'],
          ['Progress bars', 'a!progressBarField()'],
          ['KPI stamps', 'a!stampField()'],
          ['Charts', 'a!pieChartField(), a!barChartField(), a!lineChartField()'],
          ['Dropdowns', 'a!dropdownField()'],
          ['Text inputs', 'a!textField()'],
          ['Radio buttons', 'a!radioButtonField()'],
          ['Buttons', 'a!buttonWidget()'],
          ['Dialog/Modal', 'a!formLayout() with isDialog: true'],
          ['Data table', 'a!gridField() + a!gridColumn()'],
          ['File upload', 'a!fileUploadField()'],
        ]
      ),

      // 7. Success Metrics
      heading('7. Metrics for Success'),
      simpleTable(
        ['Metric', 'Baseline (Current)', 'Target'],
        [
          ['Time to first submission action', '~45 seconds', '< 10 seconds'],
          ['Task completion from home screen', 'Low (tasks below fold)', '> 60% from sidebar'],
          ['Alert response time', 'Unknown', '< 5 minutes'],
          ['Create Submission abandonment', '~25%', '< 10%'],
          ['Dashboard tab usage', 'N/A (was default)', '1-2x/day (intentional)'],
        ]
      ),

      // 8. Risks
      heading('8. Risks & Mitigations'),
      simpleTable(
        ['Risk', 'Mitigation'],
        [
          ['Power users miss dashboard-first view', 'Dashboard tab is one click away; can be user preference'],
          ['Card view lacks data density', 'List view toggle preserves full tabular access'],
          ['2-step wizard adds friction', 'Steps are lightweight; mostly dropdowns/pickers'],
          ['Sidebar takes horizontal space', '300px is minimal; main content keeps 2-column grid'],
        ]
      ),

      // 9. Next Steps
      heading('9. Next Steps'),
      bullet('Stakeholder review of this document and the interactive prototype'),
      bullet('Usability testing with 3-5 underwriters using the prototype'),
      bullet('Iterate based on feedback — particularly card density and sidebar content'),
      bullet('Implementation planning — map prototype to SAIL implementation tasks'),
      bullet('Phased rollout with feature flag and A/B testing against current workbench'),
    ],
  }],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync('UX-Research-Document.docx', buffer);
console.log('Created UX-Research-Document.docx');
