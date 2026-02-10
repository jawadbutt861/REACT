import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

// Mock API for local storage operations
export const expenseApi = createApi({
  reducerPath: 'expenseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Expense', 'Budget', 'Wallet', 'Category'],
  endpoints: (builder) => ({
    // Expense endpoints
    getExpenses: builder.query({
      queryFn: () => {
        try {
          const expenses = JSON.parse(localStorage.getItem('expenses') || '[]')
          return { data: expenses }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: error.message } }
        }
      },
      providesTags: ['Expense'],
    }),
    
    addExpense: builder.mutation({
      queryFn: (expense) => {
        try {
          const expenses = JSON.parse(localStorage.getItem('expenses') || '[]')
          const newExpense = {
            ...expense,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          expenses.push(newExpense)
          localStorage.setItem('expenses', JSON.stringify(expenses))
          return { data: newExpense }
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      invalidatesTags: ['Expense'],
    }),
    
    updateExpense: builder.mutation({
      queryFn: ({ id, ...updates }) => {
        try {
          const expenses = JSON.parse(localStorage.getItem('expenses') || '[]')
          const index = expenses.findIndex(expense => expense.id === id)
          if (index === -1) {
            return { error: { status: 'NOT_FOUND', error: 'Expense not found' } }
          }
          expenses[index] = {
            ...expenses[index],
            ...updates,
            updatedAt: new Date().toISOString(),
          }
          localStorage.setItem('expenses', JSON.stringify(expenses))
          return { data: expenses[index] }
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      invalidatesTags: ['Expense'],
    }),
    
    deleteExpense: builder.mutation({
      queryFn: (id) => {
        try {
          const expenses = JSON.parse(localStorage.getItem('expenses') || '[]')
          const filteredExpenses = expenses.filter(expense => expense.id !== id)
          localStorage.setItem('expenses', JSON.stringify(filteredExpenses))
          return { data: { id } }
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      invalidatesTags: ['Expense'],
    }),
    
    bulkDeleteExpenses: builder.mutation({
      queryFn: (ids) => {
        try {
          const expenses = JSON.parse(localStorage.getItem('expenses') || '[]')
          const filteredExpenses = expenses.filter(expense => !ids.includes(expense.id))
          localStorage.setItem('expenses', JSON.stringify(filteredExpenses))
          return { data: { deletedIds: ids } }
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      invalidatesTags: ['Expense'],
    }),
    
    // Budget endpoints
    getBudgets: builder.query({
      queryFn: () => {
        try {
          const budgets = JSON.parse(localStorage.getItem('budgets') || '[]')
          return { data: budgets }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: error.message } }
        }
      },
      providesTags: ['Budget'],
    }),
    
    addBudget: builder.mutation({
      queryFn: (budget) => {
        try {
          const budgets = JSON.parse(localStorage.getItem('budgets') || '[]')
          const newBudget = {
            ...budget,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          budgets.push(newBudget)
          localStorage.setItem('budgets', JSON.stringify(budgets))
          return { data: newBudget }
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      invalidatesTags: ['Budget'],
    }),
    
    updateBudget: builder.mutation({
      queryFn: ({ id, ...updates }) => {
        try {
          const budgets = JSON.parse(localStorage.getItem('budgets') || '[]')
          const index = budgets.findIndex(budget => budget.id === id)
          if (index === -1) {
            return { error: { status: 'NOT_FOUND', error: 'Budget not found' } }
          }
          budgets[index] = {
            ...budgets[index],
            ...updates,
            updatedAt: new Date().toISOString(),
          }
          localStorage.setItem('budgets', JSON.stringify(budgets))
          return { data: budgets[index] }
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      invalidatesTags: ['Budget'],
    }),
    
    deleteBudget: builder.mutation({
      queryFn: (id) => {
        try {
          const budgets = JSON.parse(localStorage.getItem('budgets') || '[]')
          const filteredBudgets = budgets.filter(budget => budget.id !== id)
          localStorage.setItem('budgets', JSON.stringify(filteredBudgets))
          return { data: { id } }
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      invalidatesTags: ['Budget'],
    }),
    
    // Wallet endpoints
    getWallets: builder.query({
      queryFn: () => {
        try {
          const wallets = JSON.parse(localStorage.getItem('wallets') || '[]')
          // Ensure default wallet exists
          if (wallets.length === 0) {
            const defaultWallet = {
              id: 'default',
              name: 'Main Wallet',
              balance: 0,
              currency: 'PKR',
              isDefault: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
            wallets.push(defaultWallet)
            localStorage.setItem('wallets', JSON.stringify(wallets))
          }
          return { data: wallets }
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: error.message } }
        }
      },
      providesTags: ['Wallet'],
    }),
    
    addWallet: builder.mutation({
      queryFn: (wallet) => {
        try {
          const wallets = JSON.parse(localStorage.getItem('wallets') || '[]')
          const newWallet = {
            ...wallet,
            id: Date.now().toString(),
            balance: wallet.balance || 0,
            currency: wallet.currency || 'PKR',
            isDefault: wallet.isDefault || false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          wallets.push(newWallet)
          localStorage.setItem('wallets', JSON.stringify(wallets))
          return { data: newWallet }
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      invalidatesTags: ['Wallet'],
    }),
    
    updateWallet: builder.mutation({
      queryFn: ({ id, ...updates }) => {
        try {
          const wallets = JSON.parse(localStorage.getItem('wallets') || '[]')
          const index = wallets.findIndex(wallet => wallet.id === id)
          if (index === -1) {
            return { error: { status: 'NOT_FOUND', error: 'Wallet not found' } }
          }
          wallets[index] = {
            ...wallets[index],
            ...updates,
            updatedAt: new Date().toISOString(),
          }
          localStorage.setItem('wallets', JSON.stringify(wallets))
          return { data: wallets[index] }
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      invalidatesTags: ['Wallet'],
    }),
    
    deleteWallet: builder.mutation({
      queryFn: (id) => {
        try {
          const wallets = JSON.parse(localStorage.getItem('wallets') || '[]')
          const wallet = wallets.find(w => w.id === id)
          if (wallet?.isDefault) {
            return { error: { status: 'CUSTOM_ERROR', error: 'Cannot delete default wallet' } }
          }
          const filteredWallets = wallets.filter(wallet => wallet.id !== id)
          localStorage.setItem('wallets', JSON.stringify(filteredWallets))
          return { data: { id } }
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      invalidatesTags: ['Wallet'],
    }),
  }),
})

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useBulkDeleteExpensesMutation,
  useGetBudgetsQuery,
  useAddBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
  useGetWalletsQuery,
  useAddWalletMutation,
  useUpdateWalletMutation,
  useDeleteWalletMutation,
} = expenseApi