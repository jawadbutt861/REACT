const ExpenseStats = ({ expenses }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const expenseCount = expenses.length

  const getCategoryStats = () => {
    const categoryTotals = {}
    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount
    })
    
    return Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3) // Top 3 categories
  }

  const categoryStats = getCategoryStats()
  const averageExpense = expenseCount > 0 ? totalExpenses / expenseCount : 0

  return (
    <div className="expense-stats-container">
      <h2>Expense Summary</h2>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value">{formatCurrency(totalExpenses)}</div>
        </div>

        <div className="stat-card count">
          <div className="stat-label">Number of Expenses</div>
          <div className="stat-value">{expenseCount}</div>
        </div>

        <div className="stat-card average">
          <div className="stat-label">Average Expense</div>
          <div className="stat-value">{formatCurrency(averageExpense)}</div>
        </div>
      </div>

      {categoryStats.length > 0 && (
        <div className="category-breakdown">
          <h3>Top Categories</h3>
          <div className="category-list">
            {categoryStats.map(([category, amount]) => (
              <div key={category} className="category-item">
                <span className="category-name">{category}</span>
                <span className="category-amount">{formatCurrency(amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ExpenseStats