# Convex Hull Visualizer

This project is a simple **Convex Hull Visualizer** built using Streamlit, NumPy, Matplotlib, and SciPy. It allows users to generate random points or add custom points, then calculates and displays the convex hull for the set of points. This visualizer is a practical tool for understanding convex hulls and computational geometry.

## Features

- **Generate Random Points**: Select the number of random points to generate.
- **Add Custom Points**: Input x and y coordinates to add custom points to the plot.
- **Convex Hull Calculation**: Automatically calculates the convex hull when points are updated, displaying it on a 2D plot.

## Requirements

- Python 3.8 or higher
- Libraries:
  - `streamlit`
  - `numpy`
  - `matplotlib`
  - `scipy`

## Installation

Clone the repository:
   ```bash
   git clone https://github.com/yourusername/convex-hull-visualizer.git
   cd convex-hull-visualizer
Install the required packages:

bash
Copy code
pip install -r requirements.txt
Run the application:

bash
Copy code
streamlit run app.py
Usage
Sidebar Controls:

Generate Random Points: Use the slider to set the number of points and click the "Generate Random Points" button.
Add Custom Points: Enter x and y coordinates, then click "Add Point" to include them in the visualization.
Main Display:

The main page shows the current list of points and the convex hull plot. The convex hull is visualized as a red outline surrounding the outermost points.
Project Structure
app.py: The main application script.
requirements.txt: List of dependencies.
Example

Error Handling
If fewer than three points are provided, a warning will be displayed. If there’s an error in calculating the convex hull, an error message will be shown.

License
This project is licensed under the MIT License.

