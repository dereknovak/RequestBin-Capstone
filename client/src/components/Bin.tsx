import { useState, useEffect } from 'react';
import service from '../services/requestbin_service';

const Bin = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    service.getAllRequests().then(data => {
      setRequests(data);
    });
  }, []);

  return (
    <>
      <header>
        <h2>RequestBin</h2>
        <Options />
      </header>

      <main>
        <h1>Basket: Path</h1>
        <p>Requests are collected at Bin_URL</p>
        <p>Requests: {requests.length}</p>

        <ul>
          {requests.map(request => 
            <Request key={request.timestamp} data={request} /> // Change key to something other than timestamp
          )}
        </ul>
      </main>
    </>
  )
};

const Options = () => {
  return (
    <div id='options'>
      <button type='button'>Burn</button>
      <button type='button'>Delete</button>
    </div>
  );
};

const Request = ({ data }) => {
  return (
    <li>
      <ul>
        <div>
          <li>{data.method}</li>
          <li>{data.timestamp}</li>
        </div>

        <li>{data.path}</li>
        <li>{data.header}</li>
        <li>{data.query_params || 'NO PARAMS'}</li>
      </ul>
    </li>
  );
};

export default Bin;