import streamlit as st
import numpy as np
import graphviz
import time
from PIL import Image
import base64

def set_app_style():
    """
    Defines custom CSS styles for the Streamlit app.
    """
    st.markdown(
        """
        <style>
            .stApp {
                color: #000000; /* Make all text dark black */
            }
            .stSidebar {
                background: rgba(255, 255, 255, 0.8); /* Transparent white background for the sidebar */
                color: #000000; /* Sidebar text color */
                position: relative;
                padding-left: 120px; /* Adjust padding to avoid overlap */
            }
            
            h1, h2, h3, h4, h5, h6 {
                color: #000000; /* Heading colors */
            }
            .stMarkdown p {
                color: #000000; /* Paragraph text color */
            }
        </style>
        """,
        unsafe_allow_html=True,
    )

def sift_up(arr, i, steps, sorted_indices):
    parent = (i - 1) // 2
    while i > 0 and arr[parent] < arr[i]:
        steps.append((arr.copy(), set(sorted_indices), i, "red"))
        arr[i], arr[parent] = arr[parent], arr[i]
        i = parent
        parent = (i - 1) // 2
    steps.append((arr.copy(), set(sorted_indices), i, "green"))

def topDownHeapSort(arr):
    n = len(arr)
    steps = [(arr.copy(), set(), -1, "")]
    sorted_indices = set()
    for i in range(n):
        sift_up(arr, i, steps, sorted_indices)
    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        sorted_indices.add(i)
        steps.append((arr.copy(), set(sorted_indices), i, "green"))
        heapify(arr, i, 0, steps, sorted_indices)
    return steps

def sift_down(arr, n, i, steps, sorted_indices):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r
    if largest != i:
        steps.append((arr.copy(), set(sorted_indices), i, "red", largest))
        arr[i], arr[largest] = arr[largest], arr[i]
        sift_down(arr, n, largest, steps, sorted_indices)

