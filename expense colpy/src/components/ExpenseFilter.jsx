import { useState, useEffect } from 'react'

const ExpenseFilter = ({ onFilter }) => {
  const [filterData, setFilterData] = useState({
    category: 'all',
    date: '',
    sortBy: '',
    sortOrder: 'desc'
  })

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

  useEffect(() => {
    onFilter(filterData)
  }, [filterData, onFilter])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilterData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const clearFilters = () => {
    setFilterData({
      category: 'all',
      date: '',
      sortBy: '',
      sortOrder: 'desc'
    })
  }

  const hasActiveFilters = filterData.category !== 'all' || filterData.date || filterData.sortBy

  return (
    <div className="expense-filter-container">
      <h2>Filter & Sort</h2>
      
      <div className="filter-form">
        <div className="form-group">
          <label htmlFor="filter-category">Filter by Category</label>
          <select
            id="filter-category"
            name="category"
            value={filterData.category}
            onChange={handleChange}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="filter-date">Filter by Date</label>
          <input
            type="date"
            id="filter-date"
            name="date"
            value={filterData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="sort-by">Sort by</label>
          <select
            id="sort-by"
            name="sortBy"
            value={filterData.sortBy}
            onChange={handleChange}
          >
            <option value="">No Sorting</option>
            <option value="amount">Amount</option>
            <option value="date">Date</option>
          </select>
        </div>

        {filterData.sortBy && (
          <div className="form-group">
            <label htmlFor="sort-order">Sort Order</label>
            <select
              id="sort-order"
              name="sortOrder"
              value={filterData.sortOrder}
              onChange={handleChange}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        )}

        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="btn btn-secondary btn-small"
            type="button"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default ExpenseFilter