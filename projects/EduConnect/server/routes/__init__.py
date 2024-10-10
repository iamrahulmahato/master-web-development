from .auth_routes import auth_routes
from .enrollment_routes import enrollment_routes
from .educonnect import educonnect_bp
from .learn_route import learn_route

# Optionally, you can define a function to initialize all the Blueprints
def init_app(app):
    app.register_blueprint(auth_routes, url_prefix='/auth')
    app.register_blueprint(enrollment_routes, url_prefix='/course')
    app.register_blueprint(educonnect_bp, url_prefix='/educonnect')
    app.register_blueprint(learn_route, url_prefix='/learn')


