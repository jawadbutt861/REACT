const ExpenseList = ({ expenses, onDelete, onEdit, onClearAll }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (expenses.length === 0) {
    return (
      <div className="expense-list-container">
        <div className="expense-list-header">
          <h2>Expense List</h2>
        </div>
        <div className="no-expenses">
          <p>No expenses found</p>
          <p>Add your first expense to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="expense-list-container">
      <div className="expense-list-header">
        <h2>Expense List ({expenses.length} items)</h2>
        <button 
          onClick={onClearAll}
          className="btn btn-danger btn-small"
          aria-label="Clear all expenses"
        >
          Clear All
        </button>
      </div>

      <div className="expense-list">
        {expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-info">
              <div className="expense-name">
                <h3>{expense.name}</h3>
                <span className="expense-category">{expense.category}</span>
              </div>
              <div className="expense-details">
                <div className="expense-amount">
                  {formatCurrency(expense.amount)}
                </div>
                <div className="expense-date">
                  {formatDate(expense.date)}
                </div>
              </div>
            </div>
            
            <div className="expense-actions">
              <button
                onClick={() => onEdit(expense)}
                className="btn btn-secondary btn-small"
                aria-label={`Edit ${expense.name} expense`}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(expense.id)}
                className="btn btn-danger btn-small"
                aria-label={`Delete ${expense.name} expense`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExpenseList