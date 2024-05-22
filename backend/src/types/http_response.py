class HttpResponse:
    def __init__(self, status_code: int, response, message: str) -> None:
        self.status_code = status_code
        self.message = message
        self.response = response
