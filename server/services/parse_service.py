from flask import Flask, request, jsonify
from datetime import datetime

def parse(request):
    method = request.method
    headers = request.headers
    body = request.get_data(as_text=True)
    #params = request.query_string
    params = request.args
    path = request.path
    time = datetime.now().isoformat()

    header_array = {}

    for (x, y) in headers:
        header_array[x] = y

    param_array = {}
    for x in params:
        param_array[x] = params[x]

    data = {
        "method": method,
        "timestamp": time,
        "path": path,
        "headers": header_array,
        "query_params": param_array,
        "body": body
    }

    return data
