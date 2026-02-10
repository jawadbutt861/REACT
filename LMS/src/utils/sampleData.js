// Sample course data with longer descriptions for testing ReadMore functionality

export const sampleCourses = [
  {
    name: "Introduction to React",
    description: "Learn the fundamentals of React, including components, state management, props, and hooks. This comprehensive course covers everything from basic concepts to advanced patterns. You'll build real-world projects and understand how to create dynamic, interactive user interfaces. By the end of this course, you'll be able to build modern web applications using React and its ecosystem.",
    duration: "3 Months"
  },
  {
    name: "Advanced JavaScript",
    description: "Master advanced JavaScript concepts including closures, prototypes, async/await, and ES6+ features. This course dives deep into the language mechanics and teaches you how to write efficient, maintainable code. You'll learn about design patterns, functional programming concepts, and how to optimize JavaScript performance for production applications.",
    duration: "4 Months"
  },
  {
    name: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js and Express. Learn about RESTful APIs, database integration, authentication, and deployment strategies. This course covers everything from basic server setup to advanced topics like microservices architecture, caching strategies, and performance optimization. You'll work with MongoDB, PostgreSQL, and learn about containerization with Docker.",
    duration: "5 Months"
  },
  {
    name: "Python for Data Science",
    description: "Explore data science with Python using libraries like Pandas, NumPy, and Matplotlib. Learn data manipulation, visualization, and basic machine learning concepts. This course is perfect for beginners who want to enter the field of data science. You'll work with real datasets and learn how to extract meaningful insights from data.",
    duration: "6 Months"
  },
  {
    name: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface and user experience design. This course covers design thinking, wireframing, prototyping, and user research methodologies. You'll master tools like Figma and Adobe XD while learning about color theory, typography, and accessibility. Perfect for aspiring designers and developers who want to improve their design skills.",
    duration: "4 Months"
  }
];

// Function to add sample courses to Firebase (for testing purposes)
export const addSampleCourses = async (db, addDoc, collection) => {
  try {
    const promises = sampleCourses.map(course => 
      addDoc(collection(db, "course"), course)
    );
    
    await Promise.all(promises);
    console.log("Sample courses added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding sample courses:", error);
    return false;
  }
};