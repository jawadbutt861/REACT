import React, { useState } from 'react'
import Display from './components/Display'
import Form from './components/Form'
import Total from './components/Total'
import Dashboard from './components/dashboard/Dashboard'
import { ThemeToggle } from './design-system/index.js'
import './index.css'

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'expenses', label: 'Expenses', icon: '💰' },
    { id: 'add', label: 'Add Expense', icon: '➕' },
  ]
  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'expenses':
        return (
          <>
            <Display />
            <Total />
          </>
        )
      case 'add':
        return <Form />
      default:
        return <Dashboard />
    }
  }
  
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-content">
          <div className="app-header-text">
            <h1 className="app-title">Expense Management System</h1>
            <p className="app-subtitle">Track, manage, and analyze your expenses efficiently</p>
          </div>
          <div className="app-header-controls">
            <ThemeToggle size="sm" />
          </div>
        </div>
      </header>
      
      <nav className="app-navigation">
        <div className="nav-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'nav-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="nav-tab__icon">{tab.icon}</span>
              <span className="nav-tab__label">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      <main className="app-main">
        {renderContent()}
      </main>
    </div>
  )
}

export default App