import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { format, subDays, startOfDay, endOfDay, isWithinInterval, parseISO } from 'date-fns'
import './SpendingOverview.css'

const SpendingOverview = ({ timeRange = 'month' }) => {
  const expenses = useSelector((state) => state.form.formData)
  
  const chartData = useMemo(() => {
    const now = new Date()
    let days = 30
    
    switch (timeRange) {
      case 'week':
        days = 7
        break
      case 'month':
        days = 30
        break
      case 'quarter':
        days = 90
        break
      case 'year':
        days = 365
        break
      default:
        days = 30
    }
    
    const startDate = subDays(now, days - 1)
    
    // Create array of dates
    const dateArray = []
    for (let i = 0; i < days; i++) {
      const date = subDays(now, days - 1 - i)
      dateArray.push({
        date: format(date, 'yyyy-MM-dd'),
        displayDate: format(date, days <= 7 ? 'EEE' : days <= 30 ? 'MMM dd' : 'MMM yyyy'),
        amount: 0,
        count: 0,
      })
    }
    
    // Aggregate expenses by date
    expenses.forEach(expense => {
      const expenseDate = parseISO(expense.date)
      const dateStr = format(expenseDate, 'yyyy-MM-dd')
      const dataPoint = dateArray.find(d => d.date === dateStr)
      
      if (dataPoint && isWithinInterval(expenseDate, { start: startOfDay(startDate), end: endOfDay(now) })) {
        dataPoint.amount += parseFloat(expense.amount || 0)
        dataPoint.count += 1
      }
    })
    
    return dateArray
  }, [expenses, timeRange])
  
  const totalSpent = useMemo(() => {
    return chartData.reduce((sum, day) => sum + day.amount, 0)
  }, [chartData])
  
  const averageDaily = useMemo(() => {
    const daysWithExpenses = chartData.filter(day => day.amount > 0).length
    return daysWithExpenses > 0 ? totalSpent / daysWithExpenses : 0
  }, [chartData, totalSpent])
  
  const highestDay = useMemo(() => {
    return chartData.reduce((max, day) => day.amount > max.amount ? day : max, { amount: 0, displayDate: '' })
  }, [chartData])
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="spending-tooltip">
          <p className="tooltip-label">{data.displayDate}</p>
          <p className="tooltip-amount">
            <span className="tooltip-currency">PKR</span>
            <span className="tooltip-value">{data.amount.toFixed(2)}</span>
          </p>
          <p className="tooltip-count">{data.count} expense{data.count !== 1 ? 's' : ''}</p>
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="spending-overview">
      <div className="spending-overview__header">
        <h3 className="spending-overview__title">Spending Overview</h3>
        <div className="spending-overview__period">{timeRange}</div>
      </div>
      
      <div className="spending-overview__stats">
        <div className="stat-card">
          <div className="stat-card__label">Total Spent</div>
          <div className="stat-card__value">
            <span className="stat-card__currency">PKR</span>
            <span className="stat-card__amount">{totalSpent.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card__label">Daily Average</div>
          <div className="stat-card__value">
            <span className="stat-card__currency">PKR</span>
            <span className="stat-card__amount">{averageDaily.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card__label">Highest Day</div>
          <div className="stat-card__value">
            <span className="stat-card__currency">PKR</span>
            <span className="stat-card__amount">{highestDay.amount.toFixed(2)}</span>
          </div>
          <div className="stat-card__meta">{highestDay.displayDate}</div>
        </div>
      </div>
      
      <div className="spending-overview__chart">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary-500)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary-500)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-primary)" />
            <XAxis 
              dataKey="displayDate" 
              stroke="var(--color-text-tertiary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="var(--color-text-tertiary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="var(--color-primary-500)"
              strokeWidth={2}
              fill="url(#spendingGradient)"
              dot={{ fill: 'var(--color-primary-500)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary-500)', strokeWidth: 2, fill: 'var(--color-background-primary)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {chartData.every(day => day.amount === 0) && (
        <div className="spending-overview__empty">
          <div className="empty-state">
            <div className="empty-state__icon">📊</div>
            <div className="empty-state__title">No spending data</div>
            <div className="empty-state__description">
              Add some expenses to see your spending trends
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpendingOverview