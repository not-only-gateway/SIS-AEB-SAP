from app import app
from flask import jsonify
from flask import request
from access.manager.models import Manager
from access.active_directory.models import ActiveDirectory
from utils import Utils
from datetime import datetime, timedelta
import json


@app.route('/gateway/manager', methods=['POST'])
def create_manager():
    data = request.json
    exists = Manager.query.all()
    ad = ActiveDirectory.query.order_by(ActiveDirectory.id.asc()).all()
    if len(ad) > 0 and len(exists) == 0 and Utils.validate_authentication(
            active_directory=ad[0].id,
            email=data.get('email', None),
            password=data.get('password', None)):

        token = Utils.make_jwt({'email': data.get('email', None), 'password': data.get('password')})
        if token is not None:
            auth_token = Utils.make_jwt({'token': token, "exp": datetime.now() + timedelta(days=1)})
            Manager({"hash": str(token)})
            return jsonify({'token': auth_token}), 201
        else:
            return jsonify({'status': 'error', 'description': 'bad_request', 'code': 400}), 400
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401


@app.route('/gateway/manager/authenticate', methods=['POST'])
def auth_manager():
    data = request.json
    manager = Manager.query.all()

    if len(manager) > 0:
        manager = manager[0]

        auth_token = Utils.make_jwt({'token': manager.hash, "exp": datetime.now() + timedelta(days=1)})
        return jsonify({'token': auth_token}), 202
 
 
