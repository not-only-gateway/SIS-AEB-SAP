from flask import jsonify
from flask import request
from project.project.models import ActivityProject
from project_ted.models import Teds
from sqlalchemy.exc import SQLAlchemyError
from ted.models import Ted
from app import app
import relations
from app import db
from sqlalchemy import and_



from backend_utils.templates.api import ApiView
api = ApiView(class_instance=Teds, identifier_attr='',
              relationships=relations.relations)


@app.route('/api/project_ted', methods=['POST'])
def create_project_ted():
    data = request.json
    try:
        Teds(data)
        return jsonify({'status': 'success', 'description': 'Created', 'code': 201}), 201
    except SQLAlchemyError as e:
        return jsonify({'status': 'error', 'description': str(e), 'code': 400}), 400


@app.route('/api/project_ted', methods=['DELETE'])
def delete_project_ted(fk=None):
    data = request.json
    try:
        project = Teds.query.filter(Teds.activity_project == data.get('project', None),
                                    Teds.ted == data.get('ted', None)).first()
        db.session.delete(project)

        db.session.commit()

        return jsonify({'status': 'success', 'description': 'no content', 'code': 206}), 206
    except SQLAlchemyError as e:
        return jsonify({'status': 'error', 'description': str(e), 'code': 400}), 400



@app.route('/api/list/project_ted', methods=['GET'])
def list_project_ted():
    return  api.list(request, db)

