from flask import jsonify
from flask import request
from address.models import Address
from sqlalchemy.exc import SQLAlchemyError
from app import app
from app import db

from sqlalchemy import and_

from backend_utils.api import ApiView

api = ApiView(db=db, class_instance=Address, identifier_attr='id',
              relationships=[])


@app.route('/api/address', methods=['POST', 'GET', 'PUT', 'DELETE'])
def address():
    if request.method == 'GET':
        return api.get(request=request)
    elif request.method == 'POST':
        return api.post(request=request)
    elif request.method == 'PUT':
        return api.put(request=request)
    elif request.method == 'DELETE':
        return api.delete(request=request)

@app.route('/api/list/address', methods=['GET'])
def list_address():
    return api.list(request, db)
