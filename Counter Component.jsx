import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  let intervalId = null; // To store the interval ID

  // Function to start increasing or decreasing the count
  const startCounting = (action) => {
    action(); // Perform the action immediately on press
    intervalId = setInterval(action, 100); // Keep performing it every 100ms
  };

  // Function to stop counting when the button is released
  const stopCounting = () => clearInterval(intervalId);

  return (
    <div>
      <button
        onMouseDown={() => startCounting(() => setCount((prev) => prev - 1))}
        onMouseUp={stopCounting}
        onMouseLeave={stopCounting}
        onTouchStart={() => startCounting(() => setCount((prev) => prev - 1))}
        onTouchEnd={stopCounting}
      >
        -
      </button>

      <span>{count}</span>

      <button
        onMouseDown={() => startCounting(() => setCount((prev) => prev + 1))}
        onMouseUp={stopCounting}
        onMouseLeave={stopCounting}
        onTouchStart={() => startCounting(() => setCount((prev) => prev + 1))}
        onTouchEnd={stopCounting}
      >
        +
      </button>
    </div>
  );
}
