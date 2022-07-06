from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
import inspect
import json
from sqlalchemy import and_, join
from sqlalchemy import text, not_
from sqlalchemy.orm import class_mapper


class ApiView:
    def __init__(self, class_instance, identifier_attr, relationships):
        self.instance = class_instance
        self.id = identifier_attr
        self.relationships = relationships

    def list_entries(self, db, instance, fields, sorts, offset, quantity):
        if fields is not None and type(fields) == str:
            fields = json.loads(fields)
        if sorts is not None and type(sorts) == str:
            sorts = json.loads(sorts)

        queries = []
        applied_sorts = ''
        object_queries = []

        for i in fields:
            if i.get('type', None) == 'string':
                if i.get('different_from', False):  # DIFFERENT
                    queries.append(not_(getattr(instance, i.get('key', None)) == i.get('value', None)))
                elif i.get('equal_to', False):  # EQUALS
                    queries.append(getattr(instance, i.get('key', None)) == i.get('value', None))
                elif i.get('contains', False):  # CONTAINS
                    queries.append(getattr(instance, i.get('key', None)).ilike('%' + i.get('value', None) + '%'))
            elif i.get('type', None) == 'date' or i.get('type', None) == 'number':  # FILTER BY DATE OR NUMBER
                if i.get('less_than', False):  # LESS THAN THE NUMBER/DATE
                    queries.append(getattr(instance, i.get('key', None)) <= i.get('value', None))
                elif i.get('greater_than', False):  # MORE THAN THE NUMBER/DATE
                    queries.append(getattr(instance, i.get('key', None)) >= i.get('value', None))
                elif i.get('equal_to', False):  # EQUAL TO THE NUMBER/DATE
                    queries.append(getattr(instance, i.get('key', None)) == i.get('value', None))
            else:
                if i.get('type', None) == 'object' and i.get('sub_relation', None) is not None:
                    object_queries.append(i)
                else:
                    if i.get('different_from', False):
                        queries.append(getattr(instance, i.get('key', None)) != i.get('value', None))
                    else:
                        queries.append(getattr(instance, i.get('key', None)) == i.get('value', None))
        for i in sorts:
            if i.get('desc', False):
                applied_sorts += getattr(instance, i.get('key', None)).name + ' desc'
            else:
                applied_sorts += getattr(instance, i.get('key', None)).name + ' asc'

        if not queries:
            query = db.session.query(instance)
        else:
            query = db.session.query(instance).filter(and_(*queries))

        if len(self.relationships) > 0:
            already_joined = []
            for current_query in object_queries:
                relations = []
                current = current_query
                while current is not None:
                    relations.append(current.get('key', None))
                    current = current.get('sub_relation', None)

                last_relation = None
                joined = []
                for i in relations:
                    for j in self.relationships:
                        if j.get('key') == i and j.get('key') not in already_joined:
                            already_joined.append(j.get('key'))
                            joined.append(j.get('key'))
                            query = query.join(j.get('instance', None))
                        if last_relation is None and j.get('key') == relations[len(relations) - 2]:
                            last_relation = j.get('instance')

                if last_relation is not None:
                    query = query.filter(
                        getattr(last_relation, relations[len(relations) - 1]) == current_query.get('value', None))

        if not queries:
            query = query.order_by(text(applied_sorts)).offset(offset).limit(quantity)
        else:
            query = query.order_by(text(applied_sorts)).offset(offset).limit(quantity)

        return query

    def __find_relationship(self, key):
        response = None
        for i in self.relationships:
            if i.get('key', None) == key:
                response = i
        return response

    def parse_entry(self, entry):
        fields = []
        data = entry.__dict__
        for i in data:
            fields.append(i)

        for i in fields:
            relation = self.__find_relationship(i)

            if relation is not None and relation.get('instance', None) is not None:

                # try:
                entity = relation.get('instance', None).query.get(data[relation.get('key', None)])

                if entity is not None:
                    obj = self.parse_entry(entity)
                    obj = {k: v for (k, v) in obj.items()
                           if k != '_sa_instance_state'}

                    data[relation.get('key', None)] = obj

        data = {k: v for (k, v) in data.items()
                if k != '_sa_instance_state'}
        return data

    def put(self, request=None, identifier_value=None, package=None):
        data = request.json if package is None and request is not None else package
        try:
            entry = self.instance.query.get(identifier_value)
            if entry is not None:
                entry.update(data)
                return jsonify({'status': 'success', 'description': 'accepted', 'code': 202}), 202
            else:
                return jsonify({'status': 'error', 'description': 'not_found', 'code': 404}), 404
        except SQLAlchemyError as e:
            return jsonify({'status': 'error', 'description': str(e), 'code': 400}), 400

    def post(self, request=None, package=None):
        data = request.json if package is None and request is not None else package

        try:
            entry = self.instance(data)

            return jsonify(self.parse_entry(self.instance.query.get(entry.id))), 201
        except SQLAlchemyError as e:
            return jsonify({'status': 'error', 'description': str(e), 'code': 400}), 400

    def get(self, identifier_value):
        try:
            entry = self.instance.query.get(identifier_value)
            if entry is not None:
                return jsonify(self.parse_entry(entry)), 200
            else:
                return jsonify({'status': 'error', 'description': 'not_found', 'code': 404}), 404
        except SQLAlchemyError as e:
            return jsonify({'status': 'error', 'description': str(e), 'code': 400}), 400

    def delete(self, identifier_value, db):
        try:
            entry = self.instance.query.get(identifier_value)
            if entry is not None:
                db.session.delete(entry)
                db.session.commit()
                return jsonify({'status': 'success', 'description': 'no_content', 'code': 206}), 206
            else:
                return jsonify({'status': 'error', 'description': 'not_found', 'code': 404}), 404

        except SQLAlchemyError as e:
            return jsonify({'status': 'error', 'description': str(e), 'code': 400}), 400

    def list(self, request, db):
        data = request.args
        if data is None:
            data = dict()

        response = []
        query = self.list_entries(
            db=db,
            instance=self.instance,
            fields=data.get('filters', []),
            sorts=data.get('sorts', []),
            quantity=data.get('quantity', 15),
            offset=(int(data.get('page', 0)) * int(data.get('quantity', 15)))
        )
        for i in query:
            response.append(self.parse_entry(i))

        return jsonify(response), 200
