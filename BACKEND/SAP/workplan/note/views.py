
from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
from workplan.note.models import CommitmentNotes
from sqlalchemy import and_
from app import app
import relations
from app import db

from backend_utils.templates.api import ApiView
from workplan.operation.models import OperationPhase
api = ApiView(class_instance=CommitmentNotes, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/commitment_note', methods=['POST', 'GET', 'PUT', 'DELETE'])
def commitment_note():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/commitment_note', methods=['GET'])
def list_commitment_note():
    return api.list(request, db)