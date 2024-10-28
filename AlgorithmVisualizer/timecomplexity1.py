import time
from numpy.random import randint
import matplotlib.pyplot as plt
import streamlit as st

# Define heap operations and sorting functions
def left(i):
    return 2 * i + 1

def right(i):
    return 2 * i + 2

def heapSize(A):
    return len(A) - 1

def MaxHeapify(A, i):
    l = left(i)
    r = right(i)
    if l <= heapSize(A) and A[l] > A[i]:
        largest = l
    else:
        largest = i
    if r <= heapSize(A) and A[r] > A[largest]:
        largest = r
    if largest != i:
        A[i], A[largest] = A[largest], A[i]
        MaxHeapify(A, largest)

def BuildMaxHeap(A):
    for i in range(int(heapSize(A) / 2) - 1, -1, -1):
        MaxHeapify(A, i)

def HeapSort(A):
    BuildMaxHeap(A)
    B = list()
    heapSize1 = heapSize(A)
    for i in range(heapSize(A), 0, -1):
        A[0], A[i] = A[i], A[0]
        B.append(A[heapSize1])
        A = A[:-1]
        heapSize1 = heapSize1 - 1
        MaxHeapify(A, 0)

def InsertHeap(A, key):
    A.append(key)
    i = len(A) - 1
    while i > 0 and A[(i - 1) // 2] < A[i]:
        A[(i - 1) // 2], A[i] = A[i], A[(i - 1) // 2]
        i = (i - 1) // 2

def DeleteHeap(A, key):
    try:
        i = A.index(key)
        A[i], A[-1] = A[-1], A[i]
        A.pop()
        MaxHeapify(A, i)
    except ValueError:
        pass

# Streamlit app for HeapSort Time Complexity Analysis
st.title('HeapSort Time Complexity Analysis')

# Button selection for analysis type
option = st.selectbox(
    'Select the type of analysis:',
    ['Sorting Time Complexity', 'Insertion and Deletion Time Complexity']
)

elements = list()
heap_sort_times = list()
heap_insert_times = list()
heap_delete_times = list()

if option == 'Sorting Time Complexity':
    for i in range(1, 10):
        a = randint(0, 1000 * i, 1000 * i)
        
        # Time Heap Sort
        heap_a = a.copy()
        start = time.perf_counter()
        HeapSort(heap_a)
        end = time.perf_counter()
        heap_sort_times.append(end - start)
        
        elements.append(len(a))
        st.write(f'{len(a)} Elements Sorted by HeapSort in {heap_sort_times[-1]:.6f} seconds')

    # Plotting Sorting Time Complexity
    fig, ax = plt.subplots()
    ax.plot(elements, heap_sort_times, label='Heap Sort')
    ax.set_xlabel('List Length')
    ax.set_ylabel('Time Complexity')
    ax.legend()
    ax.grid()
    st.pyplot(fig)

elif option == 'Insertion and Deletion Time Complexity':
    for i in range(1, 10):
        a = randint(0, 1000 * i, 1000 * i).tolist()
        key_to_insert = randint(0, 1000 * i)
        key_to_delete = a[randint(0, len(a) - 1)]
        
        # Time Heap Insertion
        heap_a = a.copy()
        start = time.perf_counter()
        InsertHeap(heap_a, key_to_insert)
        end = time.perf_counter()
        heap_insert_times.append(end - start)
        
        # Time Heap Deletion
        start = time.perf_counter()
        DeleteHeap(heap_a, key_to_delete)
        end = time.perf_counter()
        heap_delete_times.append(end - start)
        
        elements.append(len(a))
        st.write(f'{len(a)} Elements - Heap Insertion in {heap_insert_times[-1]:.6f} seconds')
        st.write(f'{len(a)} Elements - Heap Deletion in {heap_delete_times[-1]:.6f} seconds')

    # Plotting Insertion and Deletion Time Complexity
    fig, ax = plt.subplots()
    ax.plot(elements, heap_insert_times, label='Heap Insertion')
    ax.plot(elements, heap_delete_times, label='Heap Deletion')
    ax.set_xlabel('List Length')
    ax.set_ylabel('Time Complexity')
    ax.legend()
    ax.grid()
    st.pyplot(fig)
