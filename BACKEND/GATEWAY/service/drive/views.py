from werkzeug.utils import secure_filename
import os

from app import app, db
from service.drive.models import Upload
from flask import request, jsonify
from flask import send_from_directory
from flask_cors import cross_origin
from utils import Utils
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'json', 'docx', 'doc', 'pptx'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/drive/file', methods=['POST'])
def upload_file():
    data = request.json
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'description': 'unsupported media type', 'code': 415}), 415
    else:
        file = request.files['file']

        if file.filename == '':
            return jsonify({'status': 'success', 'description': 'no content', 'code': 204}), 204
        elif file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            up = Upload(file_name=file.filename, secure_file_name=filename, type=request.files['file'].content_type)
            db.session.add(up)
            db.session.commit()

            return jsonify(
                {
                    'status': 'created',
                    'description': 'File ' + str(file.filename) + ' uploaded',
                    'code': 201,
                    'data': up.id
                }
            ), 201
        else:
            print('SOME ERROR')
            return jsonify({'status': 'error', 'description': 'bad request', 'code': 400}), 400


@app.route('/drive/file', methods=['delete'])
def delete_file():
    data = request.json
    up = Upload.query.get(data.get('identifier', None))
    if up is not None:
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], up.secure_file_name))
        return jsonify({'status': 'success', 'description': 'no content', 'code': 206}), 206
    else:
        return jsonify({'sta    tus': 'error', 'description': 'not found', 'code': 404}), 404


@app.route('/drive/file', methods=['GET'])
def download_file():
    data = request.args
    up = Upload.query.get(data.get('identifier', None))

    if up is not None:

        return send_from_directory(path=app.config["UPLOAD_FOLDER"] + '/' + up.secure_file_name,
                                   directory=app.config["UPLOAD_FOLDER"] + '/', filename=up.secure_file_name,
                                   as_attachment=True, attachment_filename=up.file_name)
    else:
        return jsonify({'status': 'error', 'description': 'not found', 'code': 404}), 404


@app.route('/drive/file_name', methods=['GET'])
def file_name():
    data = request.args
    up = Upload.query.get(data.get('identifier', None))
    if up is not None:
        return jsonify({'status': 'success', 'description': 'OK', 'data': up.file_name, 'code': 200}), 200
    else:
        return jsonify({'status': 'error', 'description': 'not found', 'code': 404}), 404
