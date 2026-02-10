import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { saveFormData } from '../config/redux/reducers/formSlice'

const Form = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    dispatch(saveFormData(data))
    reset()
    setMessage('Expense added successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <section className="form-container" aria-labelledby="form-title">
      <h2 id="form-title" className="form-title">Add New Expense</h2>
      
      {message && (
        <div className="message success" role="alert" aria-live="polite">
          {message}
        </div>
      )}
      
      <form className="expense-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label htmlFor="expense-name" className="form-label">Expense Name</label>
          <input 
            id="expense-name"
            type="text" 
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder='Enter expense name' 
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={errors.name ? 'true' : 'false'}
            {...register("name", {
              required: { value: true, message: "Expense name is required" },
              minLength: { value: 2, message: "Name must be at least 2 characters" },
              maxLength: { value: 50, message: "Name must be less than 50 characters" }
            })}
          />
          {errors.name && (
            <span id="name-error" className="error-message" role="alert">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="expense-amount" className="form-label">Amount (PKR)</label>
          <input 
            id="expense-amount"
            type="number" 
            step="0.01"
            min="0.01"
            className={`form-input ${errors.amount ? 'error' : ''}`}
            placeholder='Enter amount in PKR' 
            aria-describedby={errors.amount ? 'amount-error' : undefined}
            aria-invalid={errors.amount ? 'true' : 'false'}
            {...register("amount", {
              required: { value: true, message: "Amount is required" },
              min: { value: 0.01, message: "Amount must be greater than 0" },
              max: { value: 1000000, message: "Amount must be less than 1,000,000" }
            })}
          />
          {errors.amount && (
            <span id="amount-error" className="error-message" role="alert">
              {errors.amount.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="expense-date" className="form-label">Date</label>
          <input 
            id="expense-date"
            type="date" 
            className={`form-input ${errors.date ? 'error' : ''}`}
            max={new Date().toISOString().split('T')[0]}
            aria-describedby={errors.date ? 'date-error' : undefined}
            aria-invalid={errors.date ? 'true' : 'false'}
            {...register("date", {
              required: { value: true, message: "Date is required" },
              validate: {
                notFuture: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(23, 59, 59, 999);
                  return selectedDate <= today || "Date cannot be in the future";
                }
              }
            })}
          />
          {errors.date && (
            <span id="date-error" className="error-message" role="alert">
              {errors.date.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="expense-category" className="form-label">Category</label>
          <input 
            id="expense-category"
            type="text" 
            className={`form-input ${errors.category ? 'error' : ''}`}
            placeholder='e.g., Food, Transport, Entertainment' 
            list="category-suggestions"
            aria-describedby={errors.category ? 'category-error' : undefined}
            aria-invalid={errors.category ? 'true' : 'false'}
            {...register("category", {
              required: { value: true, message: "Category is required" },
              minLength: { value: 2, message: "Category must be at least 2 characters" },
              maxLength: { value: 30, message: "Category must be less than 30 characters" }
            })}
          />
          <datalist id="category-suggestions">
            <option value="Food & Dining" />
            <option value="Transportation" />
            <option value="Entertainment" />
            <option value="Shopping" />
            <option value="Bills & Utilities" />
            <option value="Healthcare" />
            <option value="Education" />
            <option value="Travel" />
            <option value="Personal Care" />
            <option value="Other" />
          </datalist>
          {errors.category && (
            <span id="category-error" className="error-message" role="alert">
              {errors.category.message}
            </span>
          )}
        </div>

        <button type='submit' className="submit-btn" aria-describedby="submit-help">
          <span>Add Expense</span>
        </button>
        
      </form>
    </section>
  )
}

export default Form