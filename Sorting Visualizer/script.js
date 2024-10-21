const arrayContainer = document.getElementById('array-container');
let array = [];

// Generate a random array
function generateArray(size = 50) {
  array = [];
  arrayContainer.innerHTML = ''; // Clear previous bars
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    array.push(value);
    const bar = document.createElement('div');
    bar.classList.add('array-bar');
    bar.style.height = `${value * 3}px`; // Scale height
    bar.style.width = `${600 / size}px`; // Adjust width based on size
    arrayContainer.appendChild(bar);
  }
}

// Swap two bars in the visualizer
function swap(bars, i, j) {
  const tempHeight = bars[i].style.height;
  bars[i].style.height = bars[j].style.height;
  bars[j].style.height = tempHeight;
}

// Bubble Sort Algorithm
async function bubbleSort() {
  const bars = document.getElementsByClassName('array-bar');
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = 'red';
      bars[j + 1].style.backgroundColor = 'red';

      if (array[j] > array[j + 1]) {
        await new Promise((resolve) =>
          setTimeout(() => {
            swap(bars, j, j + 1);
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            resolve();
          }, 100)
        );
      }

      bars[j].style.backgroundColor = '#2196f3';
      bars[j + 1].style.backgroundColor = '#2196f3';
    }
  }
}

// Selection Sort Algorithm
async function selectionSort() {
  const bars = document.getElementsByClassName('array-bar');
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    bars[i].style.backgroundColor = 'red';

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = 'yellow';
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (array[j] < array[minIndex]) minIndex = j;
      bars[j].style.backgroundColor = '#2196f3';
    }

    if (minIndex !== i) {
      swap(bars, i, minIndex);
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }

    bars[i].style.backgroundColor = '#2196f3';
  }
}

// Insertion Sort Algorithm
async function insertionSort() {
  const bars = document.getElementsByClassName('array-bar');
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].style.backgroundColor = 'red';
    await new Promise((resolve) => setTimeout(resolve, 100));

    while (j >= 0 && array[j] > key) {
      bars[j + 1].style.height = bars[j].style.height;
      array[j + 1] = array[j];
      j--;
    }

    bars[j + 1].style.height = `${key * 3}px`;
    array[j + 1] = key;

    bars[i].style.backgroundColor = '#2196f3';
  }
}

// Generate an initial array when the page loads
window.onload = generateArray;
