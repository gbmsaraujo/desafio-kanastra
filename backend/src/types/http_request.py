
class HttpRequest:

    def __init__(
        self,
        headers: dict = None,
        body: dict = None,
        query_params: dict = None,
        url: str = None,
        token_information: dict = None,
        files: dict = None
    ):
        self.header = headers
        self.json = body
        self.query_params = query_params
        self.url = url
        self.token_information = token_information
        self.files = files
