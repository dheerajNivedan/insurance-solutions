import { Route, Router, Switch } from 'wouter'

// Import all pages
import Home from './pages/home'
import TaskDashboard from './pages/task-dashboard'
import ApplicationStatus from './pages/application-status'
import DocumentReview from './pages/document-review'
import FinancialPerformance from './pages/financial-performance'
import InsuranceWorkspace from './pages/insurance-workspace'
import SubmissionSummary from './pages/submission-summary'
import NotFound from './pages/not-found'

// Page registry for automatic TOC generation
const pages = [
  { path: '/', title: 'Home', component: Home },
  { path: '/task-dashboard', title: 'Task Dashboard', component: TaskDashboard },
  { path: '/application-status', title: 'Application Status', component: ApplicationStatus },
  { path: '/document-review', title: 'Document Review', component: DocumentReview },
  { path: '/financial-performance', title: 'Financial Performance', component: FinancialPerformance },
  { path: '/insurance-workspace', title: 'Insurance Workspace', component: InsuranceWorkspace },
  { path: '/submission-summary', title: 'Submission Summary', component: SubmissionSummary },
]

// Pages that handle their own full-width layout
const fullWidthPaths = ['/insurance-workspace', '/financial-performance', '/submission-summary']

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Switch>
          {pages
            .filter(p => fullWidthPaths.includes(p.path))
            .map(({ path, component: Component }) => (
              <Route key={path} path={path} component={Component} />
            ))}
          <Route>
            <div className="max-w-7xl mx-auto p-6">
              <Switch>
                {pages
                  .filter(p => !fullWidthPaths.includes(p.path))
                  .map(({ path, component: Component }) => (
                    <Route key={path} path={path} component={Component} />
                  ))}
                <Route component={NotFound} />
              </Switch>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
