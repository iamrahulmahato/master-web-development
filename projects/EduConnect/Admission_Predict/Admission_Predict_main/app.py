from flask import Flask, request, url_for, redirect, render_template
import pickle
import numpy as np

app = Flask(__name__)

# Load your trained Gradient Boosting Regressor model
svr_regressor_model = pickle.load(open('svr_model.pkl', 'rb'))

@app.route('/')
def hello_world():
    return render_template("Admission_Pred.html")

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    # Get the input features from the form
    input_features = [int(x) for x in request.form.values()]
    
    # Convert the input features into a numpy array
    final_features = np.array(input_features).reshape(1, -1)
    
    # Predict the probability of forest fire using the trained model
    predicted_chance_of_admit = svr_regressor_model.predict(final_features)[0]
    
    
    # Render the template with the prediction result
    return render_template('Admission_Pred.html', pred='Probability of Getting Admission at Renowned Institutions: {:.2f}'.format(predicted_chance_of_admit))

if __name__ == '__main__':
    app.run(debug=True)
