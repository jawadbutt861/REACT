import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteExpense, editExpense, clearAllExpenses } from '../config/redux/reducers/formSlice'

const Display = () => {
  const data = useSelector((state)=>state.form.formData)
  const dispatch = useDispatch()
  const [editingIndex, setEditingIndex] = useState(null)
  const [editForm, setEditForm] = useState({})
  
  // Filter states
  const [filterCategory, setFilterCategory] = useState('')
  const [filterDate, setFilterDate] = useState('')
  
  // Sort states
  const [sortBy, setSortBy] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  
  // Message state for user feedback
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'

  const handleRemove = (index)=>{
    // Find original index in data array
    const originalIndex = data.findIndex(expense => 
      expense.name === sortedData[index].name && 
      expense.amount === sortedData[index].amount && 
      expense.date === sortedData[index].date
    )
    dispatch(deleteExpense(originalIndex))
    showMessage('Expense deleted successfully!', 'success')
  }

  const handleEdit = (index) => {
    setEditingIndex(index)
    setEditForm(sortedData[index]) // Current data load karo form me
  }

  const handleSaveEdit = (index) => {
    // Validation
    if (!editForm.name || !editForm.amount || !editForm.date || !editForm.category) {
      showMessage('All fields are required!', 'error')
      return
    }
    
    if (parseFloat(editForm.amount) <= 0) {
      showMessage('Amount must be greater than 0!', 'error')
      return
    }
    
    // Find original index in data array
    const originalIndex = data.findIndex(expense => 
      expense.name === sortedData[index].name && 
      expense.amount === sortedData[index].amount && 
      expense.date === sortedData[index].date
    )
    dispatch(editExpense({ index: originalIndex, updatedData: editForm }))
    setEditingIndex(null) // Edit mode band karo
    showMessage('Expense updated successfully!', 'success')
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditForm({})
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all expenses? This action cannot be undone.')) {
      dispatch(clearAllExpenses())
      // Reset filters and sort
      setFilterCategory('')
      setFilterDate('')
      setSortBy('')
      showMessage('All expenses cleared successfully!', 'success')
    }
  }

  // Show message function
  const showMessage = (msg, type) => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, 3000)
  }

  // Filter functionality
  const filteredData = data.filter(expense => {
    const categoryMatch = !filterCategory || expense.category.toLowerCase().includes(filterCategory.toLowerCase())
    const dateMatch = !filterDate || expense.date === filterDate
    return categoryMatch && dateMatch
  })

  // Sort functionality
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortBy) return 0
    
    let aValue, bValue
    
    if (sortBy === 'amount') {
      aValue = parseFloat(a.amount)
      bValue = parseFloat(b.amount)
    } else if (sortBy === 'date') {
      aValue = new Date(a.date)
      bValue = new Date(b.date)
    } else if (sortBy === 'name') {
      aValue = a.name.toLowerCase()
      bValue = b.name.toLowerCase()
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Get unique categories for dropdown
  const uniqueCategories = [...new Set(data.map(expense => expense.category))]

  return (
    <>
    {/* Message Display */}
    {message && (
      <div className={`message ${messageType}`}>
        {message}
      </div>
    )}
    
    {/* Filter Section */}
    <section className="filter-section" aria-labelledby="filter-title">
      <h3 id="filter-title" className="filter-title">Filter & Sort Expenses</h3>
      
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="category-filter" className="form-label">Filter by Category</label>
          <select 
            id="category-filter"
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
            aria-describedby="category-filter-help"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
         
        </div>
        
        <div className="filter-group">
          <label htmlFor="date-filter" className="form-label">Filter by Date</label>
          <input 
            id="date-filter"
            type="date" 
            value={filterDate} 
            onChange={(e) => setFilterDate(e.target.value)}
            className="filter-input"
            aria-describedby="date-filter-help"
          />
         
        </div>
        
        <div className="filter-group">
          <label htmlFor="sort-by" className="form-label">Sort by</label>
          <select 
            id="sort-by"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
            aria-describedby="sort-by-help"
          >
            <option value="">No Sorting</option>
            <option value="amount">Amount</option>
            <option value="date">Date</option>
            <option value="name">Name</option>
          </select>
          
        </div>
        
        <div className="filter-group">
          <label htmlFor="sort-order" className="form-label">Order</label>
          <select 
            id="sort-order"
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className="filter-select"
            aria-describedby="sort-order-help"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          
        </div>
      </div>
      
      <div className="filter-actions">
        <button 
          onClick={() => {setFilterCategory(''); setFilterDate(''); setSortBy('')}}
          className="btn btn-clear"
          aria-describedby="clear-filters-help"
        >
          Clear All Filters
        </button>
       
        
        {data.length > 0 && (
          <>
            <button 
              onClick={handleClearAll}
              className="btn btn-danger"
              aria-describedby="clear-all-help"
            >
              Clear All Expenses
            </button>
           
          </>
        )}
        
        
      </div>
    </section>

    {/* Expenses List */}
    <section className="expenses-container" aria-labelledby="expenses-title">
      <h3 id="expenses-title" className="sr-only">Your Expenses</h3>
      {sortedData.length === 0 ? (
        <div className="no-expenses" role="status" aria-live="polite">
          <h2 className="no-expenses-title">No Expenses Found</h2>
          <p className="no-expenses-subtitle">
            {data.length === 0 
              ? "Start by adding your first expense above" 
              : "Try adjusting your filters to see more results"
            }
          </p>
        </div>
      ) : (
        <div className="expenses-grid" role="list" aria-label="Expense list">
          {sortedData.map((item, index) => (
            <article key={index} className="expense-card" role="listitem">
              {editingIndex === index ? (
                // Edit Mode
                <div role="form" aria-labelledby={`edit-title-${index}`}>
                  <h4 id={`edit-title-${index}`} className="sr-only">Edit expense: {item.name}</h4>
                  <div className="edit-form">
                    <div className="form-group">
                      <label htmlFor={`edit-name-${index}`} className="form-label">Name</label>
                      <input 
                        id={`edit-name-${index}`}
                        value={editForm.name || ''} 
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="edit-input"
                        placeholder="Expense name"
                        aria-required="true"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor={`edit-amount-${index}`} className="form-label">Amount</label>
                      <input 
                        id={`edit-amount-${index}`}
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={editForm.amount || ''} 
                        onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                        className="edit-input"
                        placeholder="Amount"
                        aria-required="true"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor={`edit-date-${index}`} className="form-label">Date</label>
                      <input 
                        id={`edit-date-${index}`}
                        type="date"
                        value={editForm.date || ''} 
                        onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                        className="edit-input"
                        aria-required="true"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor={`edit-category-${index}`} className="form-label">Category</label>
                      <input 
                        id={`edit-category-${index}`}
                        value={editForm.category || ''} 
                        onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                        className="edit-input"
                        placeholder="Category"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  
                  <div className="expense-actions">
                    <button 
                      onClick={() => handleSaveEdit(index)} 
                      className="btn btn-save"
                      aria-describedby={`save-help-${index}`}
                    >
                      Save Changes
                    </button>
                    <div id={`save-help-${index}`} className="sr-only">
                      
                    </div>
                    <button 
                      onClick={handleCancelEdit} 
                      className="btn btn-cancel"
                      aria-describedby={`cancel-help-${index}`}
                    >
                      Cancel
                    </button>
                    <div id={`cancel-help-${index}`} className="sr-only">
                      
                    </div>
                  </div>
                </div>
              ) : (
                // Display Mode
                <>
                  <header className="expense-header">
                    <h3 className="expense-name">{item.name}</h3>
                    <span className="expense-amount" aria-label={`Amount: ${parseFloat(item.amount).toFixed(2)} Pakistani Rupees`}>
                      PKR {parseFloat(item.amount).toFixed(2)}
                    </span>
                  </header>
                  
                  <div className="expense-details">
                    <div className="expense-detail">
                      <span className="detail-label">Date</span>
                      <span className="detail-value">
                        <time dateTime={item.date}>
                          {new Date(item.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </span>
                    </div>
                    
                    <div className="expense-detail">
                      <span className="detail-label">Category</span>
                      <span className="detail-value">{item.category}</span>
                    </div>
                  </div>
                  
                  <div className="expense-actions">
                    <button 
                      onClick={() => handleEdit(index)} 
                      className="btn btn-edit"
                      aria-label={`Edit expense: ${item.name}`}
                      aria-describedby={`edit-help-${index}`}
                    >
                      Edit
                    </button>
                    
                    <button 
                      onClick={() => handleRemove(index)} 
                      className="btn btn-delete"
                      aria-label={`Delete expense: ${item.name}`}
                      aria-describedby={`delete-help-${index}`}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
    </>
  )
}

export default Display