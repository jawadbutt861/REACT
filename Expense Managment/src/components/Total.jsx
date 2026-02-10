import React from 'react'
import { useSelector } from 'react-redux'
import { selectTotalExpense } from '../config/redux/reducers/formSlice'

const Total = () => {
  const total = useSelector(selectTotalExpense)
  const expenseCount = useSelector((state) => state.form.formData.length)
  
  return (
    <section className="total-container">
      <div>
        <h2 className="total-title">Total Expenses</h2>
        <p className="total-amount">PKR {total.toFixed(2)}</p>
        <p style={{opacity: 0.8, fontSize: '1.1rem', marginTop: '10px'}}>
          {expenseCount} {expenseCount === 1 ? 'expense' : 'expenses'} recorded
        </p>
      </div>
    </section>
  )
}

export default Total
