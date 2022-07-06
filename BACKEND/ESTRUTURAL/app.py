from flask import Flask, request, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import env

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config[
    'SQLALCHEMY_DATABASE_URI'
] = 'postgresql://' + env.USER_DB + ':' + env.PASSWORD_DB + '@' + env.SERVER_DB + '/' + env.DB_NAME
db = SQLAlchemy(app)
CORS(app)

# MODELS
from entity.models import Entity
from unit.models import Unit
from address import models
from user.models import User

# VIEWS
from entity import views
from unit import views
from address import views

db.create_all()
from backend_utils.env import get_values
shared_env = get_values()