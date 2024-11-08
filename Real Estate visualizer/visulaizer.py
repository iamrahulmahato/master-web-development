import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import plotly.express as px
import pandas as pd

# Load dataset
data = pd.read_csv(
    r"C:\Users\Ananya\OneDrive\Documents\GitHub\master-web-development\Real Estate visualizer\data.csv"
)  # Adjust path to your file location

# Initialize the Dash app
app = dash.Dash(__name__)

# Define the app layout
app.layout = html.Div(
    children=[
        # Main title
        html.H1(
            "Boston Housing Market Analysis Dashboard", style={"text-align": "center"}
        ),
        # Highway Access Index (RAD) dropdown
        html.Div(
            children=[
                html.Label("Select Highway Access Index (RAD):"),
                dcc.Dropdown(
                    id="rad_dropdown",
                    options=[
                        {"label": str(rad), "value": str(rad)}
                        for rad in sorted(data["RAD"].unique())
                    ],
                    multi=True,
                    placeholder="Select highway access index",
                ),
            ],
            style={"width": "30%", "display": "inline-block"},
        ),
        # Graphs for visualization
        dcc.Graph(id="medv_distribution_graph"),
        dcc.Graph(id="avg_value_room_graph"),
        dcc.Graph(id="value_tax_scatter"),
    ]
)


# Callback to update graphs based on RAD selection
@app.callback(
    [
        Output("medv_distribution_graph", "figure"),
        Output("avg_value_room_graph", "figure"),
        Output("value_tax_scatter", "figure"),
    ],
    [Input("rad_dropdown", "value")],
)
def update_graphs(selected_rad):
    # Filter data based on highway access index selection
    filtered_data = data
    if selected_rad:
        filtered_data = filtered_data[
            filtered_data["RAD"].astype(str).isin(selected_rad)
        ]

    # Plot 1: Distribution of Median Home Value (MEDV)
    medv_distribution_fig = px.histogram(
        filtered_data, x="MEDV", nbins=50, title="Median Home Value Distribution"
    )

    # Plot 2: Average Home Value by Room Count
    avg_value_room_fig = px.bar(
        filtered_data.groupby("RM")["MEDV"].mean().reset_index(),
        x="RM",
        y="MEDV",
        title="Average Home Value by Room Count",
    )

    # Plot 3: Scatter Plot of Home Value vs Tax Rate
    value_tax_scatter_fig = px.scatter(
        filtered_data, x="TAX", y="MEDV", color="RAD", title="Home Value vs. Tax Rate"
    )

    return medv_distribution_fig, avg_value_room_fig, value_tax_scatter_fig


# Run the app
if __name__ == "__main__":
    app.run_server(debug=True)
