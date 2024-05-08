import os

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
CORS(
    app=app,
    resources={r"*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}},
    supports_credentials=True
)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("SQLALCHEMY_DATABASE_URI")
db = SQLAlchemy(app)


from routes import *


with app.app_context():
    db.create_all()
    from models import initialize_database
    initialize_database(db)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
