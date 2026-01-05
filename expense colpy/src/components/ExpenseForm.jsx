import { useState, useEffect, useMemo } from 'react'

const ExpenseForm = ({ onSubmit, editingExpense, onCancelEdit, showMessage }) => {
  // Initialize form data based on editingExpense
  const initialFormData = useMemo(() => {
    if (editingExpense) {
      return {
        name: editingExpense.name,
        amount: editingExpense.amount.toString(),
        date: editingExpense.date,
        category: editingExpense.category
      }
    }
    return {
      name: '',
      amount: '',
      date: '',
      category: ''
    }
  }, [editingExpense])

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  // Update form data when editingExpense changes
  useEffect(() => {
    setFormData(initialFormData)
  }, [initialFormData])

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Other'
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Expense name is required'
    }

    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required'
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than zero'
    } else if (isNaN(parseFloat(formData.amount))) {
      newErrors.amount = 'Amount must be a valid number'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
      if (!editingExpense) {
        setFormData({
          name: '',
          amount: '',
          date: '',
          category: ''
        })
      }
      setErrors({})
    } else {
      showMessage('Please fix the errors in the form', 'error')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleCancel = () => {
    onCancelEdit()
    setFormData({
      name: '',
      amount: '',
      date: '',
      category: ''
    })
    setErrors({})
  }

  return (
    <div className="expense-form-container">
      <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
      
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="name">Expense Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter expense name"
            className={errors.name ? 'error' : ''}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <span id="name-error" className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            step="0.01"
            min="0.01"
            className={errors.amount ? 'error' : ''}
            aria-describedby={errors.amount ? 'amount-error' : undefined}
          />
          {errors.amount && <span id="amount-error" className="error-message">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? 'error' : ''}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && <span id="date-error" className="error-message">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? 'error' : ''}
            aria-describedby={errors.category ? 'category-error' : undefined}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <span id="category-error" className="error-message">{errors.category}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
          {editingExpense && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ExpenseForm