import requests
from simplejson.errors import JSONDecodeError
from flask import jsonify


def make_request(service_mask, service_url, request, headers, service_id, user=None):
    headers = {
        'authorization':user,
        'content_type': headers.get('content_type', None),
    }

    try:
        if request.method == 'GET':
            res = requests.get(service_url + request.full_path.replace('/'+service_mask, ''), headers=headers)
        elif request.method == 'POST':
            res = requests.post(service_url + request.path.replace('/'+service_mask, ''), headers=headers, json=request.json, files=request.files)
        elif request.method == 'PUT':
            res = requests.put(service_url + request.full_path.replace('/'+service_mask, ''), headers=headers, json=request.json)
        elif request.method == 'DELETE':
            res = requests.delete(service_url + request.full_path.replace('/'+service_mask, ''), headers=headers, json=request.json)
        else:
            res = None
        try:
            if res is None:
                raise JSONDecodeError
            else:
                package = res.json()
        except JSONDecodeError:
            package = None
        if package is None:
            return [jsonify({'status': res.status_code, 'response_time': res.elapsed.microseconds}), res.status_code]
        else:
            return [jsonify(package), res.status_code]
    except (
            requests.exceptions.Timeout,
            requests.exceptions.ConnectionError,
            requests.exceptions.InvalidSchema
    ) as e:
        error_code = 504 if e is requests.exceptions.Timeout else 400
        return [jsonify({'error': str(e)}), error_code]
