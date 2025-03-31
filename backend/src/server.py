from flask import Flask
from .extensions import db  # Import db from extensions
from .routes.campaign_routes import campaign_bp
from .routes import user_bp  # Import user_bp from routes/__init__.py

def create_app():
    app = Flask(__name__)
    # ... your app configuration ...
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db' # Example database URI
    db.init_app(app)  # Initialize the database with the app
    app.register_blueprint(campaign_bp)
    app.register_blueprint(user_bp)
    return app

app = create_app()
