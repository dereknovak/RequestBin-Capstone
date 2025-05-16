from flask import Flask, request, jsonify
from datetime import datetime

def parse(request):
    method = request.method
    headers = request.headers
    body = request.get_data(as_text=True)
    params = request.args
    path = request.path
    time = datetime.now().isoformat()

    header_array = {}

    for (x, y) in headers:
        header_array[x] = y

    query_params = {}
    for x in params:
        query_params[x] = params[x]

    full_path = path
    if(len(query_params) != 0):
        full_path = full_path + "?"
        for query in query_params:
            full_path = full_path + query + "=" + query_params[query] + "&"
        full_path = full_path[:-1]

    data = {
        "method": method,
        "timestamp": time,
        "path": full_path,
        "headers": header_array,
        "query_params": query_params,
        "body": body,
        "bin_url": path.split('/')[1]
    }

    return data