# Boston Housing Market Analysis Dashboard

This is an interactive web dashboard built with [Dash](https://dash.plotly.com/), which visualizes data from the Boston Housing Market dataset. The application provides several graphs to analyze the housing data, including the distribution of home values, the average home value based on the number of rooms, and a scatter plot showing the relationship between home value and tax rate.

## Features

- **Select Highway Access Index (RAD)**: Allows users to filter data based on the RAD value, which indicates the accessibility of radial highways.
- **Graphs**:
  - **Median Home Value Distribution**: A histogram showing the distribution of the median home values (MEDV).
  - **Average Home Value by Room Count**: A bar chart displaying the average home value for each room count.
  - **Home Value vs. Tax Rate**: A scatter plot showing the relationship between home value (MEDV) and the tax rate (TAX), with color coding based on the RAD index.

## Prerequisites

Make sure you have the following installed:
- Python 3.x
- Dash (`dash`, `dash_core_components`, `dash_html_components`)
- Plotly (`plotly`)
- Pandas (`pandas`)

You can install these dependencies using pip:

```bash
pip install dash plotly pandas
Dataset
This dashboard uses the Boston Housing dataset (data.csv). The dataset should contain the following columns:

RM: Average number of rooms per dwelling.
RAD: Index of accessibility to radial highways.
MEDV: Median value of owner-occupied homes in $1000s.
TAX: Property tax rate.
Ensure that the data.csv file is located in the correct path for the application to load it correctly.

How to Run
Clone this repository or download the project files to your local machine.
Make sure you have installed the necessary dependencies (dash, plotly, and pandas).
Update the dataset path in the visulaizer.py file to match the location of your data.csv.
Run the Dash application:
bash
Copy code
python visulaizer.py
Open your web browser and go to the address shown in the terminal (usually http://127.0.0.1:8050/).
App Layout
The app is composed of:

A header (H1) with the title: "Boston Housing Market Analysis Dashboard".
A dropdown for selecting the RAD value to filter the data.
Three interactive graphs:
Median Home Value Distribution: A histogram of home values.
Average Home Value by Room Count: A bar chart showing average home values grouped by the number of rooms.
Home Value vs. Tax Rate: A scatter plot of home value vs. tax rate.
License
This project is licensed under the MIT License - see the LICENSE file for details.