const baseUrl = 'http://localhost:5003/api';

let requests_yqgulne = [
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

let requests_0p1s21h = [
  {
    method: 'GET',
    timestamp: "06:31:14 PM 5/9/2025",
    path: "/0p1s21h?Text=First+Dummy+Request",
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
    path: "/0p1s21h?Text=Second+Dummy+Request+1&TextTwo=Second+Dummy+Request+2",
    headers: "Accept: text/html" + 
      "Accept-Encoding: gzip, deflate, br, zstd" + 
      "Accept-Language: en-US,en;q=0.9,la;q=0.8" + 
      "Connection: close",
    queryParams: "Text=Second+Dummy+Request+1&TextTwo=Second+Dummy+Request+2",
    body: `{"zen":"Second Dummy Request","hook_id":0123456789}`
  }
];

// let bins = [
//   "0p1s21h",
//   "yqgulne",
//   "f8ld6brsdf"
// ]

const getAllBins = async () => {
  const bins = await fetch(`${baseUrl}/bins`);
  console.log(bins);
  return bins;
}

const getAllRequests = async (bin_url) => {
  if (bin_url === 'yqgulne') {
    return requests_yqgulne;
  } else if (bin_url === '0p1s21h') {
    return requests_0p1s21h;
  } else {
    return [];  
  }
}

const createBin = async (newBin) => {
  bins.push(newBin);
  
  return newBin;
}

const deleteRequest = async (id) => {
  requests.splice(id, 1);
}

const deleteAllRequests = async (bin_url) => {
  if (bin_url === 'yqgulne') {
    requests_yqgulne = [];
  } else if (bin_url === '0p1s21h') {
    requests_0p1s21h = [];
  }
}

const deleteBin = async (bin_url) => {
  bins = bins.filter((u) => u !== bin_url);
}

export default {
  getAllBins,
  getAllRequests,
  createBin,
  deleteRequest,
  deleteAllRequests,
  deleteBin
}