def bottomUpHeapSort(arr):
    n = len(arr)
    steps = [(arr.copy(), set(), -1, "", -1)]
    sorted_indices = set()
    for i in range(n // 2 - 1, -1, -1):
        sift_down(arr, n, i, steps, sorted_indices)
    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        sorted_indices.add(i)
        steps.append((arr.copy(), set(sorted_indices), 0, "green", i))
        sift_down(arr, i, 0, steps, sorted_indices)
    return steps

def heapify(arr, n, i, steps, sorted_indices):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[i] < arr[l]:
        largest = l
    if r < n and arr[largest] < arr[r]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        steps.append((arr.copy(), set(sorted_indices), i, "red"))
        heapify(arr, n, largest, steps, sorted_indices)

def visualize_heap(arr, sorted_indices, current_index, current_color, swap_with=None):
    dot = graphviz.Digraph()
    n = len(arr)
    for i in range(n):
        color = "green" if i in sorted_indices else "black"
        label = str(arr[i])
        if i == current_index or i == swap_with:
            color = current_color
        dot.node(str(i), label, color=color)
        if 2 * i + 1 < n and 2 * i + 1 not in sorted_indices:
            dot.edge(str(i), str(2 * i + 1), color="black")
        if 2 * i + 2 not in sorted_indices and 2 * i + 2 < n:
            dot.edge(str(i), str(2 * i + 2), color="black")
    return dot

def highlight_array(arr, sorted_indices):
    highlighted_arr = []
    for i in range(len(arr)):
        if i in sorted_indices:
            highlighted_arr.append(f'<span style="color:green">{arr[i]}</span>')
        else:
            highlighted_arr.append(f'<span style="color:black">{arr[i]}</span>')
    return highlighted_arr

def main():
    set_app_style()  # Apply custom styles
    
    st.title("Creative Heap Sort Visualization")
    st.write("## An interactive visualization of the heap sort algorithm with creative highlighting")

    st.sidebar.title("Options")
    
    # File Upload
    uploaded_file = st.sidebar.file_uploader("Upload a text file containing an array", type=["txt"])
    if uploaded_file is not None:
        content = uploaded_file.read().decode("utf-8")
        arr = list(map(int, content.split()))
        st.session_state.arr = arr
        st.write("### Uploaded Array")
        st.write(arr)

    # Random Number Generator
    num_inputs = st.sidebar.number_input("Number of Random Inputs", min_value=1, value=10)
    if st.sidebar.button("Generate Random Array"):
        arr = np.random.randint(1, 100, size=num_inputs).tolist()
        st.session_state.arr = arr
        st.write("### Generated Random Array")
        st.write(arr)

    # Insert Element
    if 'arr' in st.session_state:
        new_element = st.sidebar.number_input("Element to Insert", value=0)
        if st.sidebar.button("Insert Element"):
            st.session_state.arr.append(new_element)
            st.write("### Array after Insertion")
            st.write(st.session_state.arr)

    # Delete Element
    if 'arr' in st.session_state:
        del_element = st.sidebar.number_input("Element to Delete", value=0)
        if st.sidebar.button("Delete Element"):
            if del_element in st.session_state.arr:
                st.session_state.arr.remove(del_element)
                st.write("### Array after Deletion")
                st.write(st.session_state.arr)
            else:
                st.write("Element not found in the array.")
    
    if 'arr' in st.session_state:
        arr = st.session_state.arr

        tabs = st.tabs(["Top-Down Heap Sort", "Bottom-Up Heap Sort"])
        
        with tabs[0]:
            st.write("## Top-Down Heap Sort")
            steps = topDownHeapSort(arr)
            st.write("### Sorted Array")
            st.write(arr)
            st.write("### Heap Sort Steps")
            slide_index = st.slider("Select step", 0, len(steps) - 1, 0)
            step_arr, sorted_until, current_index, current_color = steps[slide_index]
            highlighted_arr = highlight_array(step_arr, sorted_until)
            st.markdown(f"Step {slide_index + 1}: {' '.join(highlighted_arr)}", unsafe_allow_html=True)
            dot = visualize_heap(step_arr, sorted_until, current_index, current_color)
            st.graphviz_chart(dot)
        
        with tabs[1]:
            st.write("## Bottom-Up Heap Sort")
            steps = bottomUpHeapSort(arr)
            st.write("### Sorted Array")
            st.write(arr)
            st.write("### Heap Sort Steps")
            slide_index = st.slider("Select step", 0, len(steps) - 1, 0)
            step_arr, sorted_until, current_index, current_color, swap_with = steps[slide_index]
            highlighted_arr = highlight_array(step_arr, sorted_until)
            st.markdown(f"Step {slide_index + 1}: {' '.join(highlighted_arr)}", unsafe_allow_html=True)
            col1, col2 = st.columns([3, 1])
            with col1:
                dot = visualize_heap(step_arr, sorted_until, current_index, current_color, swap_with)
                st.graphviz_chart(dot)
            if st.checkbox("Show animation of heap sort"):
                for step in steps:
                    step_arr, sorted_until, current_index, current_color, swap_with = step
                    highlighted_arr = highlight_array(step_arr, sorted_until)
                    st.markdown(f"Step {steps.index(step) + 1}: {' '.join(highlighted_arr)}", unsafe_allow_html=True)
                    with col1:
                        dot = visualize_heap(step_arr, sorted_until, current_index, current_color, swap_with)
                        st.graphviz_chart(dot)
                    time.sleep(1)

        sorted_file = "sorted_array.txt"
        np.savetxt(sorted_file, arr, fmt='%d')
        with open(sorted_file, "rb") as file:
            st.download_button(
                label="Download Sorted Array",
                data=file,
                file_name=sorted_file,
                mime="text/plain"
            )
    else:
        st.write("Upload or generate an array to start.")

if __name__ == "__main__":
    main()
