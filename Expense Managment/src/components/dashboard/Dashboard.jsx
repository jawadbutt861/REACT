import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SpendingOverview from './SpendingOverview'
import CategoryBreakdown from './CategoryBreakdown'
import './Dashboard.css'

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('month')
  const expenses = useSelector((state) => state.form.formData)
  
  const totalExpenses = expenses.length
  const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0)
  const uniqueCategories = new Set(expenses.map(expense => expense.category)).size
  
  const timeRangeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
  ]
  
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div className="dashboard__title-section">
          <h2 className="dashboard__title">Dashboard</h2>
          <p className="dashboard__subtitle">Overview of your expenses and spending patterns</p>
        </div>
        
        <div className="dashboard__controls">
          <div className="time-range-selector">
            <label htmlFor="timeRange" className="time-range-selector__label">
              Time Range:
            </label>
            <select
              id="timeRange"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-range-selector__select"
            >
              {timeRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="dashboard__summary">
        <div className="summary-card">
          <div className="summary-card__icon">💰</div>
          <div className="summary-card__content">
            <div className="summary-card__value">PKR {totalAmount.toFixed(2)}</div>
            <div className="summary-card__label">Total Spent</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-card__icon">📊</div>
          <div className="summary-card__content">
            <div className="summary-card__value">{totalExpenses}</div>
            <div className="summary-card__label">Total Expenses</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-card__icon">🏷️</div>
          <div className="summary-card__content">
            <div className="summary-card__value">{uniqueCategories}</div>
            <div className="summary-card__label">Categories</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-card__icon">📈</div>
          <div className="summary-card__content">
            <div className="summary-card__value">
              PKR {totalExpenses > 0 ? (totalAmount / totalExpenses).toFixed(2) : '0.00'}
            </div>
            <div className="summary-card__label">Avg per Expense</div>
          </div>
        </div>
      </div>
      
      <div className="dashboard__charts">
        <div className="dashboard__chart-section">
          <SpendingOverview timeRange={timeRange} />
        </div>
        
        <div className="dashboard__chart-section">
          <CategoryBreakdown timeRange={timeRange} />
        </div>
      </div>
      
      {totalExpenses === 0 && (
        <div className="dashboard__empty">
          <div className="empty-dashboard">
            <div className="empty-dashboard__icon">📊</div>
            <div className="empty-dashboard__title">Welcome to your Dashboard!</div>
            <div className="empty-dashboard__description">
              Start by adding some expenses to see your spending analytics and insights.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard