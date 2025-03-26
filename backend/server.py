from flask import Flask
from flask_cors import CORS
from routes import campaign_routes

app = Flask(__name__)
CORS(app)

app.register_blueprint(campaign_routes)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
'''
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
'''
