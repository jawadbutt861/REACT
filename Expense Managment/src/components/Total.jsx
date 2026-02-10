import { useSelector } from 'react-redux'
import { selectTotalExpense } from '../config/redux/reducers/formSlice'

const Total = () => {
  const total = useSelector(selectTotalExpense)
  const expenseCount = useSelector((state) => state.form.formData.length)
  
  return (
    <section className="total-container" aria-labelledby="total-title">
      <div>
        <h2 id="total-title" className="total-title">Total Expenses</h2>
        <p className="total-amount" aria-label={`Total amount: ${total.toFixed(2)} Pakistani Rupees`}>
          PKR {total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p style={{opacity: 0.8, fontSize: '1.1rem', marginTop: '10px'}} aria-live="polite">
          {expenseCount} {expenseCount === 1 ? 'expense' : 'expenses'} recorded
        </p>
      </div>
    </section>
  )
}

export default Total
