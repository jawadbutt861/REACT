import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { saveFormData } from '../config/redux/reducers/formSlice'
import { Button, Input } from '../design-system/index.js'

const Form = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 500))
      dispatch(saveFormData(data))
      reset()
      setMessage('Expense added successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Failed to add expense. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Icon components
  const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )

  const DollarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  )

  const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )

  const TagIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h6v6H4z"/>
      <path d="M14 4h6v6h-6z"/>
      <path d="M4 14h6v6H4z"/>
      <path d="M14 14h6v6h-6z"/>
    </svg>
  )

  const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )

  return (
    <section className="form-container">
      <h2 className="form-title">Add New Expense</h2>
      
      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      
      <form className="expense-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Expense Name"
          placeholder="Enter expense name"
          leftIcon={<UserIcon />}
          error={errors.name?.message}
          required
          {...register("name", {
            required: { value: true, message: "Expense name is required" }
          })}
        />

        <Input
          label="Amount"
          type="number"
          step="0.01"
          placeholder="Enter amount in PKR"
          leftIcon={<DollarIcon />}
          error={errors.amount?.message}
          required
          {...register("amount", {
            required: { value: true, message: "Amount is required" },
            min: { value: 0.01, message: "Amount must be greater than 0" }
          })}
        />

        <Input
          label="Date"
          type="date"
          leftIcon={<CalendarIcon />}
          error={errors.date?.message}
          required
          {...register("date", {
            required: { value: true, message: "Date is required" }
          })}
        />

        <Input
          label="Category"
          placeholder="e.g., Food, Transport, Entertainment"
          leftIcon={<TagIcon />}
          error={errors.category?.message}
          required
          {...register("category", {
            required: { value: true, message: "Category is required" }
          })}
        />

        <Button 
          type="submit" 
          size="lg" 
          fullWidth 
          loading={isSubmitting}
          leftIcon={!isSubmitting ? <PlusIcon /> : null}
        >
          {isSubmitting ? 'Adding Expense...' : 'Add Expense'}
        </Button>
      </form>
    </section>
  )
}

export default Form