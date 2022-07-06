from flask import jsonify
from flask import request
from entity.models import Entity
from sqlalchemy.exc import SQLAlchemyError

from app import app
from app import db
from publish import Publisher
from sqlalchemy import and_

import json

from backend_utils.api import ApiView

api = ApiView(
    class_instance=Entity,
    identifier_attr='id',
    relationships=[],
    on_data_change=Publisher.publish_entity,
    db=db
)


@app.route('/api/entity', methods=['POST', 'GET', 'PUT', 'DELETE'])
def entity():
    if request.method == 'GET':
        return api.get(request=request)
    elif request.method == 'POST':
        return api.post(request=request)
    elif request.method == 'PUT':
        return api.put(request=request)
    elif request.method == 'DELETE':
        return api.delete(request=request)

@app.route('/api/list/entity', methods=['GET'])
def list_entity():
    return api.list(request, db)
