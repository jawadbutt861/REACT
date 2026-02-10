import { createSlice } from '@reduxjs/toolkit'

// Load data from localStorage
const loadFromStorage = () => {
  try {
    const savedExpenses = localStorage.getItem('expenses')
    return savedExpenses ? JSON.parse(savedExpenses) : []
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return []
  }
}

// Save data to localStorage
const saveToStorage = (expenses) => {
  try {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

const initialState = {
  formData: loadFromStorage()
}

export const formSlice = createSlice({
    name : 'form',
    initialState,
    reducers : {
        saveFormData : (state,action) =>{
            state.formData.push(action.payload)
            saveToStorage(state.formData) // Save to localStorage
        },
        deleteExpense :(state,action)=>{
            state.formData.splice(action.payload,1)
            saveToStorage(state.formData) // Save to localStorage
        },
        editExpense: (state, action) => {
            const { index, updatedData } = action.payload
            state.formData[index] = updatedData
            saveToStorage(state.formData) // Save to localStorage
        },
        clearAllExpenses: (state) => {
            state.formData = []
            saveToStorage(state.formData) // Save to localStorage
        }
    }
})

export const { saveFormData, deleteExpense, editExpense, clearAllExpenses } = formSlice.actions

export const selectTotalExpense = (state) => {
    return state.form.formData.reduce((acc, expense) => {
        return acc + parseFloat(expense.amount || 0)
    }, 0)
}

export default formSlice.reducer