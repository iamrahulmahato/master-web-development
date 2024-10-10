from flask import Flask, render_template
import json

app = Flask(__name__)

def load_profile_data():
    with open('profile.json', 'r') as f:
        return json.load(f)

def load_skills_data():
    with open('skills.json', 'r') as f:
        return json.load(f)

@app.route('/')
def profile():
    profile_data = load_profile_data()
    skills_data = load_skills_data()
    return render_template('user_profile.html', profile=profile_data, skills=skills_data['skills'])

if __name__ == '__main__':
    app.run(debug=True)
