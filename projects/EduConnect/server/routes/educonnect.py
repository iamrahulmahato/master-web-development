from flask import Blueprint, render_template

# Define the blueprint for educonnect
educonnect_bp = Blueprint('educonnect', __name__, template_folder='templates')

# Define routes
@educonnect_bp.route('/')
@educonnect_bp.route('/index')
def index():
    return render_template('educonnect/index.html')

@educonnect_bp.route('/about')
def about():
    return render_template('educonnect/about.html')

@educonnect_bp.route('/courses')
def courses():
    return render_template('educonnect/pathway.html')

@educonnect_bp.route('/course')
def course():
    return render_template('educonnect/course.html')

@educonnect_bp.route('/module')
def module():
    return render_template('educonnect/module.html')

@educonnect_bp.route('/contact')
def contact():
    return render_template('educonnect/contact.html')

@educonnect_bp.route('/profile')
def profile():
    return render_template('educonnect/profile.html')

# Handle 404 errors
@educonnect_bp.errorhandler(404)
def page_not_found(e):
    return render_template('educonnect/404.html'), 404
