request1 = {
    "id": "Test1", # Mongo Doc ID as string
    "method": 'GET',
    "timestamp": "06:31:14 PM 5/9/2025",
    "path": "/yqgulne?Text=First+Dummy+Request",
    "headers": {
        "Accept": "text/html",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9,la;q=0.8",
        "Connection": "close",
    },
    "queryParams": {"Text": "First+Dummy+Request"},
    "body": None
  }

request2 = {
    "id": "Test2",
    "method": 'POST',
    "timestamp": "07:40:14 PM 5/9/2025",
    "path": "/yqgulne?Text=Second+Dummy+Request+1&TextTwo=Second+Dummy+Request+2",
    "headers": {
        "Accept": "text/html",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9,la;q=0.8",
        "Connection": "close",
    },
    "queryParams": "Text=Second+Dummy+Request+1&TextTwo=Second+Dummy+Request+2",
    "body": {"zen":"Second Dummy Request","hook_id":"0123456789"}
  }

request3 = {
    "id": "Test3",
    "method": 'GET',
    "timestamp": "08:45:14 PM 5/9/2025",
    "path": "/yqgulne",
    "headers": {
        "Accept": "text/html",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9,la;q=0.8",
        "Connection": "close",
    },
    "queryParams": None,
    "body": None
  }

requests = [request1, request2, request3]

bins = [
  "0p1s21h",
  "yqgulne",
  "f8ld6brsdf"
]

def mock_delete_bin(bin_url):
  bins.remove(bin_url)
