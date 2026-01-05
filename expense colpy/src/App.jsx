import { useState, useEffect } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseFilter from './components/ExpenseFilter'
import ExpenseStats from './components/ExpenseStats'
import Message from './components/Message'

function App() {
  const [expenses, setExpenses] = useState([])
  const [filteredExpenses, setFilteredExpenses] = useState([])
  const [message, setMessage] = useState({ text: '', type: '' })
  const [editingExpense, setEditingExpense] = useState(null)

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses')
    if (savedExpenses) {
      const parsedExpenses = JSON.parse(savedExpenses)
      setExpenses(parsedExpenses)
      setFilteredExpenses(parsedExpenses)
    }
  }, [])

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
    setFilteredExpenses(expenses)
  }, [expenses])

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: '', type: '' }), 3000)
  }

  const addExpense = (expenseData) => {
    const newExpense = {
      id: Date.now(),
      ...expenseData,
      amount: parseFloat(expenseData.amount)
    }
    setExpenses(prev => [...prev, newExpense])
    showMessage('Expense added successfully!', 'success')
  }

  const updateExpense = (expenseData) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === editingExpense.id
        ? { ...expense, ...expenseData, amount: parseFloat(expenseData.amount) }
        : expense
    )
    setExpenses(updatedExpenses)
    setEditingExpense(null)
    showMessage('Expense updated successfully!', 'success')
  }

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id))
    showMessage('Expense deleted successfully!', 'success')
  }

  const clearAllExpenses = () => {
    if (window.confirm('Are you sure you want to delete all expenses? This action cannot be undone.')) {
      setExpenses([])
      showMessage('All expenses cleared!', 'success')
    }
  }

  const handleFilter = (filterData) => {
    let filtered = [...expenses]

    if (filterData.category && filterData.category !== 'all') {
      filtered = filtered.filter(expense => expense.category === filterData.category)
    }

    if (filterData.date) {
      filtered = filtered.filter(expense => expense.date === filterData.date)
    }

    if (filterData.sortBy) {
      filtered.sort((a, b) => {
        if (filterData.sortBy === 'amount') {
          return filterData.sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount
        } else if (filterData.sortBy === 'date') {
          return filterData.sortOrder === 'asc' 
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date)
        }
        return 0
      })
    }

    setFilteredExpenses(filtered)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Expense Management System</h1>
      </header>

      <main className="app-main">
        {message.text && <Message message={message.text} type={message.type} />}
        
        <div className="app-content">
          <div className="left-section">
            <ExpenseForm 
              onSubmit={editingExpense ? updateExpense : addExpense}
              editingExpense={editingExpense}
              onCancelEdit={() => setEditingExpense(null)}
              showMessage={showMessage}
            />
            
            <ExpenseFilter 
              onFilter={handleFilter}
            />
          </div>

          <div className="right-section">
            <ExpenseStats expenses={filteredExpenses} />
            
            <ExpenseList 
              expenses={filteredExpenses}
              onDelete={deleteExpense}
              onEdit={setEditingExpense}
              onClearAll={clearAllExpenses}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App