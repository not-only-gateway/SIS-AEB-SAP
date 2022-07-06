from flask import jsonify
from flask import request
from unit.models import Unit
from sqlalchemy.exc import SQLAlchemyError

from app import app
from app import db
import json
from sqlalchemy import and_
from publish import Publisher
from entity.models import Entity

from backend_utils.api import ApiView

api = ApiView(
    class_instance=Unit,
    identifier_attr='id',
    relationships=[
        {'key': 'parent_unit', 'instance': Unit},
        # {'key': 'parent_entity', 'instance': Entity}
    ],
    on_data_change=Publisher.publish_unit,
    db=db
)


@app.route('/api/unit', methods=['POST', 'GET', 'PUT', 'DELETE'])
def unit():
    if request.method == 'GET':
        return api.get(request=request)
    elif request.method == 'POST':
        return api.post(request=request)
    elif request.method == 'PUT':
        return api.put(request=request)
    elif request.method == 'DELETE':
        return api.delete(request=request)


@app.route('/api/list/unit', methods=['GET'])
def list_unit():
    return api.list(request)
