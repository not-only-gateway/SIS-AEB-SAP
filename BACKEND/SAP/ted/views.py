from flask import jsonify
from flask import request
from ted.models import Ted
from sqlalchemy.exc import SQLAlchemyError
from app import app
import relations
from app import db
from associative.action.models import Action
from associative.decentralized_unit.models import DecentralizedUnit
from structural.models import Unit
from workplan.workplan.models import WorkPlan
from backend_utils.templates.api import ApiView
from publisher import publish_ted_notify
import json
from project_ted.models import Teds
from copy_entry_structure import copy_wp

api = ApiView(class_instance=Ted, identifier_attr='id',
              relationships=relations.relations)



@app.route('/api/ted_addendum', methods=['POST'])
def create_additive():
    data = request.json
    related_ted = Ted.query.get(data.get('addendum_ted', None))

    if related_ted is not None:
        parent_ted = related_ted if related_ted.addendum_ted is None else Ted.query.get(related_ted.addendum_ted)
        wps = WorkPlan.query.filter(WorkPlan.ted == parent_ted.id)
        parsed_wps = []
        new_ted = Ted(data)
        for i in wps:
            d = WorkPlan.query.get(i.id).__dict__
            Teds({
                'activity_project': i.activity_project,
                'ted': new_ted.id
            })
            d['ted'] = new_ted.id
            parsed_wps.append(d)

        res = copy_wp(request.json)
        return jsonify(res[0]), res[1]
    else:
        return jsonify({'status': 'error', 'description': 'not_found', 'code': 404}), 404

@app.route('/api/ted', methods=['POST', 'GET', 'PUT', 'DELETE'])
def ted():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        res = api.post(request)
        try:
            ted = Ted.query.get(json.loads(res[0].data).get('id', None))
            publish_ted_notify(ted, request.headers.get('Authorization', None))
        except json.decoder.JSONDecodeError:
            pass
        return res
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/ted', methods=['GET'])
def list_ted():
    return api.list(request, db)
