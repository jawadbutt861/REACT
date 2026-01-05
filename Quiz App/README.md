# 🧠 Quiz Master

A modern, interactive quiz application built with React and Vite. Test your knowledge with trivia questions from various categories!

## ✨ Features

### Core Functionality
- **Dynamic Quiz Loading**: Fetches questions from The Trivia API
- **Interactive UI**: Modern, responsive design with smooth animations
- **Real-time Scoring**: Track your progress as you answer questions
- **Progress Tracking**: Visual progress bar showing quiz completion

### Enhanced User Experience
- **⏰ Timer System**: 30-second countdown for each question
- **✅ Instant Feedback**: See correct/incorrect answers immediately
- **📊 Detailed Results**: Complete answer review at the end
- **🔄 Restart Functionality**: Retake the quiz anytime
- **📱 Mobile Responsive**: Works perfectly on all devices

### Smart Features
- **Answer Validation**: Must select an answer before proceeding
- **Visual Feedback**: Color-coded options showing correct/incorrect answers
- **Performance Messages**: Motivational feedback based on your score
- **Error Handling**: Graceful error handling with retry functionality
- **Auto-progression**: Automatic question advancement after feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## 🎮 How to Play

1. **Start**: The quiz loads 10 random trivia questions
2. **Answer**: Select your answer within the 30-second time limit
3. **Feedback**: See if you're correct and learn the right answer
4. **Progress**: Continue through all questions
5. **Results**: View your final score and detailed answer review
6. **Restart**: Take the quiz again to improve your score!

## 🏆 Scoring System

- **Correct Answer**: +10 points
- **Incorrect/Time Up**: 0 points
- **Performance Levels**:
  - 70+ points: Excellent work! 🌟
  - 50-69 points: Good job! 👍
  - Below 50: Keep practicing! 💪

## 🛠 Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **The Trivia API** - Question source
- **CSS3** - Modern styling with animations
- **ESLint** - Code linting

## 📱 Responsive Design

The app is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── App.jsx          # Main application component
├── main.jsx         # Application entry point
└── index.css        # Global styles and animations
```

## 🌟 Future Enhancements

Potential features for future versions:
- Category selection (Science, History, Sports, etc.)
- Difficulty levels (Easy, Medium, Hard)
- Multiplayer mode
- Leaderboards
- Custom question sets
- Sound effects and music
- Achievement system

## 📄 License

This project is open source and available under the MIT License.