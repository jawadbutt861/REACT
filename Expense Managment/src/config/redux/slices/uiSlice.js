import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Loading states
  isLoading: false,
  loadingMessage: '',
  
  // Modal states
  modals: {
    addExpense: false,
    editExpense: false,
    deleteConfirm: false,
    bulkActions: false,
    budgetSettings: false,
    walletSettings: false,
    exportData: false,
    importData: false,
  },
  
  // Selected items for bulk operations
  selectedExpenses: [],
  
  // Current editing item
  editingItem: null,
  
  // Filters and search
  filters: {
    category: '',
    dateRange: {
      start: '',
      end: '',
    },
    amountRange: {
      min: '',
      max: '',
    },
    wallet: '',
    searchQuery: '',
  },
  
  // Sorting
  sort: {
    field: 'date',
    direction: 'desc',
  },
  
  // View preferences
  view: {
    layout: 'grid', // 'grid' | 'list' | 'table'
    itemsPerPage: 20,
    showFilters: false,
    showBulkActions: false,
  },
  
  // Notifications
  notifications: [],
  
  // Sidebar state
  sidebar: {
    isOpen: false,
    activeSection: 'dashboard',
  },
  
  // Dashboard preferences
  dashboard: {
    widgets: {
      spendingOverview: { visible: true, order: 1 },
      categoryBreakdown: { visible: true, order: 2 },
      budgetTracker: { visible: true, order: 3 },
      recentExpenses: { visible: true, order: 4 },
    },
    timeRange: 'month', // 'week' | 'month' | 'quarter' | 'year'
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Loading actions
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading
      state.loadingMessage = action.payload.message || ''
    },
    
    // Modal actions
    openModal: (state, action) => {
      const { modal, data } = action.payload
      state.modals[modal] = true
      if (data) {
        state.editingItem = data
      }
    },
    
    closeModal: (state, action) => {
      const modal = action.payload
      state.modals[modal] = false
      if (modal === 'editExpense' || modal === 'addExpense') {
        state.editingItem = null
      }
    },
    
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modal => {
        state.modals[modal] = false
      })
      state.editingItem = null
    },
    
    // Selection actions
    toggleExpenseSelection: (state, action) => {
      const expenseId = action.payload
      const index = state.selectedExpenses.indexOf(expenseId)
      if (index > -1) {
        state.selectedExpenses.splice(index, 1)
      } else {
        state.selectedExpenses.push(expenseId)
      }
    },
    
    selectAllExpenses: (state, action) => {
      state.selectedExpenses = action.payload
    },
    
    clearSelection: (state) => {
      state.selectedExpenses = []
    },
    
    // Filter actions
    setFilter: (state, action) => {
      const { field, value } = action.payload
      if (field.includes('.')) {
        const [parent, child] = field.split('.')
        state.filters[parent][child] = value
      } else {
        state.filters[field] = value
      }
    },
    
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    
    // Sort actions
    setSort: (state, action) => {
      const { field, direction } = action.payload
      state.sort.field = field
      state.sort.direction = direction || 'asc'
    },
    
    toggleSortDirection: (state) => {
      state.sort.direction = state.sort.direction === 'asc' ? 'desc' : 'asc'
    },
    
    // View actions
    setView: (state, action) => {
      const { field, value } = action.payload
      state.view[field] = value
    },
    
    toggleFilters: (state) => {
      state.view.showFilters = !state.view.showFilters
    },
    
    toggleBulkActions: (state) => {
      state.view.showBulkActions = !state.view.showBulkActions
      if (!state.view.showBulkActions) {
        state.selectedExpenses = []
      }
    },
    
    // Notification actions
    addNotification: (state, action) => {
      const notification = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      }
      state.notifications.unshift(notification)
      // Keep only last 10 notifications
      if (state.notifications.length > 10) {
        state.notifications = state.notifications.slice(0, 10)
      }
    },
    
    removeNotification: (state, action) => {
      const id = action.payload
      state.notifications = state.notifications.filter(n => n.id !== id)
    },
    
    clearNotifications: (state) => {
      state.notifications = []
    },
    
    // Sidebar actions
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen
    },
    
    setSidebarSection: (state, action) => {
      state.sidebar.activeSection = action.payload
    },
    
    // Dashboard actions
    setDashboardTimeRange: (state, action) => {
      state.dashboard.timeRange = action.payload
    },
    
    toggleDashboardWidget: (state, action) => {
      const widget = action.payload
      state.dashboard.widgets[widget].visible = !state.dashboard.widgets[widget].visible
    },
    
    reorderDashboardWidgets: (state, action) => {
      const { widgets } = action.payload
      state.dashboard.widgets = widgets
    },
    
    // Reset UI state
    resetUI: (state) => {
      return initialState
    },
  },
})

export const {
  setLoading,
  openModal,
  closeModal,
  closeAllModals,
  toggleExpenseSelection,
  selectAllExpenses,
  clearSelection,
  setFilter,
  clearFilters,
  setSort,
  toggleSortDirection,
  setView,
  toggleFilters,
  toggleBulkActions,
  addNotification,
  removeNotification,
  clearNotifications,
  toggleSidebar,
  setSidebarSection,
  setDashboardTimeRange,
  toggleDashboardWidget,
  reorderDashboardWidgets,
  resetUI,
} = uiSlice.actions

// Selectors
export const selectIsLoading = (state) => state.ui.isLoading
export const selectLoadingMessage = (state) => state.ui.loadingMessage
export const selectModals = (state) => state.ui.modals
export const selectSelectedExpenses = (state) => state.ui.selectedExpenses
export const selectEditingItem = (state) => state.ui.editingItem
export const selectFilters = (state) => state.ui.filters
export const selectSort = (state) => state.ui.sort
export const selectView = (state) => state.ui.view
export const selectNotifications = (state) => state.ui.notifications
export const selectSidebar = (state) => state.ui.sidebar
export const selectDashboard = (state) => state.ui.dashboard

export default uiSlice.reducer