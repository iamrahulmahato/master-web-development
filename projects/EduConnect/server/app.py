from flask import Flask, request, jsonify, render_template, session, url_for, redirect
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, decode_token
import sqlite3
from extensions import mail
from flask_cors import CORS
import json

# from linkedin_api import Linkedin
import google.generativeai as genai

from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USE_TLS'] = False

mail.init_app(app)
jwt = JWTManager(app)

# Database setup
conn = sqlite3.connect('database.db', check_same_thread=False)
conn.execute('CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, verified BOOLEAN DEFAULT 0)')
conn.commit()

from routes.auth_routes import auth_routes
from routes.enrollment_routes import enrollment_routes
from routes.educonnect import educonnect_bp 
from routes.learn_route import learn_route

@app.route('/', methods=['GET'])
def index():
    return redirect(url_for('educonnect.index'))

@app.route('/account', methods=['GET'])
def auth():
    return render_template('auth.html')

app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(enrollment_routes, url_prefix='/enrollment')
app.register_blueprint(educonnect_bp, url_prefix='/educonnect')
app.register_blueprint(learn_route, url_prefix='/learn')

def get_gemini_response(career_goal, skills):
    """Fetches response from Gemini API based on career goal and skills.

    Args:
        career_goal (str): The user's career goal.
        skills (list): A list of the user's skills.

    Returns:
        str: The Gemini API response indicating skill gaps.
    """

    # Combine career goal and skills into a query for Gemini
    query = f"Considering my career goal of '{career_goal}', what additional skills would I need to acquire if my current skills are {', '.join(skills)}? Just list them as a list. The skills should be actual programming or technical skills. Just give them concise, don't give extra words like Version control (eg. Git). List a maximum of 5 skills only."

    model = genai.GenerativeModel('gemini-pro')
    api_key = os.getenv("GOOGLE_API_KEY")  # Retrieve API key from environment variable
    genai.configure(api_key=api_key)

    try:
        response = model.generate_content(query)
        return response.text
    except Exception as e:
        print(f"Error occurred during Gemini API call: {e}")
        return "An error occurred while fetching data from Gemini. Please try again later."

# def get_linkedin_profile(username):
#     api = Linkedin('sriradha81@gmail.com', '***')
#     profile = api.get_profile(username)
#     return profile

@app.route('/skill', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        career_goal = request.form['careerGoal']
        manual_skills = request.form.getlist('skill[]')
        linkedin_username = request.form.get('linkedinUsername')
        profile_data = None

        # Saving skills to a JSON file
        if manual_skills or linkedin_username:
            #     if linkedin_username:
            #     profile_data = get_linkedin_profile(linkedin_username)
            #     if 'skills' in profile_data:
            #         skills_data = {"skills": profile_data['skills']}
            #     else:
            #         skills_data = {"skills": []}
            # else:
            skills_data = {"skills": manual_skills}

            with open('skills.json', 'w') as json_file:
                json.dump(skills_data, json_file)

        # if linkedin_username:
        #     profile_data = get_linkedin_profile(linkedin_username)
        # elif manual_skills:
            profile_data = manual_skills

        if profile_data:
            # Call Gemini API to identify skill gaps
            gemini_response = get_gemini_response(career_goal, profile_data)
            return render_template('skillsync.html', profile_data=profile_data, gemini_response=gemini_response)
        else:
            return render_template('skillsync.html', error="Please enter your career goal and skills.")

    return render_template('skillsync.html')

if __name__ == '__main__':
    app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=True)
