from flask import Flask, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import env

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config[
    'SQLALCHEMY_DATABASE_URI'
] = 'postgresql://' + env.USER_DB + ':' + env.PASSWORD_DB + '@' + env.SERVER_DB + '/' + env.DB_NAME

db = SQLAlchemy(app)
CORS(app)

from access.privilege.models import Privilege
from access.profile.models import AccessProfile

from service.service.models import Service
from service.entity.models import Entity
from service.endpoint.models import Endpoint, Access
from access.manager.models import Manager
from service.drive.models import Upload

from service.record.models import Record
from access.user.models import User

from service.draft.models import Draft
from access.active_directory.models import ActiveDirectory
from access.session.models import Session
from service.publish.models import Publish


from access.active_directory import views
from service.record import views
from service.draft import views
from service.entity import views
from service.service import views
from access.privilege import views
from access.session import views
from service.endpoint import views
from access.manager import views
from gateway import views
from access.profile import views
import service.drive.views
from service.publish import views


db.create_all()

ad = ActiveDirectory.query.order_by(ActiveDirectory.id.asc()).all()
if len(ad) == 0:
    ActiveDirectory({
        'base': env.BASE,
        'attr': env.ATTRS,
        'server': env.SERVER,
        'filter': env.FILTER,
        'denomination': env.DENOMINATION,
        'description': env.DESCRIPTION
    })

