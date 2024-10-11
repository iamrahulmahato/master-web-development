#!C:\Users\Lenovo\AppData\Local\Programs\Python\Python37-32\python.exe

import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.svm import SVR
from sklearn.model_selection import train_test_split
import pickle

# Load and preprocess the data
data = pd.read_csv("Admission_Predict.csv")
X = data.iloc[:, 1:-1].values
y = data.iloc[:, -1].values


# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)

# Initialize and train the Gradient Boosting Regressor model
svr_regressor = SVR()
svr_regressor.fit(X_train, y_train)

pickle.dump(svr_regressor, open('svr_model.pkl', 'wb'))



