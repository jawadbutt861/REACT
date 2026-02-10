import { configureStore } from '@reduxjs/toolkit'
import formReducer from '../reducers/formSlice'
import uiReducer from '../slices/uiSlice'
import settingsReducer, { settingsMiddleware } from '../slices/settingsSlice'
import { expenseApi } from '../api/expenseApi'

export const store = configureStore({
  reducer: {
    form: formReducer,
    ui: uiReducer,
    settings: settingsReducer,
    [expenseApi.reducerPath]: expenseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [expenseApi.util.resetApiState.type],
      },
    })
    .concat(expenseApi.middleware)
    .concat(settingsMiddleware),
})