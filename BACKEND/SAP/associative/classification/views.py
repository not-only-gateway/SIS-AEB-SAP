from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
from app import app
import relations
from app import db
from sqlalchemy import and_
from associative.classification.models import Classification, ClassificationInfrastructure
from associative.type.models import ClassificationType

from backend_utils.templates.api import ApiView

api = ApiView(class_instance=Classification, identifier_attr='id',
              relationships=relations.relations)

classification_api = ApiView(
    class_instance=ClassificationInfrastructure,
    identifier_attr='',
    relationships=relations.relations
)


@app.route('/api/classification', methods=['POST', 'GET', 'PUT', 'DELETE'])
def classification():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/classification', methods=['GET'])
def list_classification():
    return api.list(request, db)


@app.route('/api/classification_infrastructure', methods=['POST'])
def create_classification_infra():
    data = request.json
    try:
        ClassificationInfrastructure(data)
        return jsonify({'status': 'success', 'description': 'Created', 'code': 201}), 201
    except SQLAlchemyError as e:
        return jsonify({'status': 'error', 'description': str(e), 'code': 400}), 400


@app.route('/api/classification_infrastructure', methods=['DELETE'])
def delete_classification_infra():
    data = request.json
    try:
        ci = ClassificationInfrastructure.query.filter(
            ClassificationInfrastructure.infrastructure == data.get('infrastructure', None),
            ClassificationInfrastructure.classification == data.get('classification', None)).first()

        db.session.delete(ci)
        db.session.commit()

        return jsonify({'status': 'success', 'description': 'no content', 'code': 206}), 206
    except SQLAlchemyError as e:
        return jsonify({'status': 'error', 'description': str(e), 'code': 400}), 400

@app.route('/api/list/classification_infrastructure', methods=['GET'])
def list_classification_infra():
    return classification_api.list(request, db)
