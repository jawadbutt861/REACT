import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import './CategoryBreakdown.css'

const CategoryBreakdown = ({ timeRange = 'month' }) => {
  const expenses = useSelector((state) => state.form.formData)
  const [viewType, setViewType] = useState('pie') // 'pie' | 'bar'
  
  const categoryData = useMemo(() => {
    const categoryMap = new Map()
    
    expenses.forEach(expense => {
      const category = expense.category || 'Uncategorized'
      const amount = parseFloat(expense.amount || 0)
      
      if (categoryMap.has(category)) {
        const existing = categoryMap.get(category)
        categoryMap.set(category, {
          ...existing,
          amount: existing.amount + amount,
          count: existing.count + 1,
        })
      } else {
        categoryMap.set(category, {
          category,
          amount,
          count: 1,
        })
      }
    })
    
    const data = Array.from(categoryMap.values())
      .sort((a, b) => b.amount - a.amount)
      .map((item, index) => ({
        ...item,
        percentage: 0, // Will be calculated after we have total
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      }))
    
    const total = data.reduce((sum, item) => sum + item.amount, 0)
    
    return data.map(item => ({
      ...item,
      percentage: total > 0 ? (item.amount / total) * 100 : 0,
    }))
  }, [expenses])
  
  const totalAmount = useMemo(() => {
    return categoryData.reduce((sum, item) => sum + item.amount, 0)
  }, [categoryData])
  
  const topCategory = useMemo(() => {
    return categoryData.length > 0 ? categoryData[0] : null
  }, [categoryData])
  
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="category-tooltip">
          <div className="tooltip-header">
            <div 
              className="tooltip-color" 
              style={{ backgroundColor: data.color }}
            ></div>
            <span className="tooltip-category">{data.category}</span>
          </div>
          <div className="tooltip-details">
            <div className="tooltip-amount">
              <span className="tooltip-currency">PKR</span>
              <span className="tooltip-value">{data.amount.toFixed(2)}</span>
            </div>
            <div className="tooltip-meta">
              <span className="tooltip-percentage">{data.percentage.toFixed(1)}%</span>
              <span className="tooltip-count">{data.count} expense{data.count !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
  
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="category-tooltip">
          <div className="tooltip-header">
            <span className="tooltip-category">{label}</span>
          </div>
          <div className="tooltip-details">
            <div className="tooltip-amount">
              <span className="tooltip-currency">PKR</span>
              <span className="tooltip-value">{data.amount.toFixed(2)}</span>
            </div>
            <div className="tooltip-meta">
              <span className="tooltip-percentage">{data.percentage.toFixed(1)}%</span>
              <span className="tooltip-count">{data.count} expense{data.count !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null // Don't show labels for slices less than 5%
    
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  
  return (
    <div className="category-breakdown">
      <div className="category-breakdown__header">
        <h3 className="category-breakdown__title">Category Breakdown</h3>
        <div className="category-breakdown__controls">
          <div className="view-toggle">
            <button
              className={`view-toggle__btn ${viewType === 'pie' ? 'view-toggle__btn--active' : ''}`}
              onClick={() => setViewType('pie')}
              aria-label="Pie chart view"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </button>
            <button
              className={`view-toggle__btn ${viewType === 'bar' ? 'view-toggle__btn--active' : ''}`}
              onClick={() => setViewType('bar')}
              aria-label="Bar chart view"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="category-breakdown__stats">
        <div className="stat-item">
          <div className="stat-item__label">Total Categories</div>
          <div className="stat-item__value">{categoryData.length}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-item__label">Total Amount</div>
          <div className="stat-item__value">
            <span className="stat-item__currency">PKR</span>
            <span>{totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        {topCategory && (
          <div className="stat-item">
            <div className="stat-item__label">Top Category</div>
            <div className="stat-item__value">{topCategory.category}</div>
            <div className="stat-item__meta">
              {topCategory.percentage.toFixed(1)}% of total
            </div>
          </div>
        )}
      </div>
      
      <div className="category-breakdown__chart">
        {viewType === 'pie' ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="amount"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-primary)" />
              <XAxis 
                dataKey="category" 
                stroke="var(--color-text-tertiary)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="var(--color-text-tertiary)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value.toFixed(0)}`}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      
      <div className="category-breakdown__legend">
        {categoryData.slice(0, 6).map((item, index) => (
          <div key={item.category} className="legend-item">
            <div 
              className="legend-item__color" 
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="legend-item__details">
              <div className="legend-item__category">{item.category}</div>
              <div className="legend-item__amount">
                PKR {item.amount.toFixed(2)} ({item.percentage.toFixed(1)}%)
              </div>
            </div>
          </div>
        ))}
        {categoryData.length > 6 && (
          <div className="legend-item legend-item--more">
            <div className="legend-item__details">
              <div className="legend-item__category">
                +{categoryData.length - 6} more categories
              </div>
            </div>
          </div>
        )}
      </div>
      
      {categoryData.length === 0 && (
        <div className="category-breakdown__empty">
          <div className="empty-state">
            <div className="empty-state__icon">📊</div>
            <div className="empty-state__title">No category data</div>
            <div className="empty-state__description">
              Add some expenses to see category breakdown
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Color palette for categories
const CATEGORY_COLORS = [
  '#667eea', // Primary blue
  '#764ba2', // Secondary purple
  '#f093fb', // Pink
  '#f5576c', // Red
  '#4facfe', // Light blue
  '#43e97b', // Green
  '#fa709a', // Pink gradient
  '#fee140', // Yellow
  '#fa8072', // Salmon
  '#20bf6b', // Emerald
  '#a55eea', // Purple
  '#26de81', // Mint
  '#fd79a8', // Rose
  '#fdcb6e', // Orange
  '#6c5ce7', // Indigo
  '#fd79a8', // Pink
]

export default CategoryBreakdown