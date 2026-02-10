import Display from './components/Display'
import Form from './components/Form'
import Total from './components/Total'
import './index.css'

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Expense Management System</h1>
        <p className="app-subtitle">Track, manage, and analyze your expenses efficiently</p>
      </header>
      
      <main role="main">
        <Form />
        <Display />
        <Total />
      </main>
    </div>
  )
}

export default App