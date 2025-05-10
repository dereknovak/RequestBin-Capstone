import { useState, useEffect } from 'react';
import service from '../services/requestbin_service';
import { useNavigate } from 'react-router-dom';

const Bin = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const redirectHome = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  useEffect(() => {
    service.getAllRequests().then(data => {
      setRequests(data);
    });
  }, []);

  return (
    <>
      <header>
        <a href='#' onClick={redirectHome}><h2>RequestBin</h2></a>
        <Options setRequests={setRequests} />
      </header>

      <main>
        <h1>Bin: Path</h1>
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

const Options = ({ setRequests }) => {
  const navigate = useNavigate();

  const handleBurn = () => {
    service.deleteAllRequests('FAKE_URL');
    setRequests([]);
  };

  const handleDelete = () => {
    service.deleteBin('FAKE_URL');
    setRequests([]);

    navigate('/home');
  };

  return (
    <div id='options'>
      <button type='button' onClick={handleBurn}>Burn</button>
      <button type='button' onClick={handleDelete}>Delete</button>
    </div>
  );
};

const Request = ({ data }) => {
  return (
    <li>
      <dl>
        <div className='left-request-info'>
          <Method data={data.method} />
          <TimeStamp data={data.timestamp} />
        </div>
        <div className='right-request-info'>
          <Path data={data.path} />
          <Headers data={data.headers} />
          <QueryParams data={data.queryParams} />
        </div>
      </dl>
    </li>
  );
};

const Method = ({ data }) => {
  return (
    <dt>{data}</dt>
  );
};

const TimeStamp = ({ data }) => {
  return (
    <dt>{data}</dt>
  );
};

const Path = ({ data }) => {
  return (
    <dt>{data}</dt>
  )
};

const Headers = ({ data }) => {
  return (
    <dt>
      <button type='button'>Headers</button>
      <pre>
        {data}
      </pre>
    </dt>
  );
};

const QueryParams = ({ data }) => {
  return (
    <dt>
      <button type='button'>Query Parameters</button>
      <pre>{data || 'NO PARAMS'}</pre>
    </dt>
  );
};

export default Bin;
