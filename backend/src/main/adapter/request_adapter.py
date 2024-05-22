from flask import Request
from src.types.http_request import HttpRequest


def request_adapter(request: Request):
    http_request = HttpRequest(
        headers=request.headers,
        body=None if "multipart/form-data" in request.content_type else request.json,
        query_params=request.args,
        url=request.full_path,
        files=request.files if "multipart/form-data" in request.content_type else None,
    )

    return http_request
