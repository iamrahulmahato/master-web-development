let questions = [
  {
      course: "React",
      data: [
          {
              numb: 1,
              question: "What is JSX in React?",
              answer: "A. JavaScript XML",
              options: [
                  "A. JavaScript XML",
                  "B. JavaScript HTML",
                  "C. JavaScript Extension",
                  "D. JavaScript Syntax"
              ]
          },
          {
              numb: 2,
              question: "What is the purpose of virtual DOM in React?",
              answer: "A. To speed up the rendering process",
              options: [
                  "A. To speed up the rendering process",
                  "B. To manipulate the DOM directly",
                  "C. To keep track of component state changes",
                  "D. To reconcile changes before updating the actual DOM"
              ]
          },
          {
              numb: 3,
              question: "What is a React component?",
              answer: "C. A reusable piece of code that defines how a part of a UI should appear.",
              options: [
                  "A. A simple JavaScript function",
                  "B. A specific HTML element",
                  "C. A reusable piece of code that defines how a part of a UI should appear.",
                  "D. A stateful class"
              ]
          },
          {
              numb: 4,
              question: "What is the purpose of PropTypes in React?",
              answer: "B. To validate the types of props passed to a component",
              options: [
                  "A. To define the structure of a component's state",
                  "B. To validate the types of props passed to a component",
                  "C. To create custom hooks",
                  "D. To handle component lifecycle events"
              ]
          },
          {
              numb: 5,
              question: "What is the role of setState() method in React?",
              answer: "D. To update the state of a component and re-render it",
              options: [
                  "A. To define initial state of a component",
                  "B. To create a new instance of a component",
                  "C. To define props of a component",
                  "D. To update the state of a component and re-render it"
              ]
          }
      ]
  },
  {
      course: "JavaScript",
      data: [
          {
              numb: 1,
              question: "What is closure in JavaScript?",
              answer: "B. The combination of a function and the lexical environment within which that function was declared.",
              options: [
                  "A. A block of code enclosed in curly braces {}.",
                  "B. The combination of a function and the lexical environment within which that function was declared.",
                  "C. The process of bundling data and methods that operate on the data into a single unit.",
                  "D. A function that is defined as the property of an object."
              ]
          },
          {
              numb: 2,
              question: "What is a higher-order function in JavaScript?",
              answer: "C. A function that takes another function as an argument or returns a function.",
              options: [
                  "A. A function that is defined as the property of an object.",
                  "B. A function that is called before another function.",
                  "C. A function that takes another function as an argument or returns a function.",
                  "D. A function that returns an object."
              ]
          },
          {
              numb: 3,
              question: "What is the use of 'typeof' operator in JavaScript?",
              answer: "D. To check the data type of a variable",
              options: [
                  "A. To create a new variable",
                  "B. To concatenate strings",
                  "C. To compare two values",
                  "D. To check the data type of a variable"
              ]
          },
          {
              numb: 4,
              question: "What is the difference between '==' and '===' operators in JavaScript?",
              answer: "C. '==' performs type coercion, while '===' does not.",
              options: [
                  "A. '==' checks only value, while '===' checks both value and type.",
                  "B. '==' is used for assignment, while '===' is used for comparison.",
                  "C. '==' performs type coercion, while '===' does not.",
                  "D. There is no difference between them."
              ]
          },
          {
              numb: 5,
              question: "What does the 'this' keyword refer to in JavaScript?",
              answer: "A. The context in which a function is called",
              options: [
                  "A. The context in which a function is called",
                  "B. The current value of the function",
                  "C. The parent function of the current function",
                  "D. The global object"
              ]
          }
      ]
  },
  {
      course: "HTML",
      data: [
          {
              numb: 1,
              question: "What does HTML stand for?",
              answer: "B. HyperText Markup Language",
              options: [
                  "A. High-Tech Markup Language",
                  "B. HyperText Markup Language",
                  "C. Hyper Transfer Markup Language",
                  "D. Hyper Transfer Main Language"
              ]
          },
          {
              numb: 2,
              question: "What is the correct HTML element for inserting a line break?",
              answer: "C. <br>",
              options: [
                  "A. <break>",
                  "B. <lb>",
                  "C. <br>",
                  "D. <newline>"
              ]
          },
          {
              numb: 3,
              question: "What is the purpose of the 'alt' attribute in an <img> tag?",
              answer: "D. To provide alternative text for screen readers and when the image cannot be displayed",
              options: [
                  "A. To define the alignment of the image",
                  "B. To set the image size",
                  "C. To link the image to another webpage",
                  "D. To provide alternative text for screen readers and when the image cannot be displayed"
              ]
          },
          {
              numb: 4,
              question: "What is the correct HTML for creating a hyperlink?",
              answer: "B. <a href='url'>link text</a>",
              options: [
                  "A. <link src='url'>link text</link>",
                  "B. <a href='url'>link text</a>",
                  "C. <a src='url'>link text</a>",
                  "D. <href='url'>link text</>"
              ]
          },
          {
              numb: 5,
              question: "Which HTML tag is used to define an unordered list?",
              answer: "A. <ul>",
              options: [
                  "A. <ul>",
                  "B. <ol>",
                  "C. <li>",
                  "D. <dl>"
              ]
          }
      ]
  },
  {
      course: "CSS",
      data: [
          {
              numb: 1,
              question: "What does CSS stand for?",
              answer: "A. Cascading Style Sheets",
              options: [
                  "A. Cascading Style Sheets",
                  "B. Computer Style Sheets",
                  "C. Colorful Style Sheets",
                  "D. Creative Style Sheets"
              ]
          },
          {
              numb: 2,
              question: "Which CSS property is used to change the text color of an element?",
              answer: "D. color",
              options: [
                  "A. font-color",
                  "B. text-color",
                  "C. color-text",
                  "D. color"
              ]
          },
          {
              numb: 3,
              question: "What is the default value of the 'position' property in CSS?",
              answer: "C. static",
              options: [
                  "A. absolute",
                  "B. relative",
                  "C. static",
                  "D. fixed"
              ]
          },
          {
              numb: 4,
              question: "Which CSS property is used to control the layout of elements in a grid?",
              answer: "A. display",
              options: [
                  "A. display",
                  "B. grid-template",
                  "C. grid-layout",
                  "D. grid-column"
              ]
          },
          {
              numb: 5,
              question: "What is the purpose of the 'float' property in CSS?",
              answer: "B. To specify whether an element should float to the left or right",
              options: [
                  "A. To change the font size of an element",
                  "B. To specify whether an element should float to the left or right",
                  "C. To apply a shadow effect to an element",
                  "D. To control the spacing between lines of text"
              ]
          }
      ]
  },
  {
      course: "Python",
      data: [
          {
              numb: 1,
              question: "What is Python?",
              answer: "A. A high-level programming language",
              options: [
                  "A. A high-level programming language",
                  "B. A type of snake",
                  "C. A type of database",
                  "D. A markup language"
              ]
          },
          {
              numb: 2,
              question: "What are Python's main advantages?",
              answer: "C. Easy to read, write, and maintain code",
              options: [
                  "A. Fast execution speed",
                  "B. Limited libraries and frameworks",
                  "C. Easy to read, write, and maintain code",
                  "D. Only suitable for web development"
              ]
          },
          {
              numb: 3,
              question: "What is the result of 3 + 4 * 2?",
              answer: "B. 11",
              options: [
                  "A. 10",
                  "B. 11",
                  "C. 14",
                  "D. 20"
              ]
          },
          {
              numb: 4,
              question: "What is the correct way to declare a function in Python?",
              answer: "D. def my_function():",
              options: [
                  "A. function my_function():",
                  "B. void my_function():",
                  "C. func my_function():",
                  "D. def my_function():"
              ]
          },
          {
              numb: 5,
              question: "What is the purpose of 'if', 'elif', and 'else' in Python?",
              answer: "C. To create conditional statements",
              options: [
                  "A. To define variables",
                  "B. To loop through a list",
                  "C. To create conditional statements",
                  "D. To import modules"
              ]
          }
      ]
  }
];
