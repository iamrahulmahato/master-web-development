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
//MERGE SORT ALGORITHM
// Merge two subarrays for merge sort
async function merge(bars, low, mid, high) {
  let n1 = mid - low + 1;
  let n2 = high - mid;

  let leftArray = [];
  let rightArray = [];

  for (let i = 0; i < n1; i++) {
    leftArray.push(array[low + i]);
    bars[low + i].style.backgroundColor = 'yellow';
  }
  for (let i = 0; i < n2; i++) {
    rightArray.push(array[mid + 1 + i]);
    bars[mid + 1 + i].style.backgroundColor = 'yellow';
  }

  await new Promise((resolve) => setTimeout(resolve, 100));

  let i = 0, j = 0, k = low;
  while (i < n1 && j < n2) {
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      bars[k].style.height = `${leftArray[i] * 3}px`;
      i++;
    } else {
      array[k] = rightArray[j];
      bars[k].style.height = `${rightArray[j] * 3}px`;
      j++;
    }
    k++;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  while (i < n1) {
    array[k] = leftArray[i];
    bars[k].style.height = `${leftArray[i] * 3}px`;
    i++;
    k++;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  while (j < n2) {
    array[k] = rightArray[j];
    bars[k].style.height = `${rightArray[j] * 3}px`;
    j++;
    k++;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  for (let i = low; i <= high; i++) {
    bars[i].style.backgroundColor = '#2196f3'; // Reset color
  }
}

// Merge Sort algorithm
async function mergeSortHelper(bars, low, high) {
  if (low < high) {
    let mid = Math.floor((low + high) / 2);
    await mergeSortHelper(bars, low, mid);
    await mergeSortHelper(bars, mid + 1, high);
    await merge(bars, low, mid, high);
  }
}

async function mergeSort() {
  const bars = document.getElementsByClassName('array-bar');
  await mergeSortHelper(bars, 0, array.length - 1);
}
//QUICK SORT ALGORITHM
// Partition function for quicksort
async function partition(bars, low, high) {
  let pivot = array[high];
  bars[high].style.backgroundColor = 'red';
  let i = low - 1;

  for (let j = low; j < high; j++) {
    bars[j].style.backgroundColor = 'yellow';
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (array[j] < pivot) {
      i++;
      swap(bars, i, j);
      [array[i], array[j]] = [array[j], array[i]];
    }
    bars[j].style.backgroundColor = '#2196f3';
  }

  swap(bars, i + 1, high);
  [array[i + 1], array[high]] = [array[high], array[i + 1]];

  bars[high].style.backgroundColor = '#2196f3';
  bars[i + 1].style.backgroundColor = '#2196f3';

  return i + 1;
}

// Quick Sort algorithm
async function quickSortHelper(bars, low, high) {
  if (low < high) {
    let pi = await partition(bars, low, high);
    await quickSortHelper(bars, low, pi - 1);
    await quickSortHelper(bars, pi + 1, high);
  }
}

async function quickSort() {
  const bars = document.getElementsByClassName('array-bar');
  await quickSortHelper(bars, 0, array.length - 1);
}

// Generate an initial array when the page loads
window.onload = generateArray;
