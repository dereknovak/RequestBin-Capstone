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

        <ol>
          {requests.map(request => 
            <Request key={request.timestamp} data={request} /> // Change key to something other than timestamp
          )}
        </ol>
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
      <dl>
        <div className='left-request-info'>
          <dt>{data.method}</dt>
          <dt>{data.timestamp}</dt>
        </div>
        <div className='right-request-info'>
          <dt>{data.path}</dt>
          <dt>{data.header}</dt>
          <dt>{data.query_params || 'NO PARAMS'}</dt>
        </div>
      </dl>
    </li>
  );
};

export default Bin;