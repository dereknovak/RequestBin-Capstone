const baseUrl = '/api'

let requests = [
  {
    method: 'GET',
    timestamp: "06:31:14 PM 5/9/2025",
    path: "/yqgulne?Text=First+Dummy+Request",
    headers: "Accept: text/html" + 
      "Accept-Encoding: gzip, deflate, br, zstd" + 
      "Accept-Language: en-US,en;q=0.9,la;q=0.8" + 
      "Connection: close",
    queryParams: "Text=First+Dummy+Request",
    body: null
  },
  {
    method: 'POST',
    timestamp: "07:40:14 PM 5/9/2025",
    path: "/yqgulne?Text=Second+Dummy+Request+1&TextTwo=Second+Dummy+Request+2",
    headers: "Accept: text/html" + 
      "Accept-Encoding: gzip, deflate, br, zstd" + 
      "Accept-Language: en-US,en;q=0.9,la;q=0.8" + 
      "Connection: close",
    queryParams: "Text=Second+Dummy+Request+1&TextTwo=Second+Dummy+Request+2",
    body: `{"zen":"Second Dummy Request","hook_id":0123456789}`
  },
  {
    method: 'GET',
    timestamp: "08:45:14 PM 5/9/2025",
    path: "/yqgulne",
    headers: "Accept: text/html" + 
      "Accept-Encoding: gzip, deflate, br, zstd" + 
      "Accept-Language: en-US,en;q=0.9,la;q=0.8" + 
      "Connection: close",
    queryParams: null,
    body: null
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
  bins.push(`testbin${bins.length + 1}`);
  const newBin = await bins[bins.length - 1];
  return newBin;
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