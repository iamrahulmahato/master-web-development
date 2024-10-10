# importing libraries 
from flask import Flask, render_template
from flask_mail import Mail, Message 

from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__) 
mail = Mail(app) # instantiate the mail class 

# # configuration of mail 
# app.config['MAIL_SERVER']='smtp.gmail.com'
# app.config['MAIL_PORT'] = 465
# app.config['MAIL_USERNAME'] = 'yourId@gmail.com'
# app.config['MAIL_PASSWORD'] = '*****'
# app.config['MAIL_USE_TLS'] = False
# app.config['MAIL_USE_SSL'] = True

app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USE_TLS'] = False
mail = Mail(app) 

# message object mapped to a particular URL ‘/’ 
@app.route("/") 
def index(): 
    user = {
        'name': 'John Doe',  # Replace with actual user name
        'email': 'john@example.com'  # Replace with actual user email
    }
    msg = Message( 
                    'Hello', 
                    sender ='vijaisuriam@gmail.com', 
                    recipients = ['mugundhjb@gmail.com'] 
                ) 
    msg.html = render_template('verify.html', user=user, verification_link='https://www.example.com/verify')  # Pass user information and verification link to the template
    mail.send(msg) 
    return 'Sent'

if __name__ == '__main__': 
    app.run(debug = True) 