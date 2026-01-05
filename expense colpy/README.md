# Expense Management System

A comprehensive expense tracking application built with React.js that helps users manage their personal finances effectively.

## Features

### Core Functionality
- ✅ **Add Expenses**: Create new expense entries with name, amount, date, and category
- ✅ **Edit Expenses**: Modify existing expense details
- ✅ **Delete Expenses**: Remove individual expenses or clear all expenses
- ✅ **Input Validation**: Comprehensive form validation with error messages
- ✅ **Local Storage**: Persistent data storage using browser localStorage

### Advanced Features
- ✅ **Filter & Sort**: Filter expenses by category and date, sort by amount or date
- ✅ **Expense Statistics**: View total expenses, count, and average expense
- ✅ **Category Breakdown**: See top spending categories
- ✅ **User Feedback**: Success and error messages for all actions
- ✅ **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- ✅ **Accessibility**: Keyboard navigation, screen reader support, and proper ARIA labels

## Technology Stack

- **Frontend**: React.js 19.2.0
- **Build Tool**: Vite
- **Styling**: CSS3 with responsive design
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: Browser localStorage

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ExpenseForm.jsx      # Form for adding/editing expenses
│   ├── ExpenseList.jsx      # Display list of expenses
│   ├── ExpenseFilter.jsx    # Filter and sort functionality
│   ├── ExpenseStats.jsx     # Statistics and summary
│   └── Message.jsx          # User feedback messages
├── App.jsx                  # Main application component
├── App.css                  # Application styles
├── main.jsx                 # Application entry point
└── index.css                # Global styles
```

## Usage

### Adding an Expense
1. Fill in the expense form with:
   - Expense name (required)
   - Amount (required, must be > 0)
   - Date (required)
   - Category (required)
2. Click "Add Expense" button

### Managing Expenses
- **Edit**: Click the "Edit" button on any expense item
- **Delete**: Click the "Delete" button on any expense item
- **Clear All**: Use the "Clear All" button (with confirmation)

### Filtering and Sorting
- Filter by category using the dropdown
- Filter by specific date
- Sort by amount or date (ascending/descending)
- Clear all filters with one click

## Features Implementation

### Task Completion Status
- [x] Task 1: Create Project Interface
- [x] Task 2: Add Expense Functionality
- [x] Task 3: Input Validation
- [x] Task 4: Display Expense List
- [x] Task 5: Delete Expense
- [x] Task 6: Edit Expense
- [x] Task 7: Calculate Total Expense
- [x] Task 8: Filter Expenses
- [x] Task 9: Sort Expenses
- [x] Task 10: Store Data Locally
- [x] Task 11: Clear All Expenses
- [x] Task 12: Responsive Design
- [x] Task 13: User Feedback Messages
- [x] Task 14: Accessibility Basics

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational purposes as part of a Web Development course.

## Screenshots

The application features:
- Clean, modern interface
- Intuitive form design
- Responsive layout
- Clear visual feedback
- Accessible design elements

## Future Enhancements

Potential improvements for future versions:
- Export data to CSV/PDF
- Multiple currency support
- Budget tracking and alerts
- Data visualization with charts
- User authentication
- Cloud data synchronization