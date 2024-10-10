from flask import Blueprint, request, jsonify, session, render_template
import sqlite3
from flask_jwt_extended import decode_token
from flask_mail import Mail, Message
from extensions import mail
import os

enrollment_routes = Blueprint('enrollment_routes', __name__)

# Dummy function to enroll in a course
def enroll_course(user_id, course_id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    try:
        # Check if the enrollment already exists
        c.execute("SELECT COUNT(*) FROM Course_Enrolled WHERE uid = ? AND cid = ?", (user_id, course_id))
        count = c.fetchone()[0]
        if count > 0:
            return False  # Enrollment already exists
        else:
            c.execute("INSERT INTO Course_Enrolled (uid, cid, status) VALUES (?, ?, ?)", (user_id, course_id, 'enrolled'))
            conn.commit()
            return True  # Successfully enrolled
    except sqlite3.Error as e:
        print("Error enrolling in course:", e)
        return False  # Failed to enroll
    finally:
        conn.close()

@enrollment_routes.route('/check-status', methods=['POST'])
def check_enrollment_status():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    try:
        if 'token' not in session:
            return jsonify({'enrolled': False}), 401  # Unauthorized
        # Implement your logic to decode the token and get user ID
        token = session.get('token')
        user_id = decode_token(token)['sub']
        course_id = request.json.get('cid')
        print(token, user_id, course_id)
        
        c.execute("SELECT COUNT(*) FROM Course_Enrolled WHERE uid = ? AND cid = ?", (user_id, course_id))
        count = c.fetchone()[0]
        if count > 0:
            return jsonify({'enrolled': True}), 200
        else:
            return jsonify({'enrolled': False}), 200
    except sqlite3.Error as e:
        print("Error enrolling in course:", e)
        return jsonify({'enrolled': False}), 500  # Failed to enroll
    finally:
        conn.close()

# Dummy function to delete enrollment for a course
def delete_enrollment(user_id, course_id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    try:
        c.execute("DELETE FROM Course_Enrolled WHERE uid = ? AND cid = ?", (user_id, course_id))
        conn.commit()
        return True  # Successfully deleted enrollment
    except sqlite3.Error as e:
        print("Error deleting enrollment:", e)
        return False  # Failed to delete enrollment
    finally:
        conn.close()

# Function to retrieve users enrolled in a course by course ID
def get_users_by_course_id(course_id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    try:
        c.execute("SELECT u.id, u.email, u.status FROM Users u JOIN Course_Enrolled ce ON u.id = ce.uid WHERE ce.cid = ?", (course_id,))
        users = c.fetchall()
        return users
    except sqlite3.Error as e:
        print("Error retrieving users by course ID:", e)
        return []
    finally:
        conn.close()

@enrollment_routes.route('/enroll-course', methods=['POST'])
def enroll_course_route():
    token = session.get('token')
    if not token:
        return jsonify({'message': 'Token is missing.'}), 400
    

    # Implement your logic to decode the token and get user ID
    user_id = decode_token(token)['sub']

    course_id = request.json.get('cid')

    print(token, user_id, course_id)
    if not course_id:
        return jsonify({'error': 'Course ID is required'}), 400

    if enroll_course(user_id, course_id):
        return jsonify({'message': 'Enrolled successfully'}), 200
    else:
        return jsonify({'error': 'Failed to enroll'}), 500


@enrollment_routes.route('/delete-enrollment', methods=['DELETE'])
def delete_enrollment_route():
    token = request.args.get('token')
    if not token:
        return jsonify({'message': 'Token is missing.'}), 400

    # Implement your logic to decode the token and get user ID
    user_id = decode_token(token)['sub']

    course_id = request.args.get('cid')
    if not course_id:
        return jsonify({'error': 'Course ID is required'}), 400

    if delete_enrollment(user_id, course_id):
        return jsonify({'message': 'Enrollment deleted successfully'}), 200
    else:
        return jsonify({'error': 'Failed to delete enrollment'}), 500

@enrollment_routes.route('/get-users-by-course-id', methods=['GET'])
def get_users_by_course_id_route():
    course_id = request.args.get('cid')
    if not course_id:
        return jsonify({'error': 'Course ID is required'}), 400

    users = get_users_by_course_id(course_id)
   
    users_list = [{'id': user[0], 'email': user[1], 'status': user[2]} for user in users]
    return jsonify({'users': users_list}), 200

# Function to retrieve course details by course ID
def get_course_details(course_id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    try:
        c.execute("SELECT name, description FROM Course WHERE id = ?", (course_id,))
        course_details = c.fetchone()
        return course_details
    except sqlite3.Error as e:
        print("Error retrieving course details:", e)
        return None
    finally:
        conn.close()

# Function to retrieve user details by user ID
def get_user_details(user_id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    try:
        c.execute("SELECT name, CASE WHEN status = 0 THEN email ELSE 'Hidden' END AS email FROM Users WHERE id = ?", (user_id,))
        user_details = c.fetchone()
        return user_details
    except sqlite3.Error as e:
        print("Error retrieving user details:", e)
        return None
    finally:
        conn.close()

@enrollment_routes.route('/sendmail', methods=['POST'])
def send_mail_route():
    course_id = request.args.get('cid')
    if not course_id:
        return jsonify({'error': 'Course ID is required'}), 400

    token = session.get('token')
    if not token:
        return jsonify({'error': 'Token is missing'}), 400

    user_id = decode_token(token)['sub']
    # user_id = request.args.get('uid')

    if not user_id:
        return jsonify({'error': 'User ID not found in token'}), 400

    user_details = get_user_details(user_id)
    if not user_details:
        return jsonify({'error': 'Failed to retrieve user details'}), 500

    course_details = get_course_details(course_id)
    if not course_details:
        return jsonify({'error': 'Failed to retrieve course details'}), 500

    meeting_code = request.json.get('meeting_code')
    reciever_email = request.json.get('receiver_email')

    print(user_id, course_id, request.json, reciever_email)


    email_content = render_template('peer_confirm.html', sender_name=user_details[0], course_name=course_details[0], course_description=course_details[1], meeting_code=meeting_code)


    # Send email
    msg = Message("Meeting Details", sender=os.getenv('MAIL_USERNAME'), recipients=[reciever_email])
    msg.html = email_content
    mail.send(msg)

    return jsonify({'message': 'Email sent successfully'}), 200