import streamlit as st
import numpy as np
import matplotlib.pyplot as plt
from scipy.spatial import ConvexHull

# Initialize session state to store points
if "points" not in st.session_state:
    st.session_state["points"] = []


# Function to plot the convex hull
def plot_convex_hull(points):
    points = np.array(points)  # Ensure points are in a NumPy array
    if len(points) < 3:
        st.warning("At least 3 points are required to form a convex hull.")
        return

    try:
        plt.figure(figsize=(8, 6))

        # Plot the points
        plt.scatter(points[:, 0], points[:, 1], c="blue", label="Points")

        # Calculate and plot the convex hull
        hull = ConvexHull(points)
        for simplex in hull.simplices:
            plt.plot(points[simplex, 0], points[simplex, 1], "r-")
        plt.fill(points[hull.vertices, 0], points[hull.vertices, 1], "red", alpha=0.2)

        plt.xlabel("X")
        plt.ylabel("Y")
        plt.legend()
        plt.title("Convex Hull Visualization")
        st.pyplot(plt)  # Display the plot in Streamlit

    except Exception as e:
        st.error(f"Error in calculating convex hull: {str(e)}")


# Sidebar for user interaction
st.sidebar.header("Convex Hull Visualizer")
num_points = st.sidebar.slider("Select the number of random points:", 3, 50, 10)

# Generate random points
if st.sidebar.button("Generate Random Points"):
    st.session_state["points"] = np.random.rand(num_points, 2).tolist()

# Add custom point
st.sidebar.subheader("Add Custom Points")
x = st.sidebar.number_input(
    "X coordinate", value=0.5, min_value=0.0, max_value=1.0, step=0.01
)
y = st.sidebar.number_input(
    "Y coordinate", value=0.5, min_value=0.0, max_value=1.0, step=0.01
)
if st.sidebar.button("Add Point"):
    st.session_state["points"].append([x, y])

# Display points and plot the convex hull
st.header("Convex Hull Visualization")
st.write("Current points:")
st.write(st.session_state["points"])

plot_convex_hull(st.session_state["points"])
