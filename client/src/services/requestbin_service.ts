const baseUrl = '/api'

let requests = [
  {
    method: 'GET',
    timestamp: "06:31:14 PM 5/9/2025",
    path: "/yqgulne?Text=Hello+Momma",
    headers: "Accept: text/html" + 
      "Accept-Encoding: gzip, deflate, br, zstd" + 
      "Accept-Language: en-US,en;q=0.9,la;q=0.8" + 
      "Connection: close",
    query_params: "Text=First+Dummy+Request",
    body: null
  },
  {
    method: 'POST',
    timestamp: "07:40:14 PM 5/9/2025",
    path: "/yqgulne?Text=Hello+Momma",
    headers: "Accept: text/html" + 
      "Accept-Encoding: gzip, deflate, br, zstd" + 
      "Accept-Language: en-US,en;q=0.9,la;q=0.8" + 
      "Connection: close",
    query_params: "Text=Second+Dummy+Request",
    body: null
  },
  {
    method: 'GET',
    timestamp: "08:45:14 PM 5/9/2025",
    path: "/yqgulne",
    headers: "Accept: text/html" + 
      "Accept-Encoding: gzip, deflate, br, zstd" + 
      "Accept-Language: en-US,en;q=0.9,la;q=0.8" + 
      "Connection: close",
    query_params: null,
    body: `{"zen":"Third Dummy Request","hook_id":0123456789}`
  },
]

let bins = [
  "0p1s21h",
  "yqgulne",
  "f8ld6brsdf"
]

const getAllBins = async () => {
  return bins;
}

const getAllRequests = async () => {
  return requests;
}

const createBin = async () => {
  let counter = 1;
  bins.push(`testbin${counter + 1}`);
}

const deleteRequest = async (id) => {
  requests.splice(id, 1);
}

const deleteAllRequests = async (url) => {
  requests = [];
}

const deleteBin = async(url) => {
  bins = bins.filter((u) => u !== url);
}

export default {
  getAllBins,
  getAllRequests,
  createBin,
  deleteRequest,
  deleteAllRequests,
  deleteBin
}