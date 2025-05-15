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

const generateBin = async () => {
  const response = await fetch(`${baseUrl}/bins/generate`);

  return response.text();
};

const getAllBins = async () => {
  const response = await fetch(`${baseUrl}/bins`);
  return response.json();
};

const getAllRequests = async (bin_url) => {
  const response = await fetch(`${baseUrl}/bins/${bin_url}/requests`);

  return response.json();
};

const createBin = async (newBin) => {
  console.log(`${baseUrl}/bins`);
  const response = await fetch(`${baseUrl}/bins`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: newBin })
  });
  
  return response.json();
};

const deleteAllRequests = async (bin_url) => {
  const response = await fetch(`${baseUrl}/bins/${bin_url}/requests/all`, {
    method: 'DELETE',
  });

  return response;
};

const deleteBin = async (bin_url) => {
  const response = await fetch(`${baseUrl}/bins/${bin_url}`, {
    method: 'DELETE',
  });

  return response;
};

export default {
  generateBin,
  getAllBins,
  getAllRequests,
  createBin,
  deleteAllRequests,
  deleteBin
};