from flask import Blueprint, request, jsonify
import sqlite3

# Define the Blueprint object
learn_route = Blueprint('learn_route', __name__)

# Function to establish database connection
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Route to get course details by pid
@learn_route.route('/course_details', methods=['GET'])
def get_course_details():
    pid = request.args.get('pid')
    if not pid:
        return jsonify({'error': 'Parameter pid is required'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT cid FROM Pathway_Course WHERE pid = ?', (pid,))
        course_ids = cursor.fetchall()
        course_details = []
        for course_id in course_ids:
            cursor.execute('SELECT * FROM Course WHERE id = ?', (course_id['cid'],))
            course_details.append(dict(cursor.fetchone()))
        conn.close()
        return jsonify(course_details)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to get module details by cid
@learn_route.route('/module_details', methods=['GET'])
def get_module_details():
    cid = request.args.get('cid')
    if not cid:
        return jsonify({'error': 'Parameter cid is required'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT mid FROM Course_Module WHERE cid = ?', (cid,))
        module_ids = cursor.fetchall()
        module_details = []
        for module_id in module_ids:
            cursor.execute('SELECT * FROM Module WHERE id = ?', (module_id['mid'],))
            module_details.append(dict(cursor.fetchone()))
        conn.close()
        return jsonify(module_details)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to get course details by course id (cid)
@learn_route.route('/course/<int:cid>', methods=['GET'])
def get_course_by_id(cid):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM Course WHERE id = ?', (cid,))
        course = cursor.fetchone()
        conn.close()
        if course:
            return jsonify(dict(course))
        else:
            return jsonify({'error': 'Course not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to get module details by module id (mid)
@learn_route.route('/module/<int:mid>', methods=['GET'])
def get_module_by_id(mid):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM Module WHERE id = ?', (mid,))
        module = cursor.fetchone()
        conn.close()
        if module:
            return jsonify(dict(module))
        else:
            return jsonify({'error': 'Module not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
