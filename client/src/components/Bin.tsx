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
        <h2 onClick={redirectHome}>RequestBin</h2>
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
      <button id='burn-button' type='button' onClick={handleBurn}>Burn</button>
      <button id='delete-button' type='button' onClick={handleDelete}>Delete</button>
    </div>
  );
};

const Request = ({ data }) => {
  const [visibility, setVisibility] = useState({
    headers: 'hidden',
    body: 'hidden',
    queryParams: 'hidden'
  });

  const toggleVisibility = (prop) => {
    const newStatus = visibility[prop] === 'visible' ? 'hidden' : 'visible';

    setVisibility({
      ...visibility,
      [prop]: newStatus,
    });
  };

  return (
    <li>
      <dl>
        <div className='left-request-info'>
          <Method data={data.method} />
          <TimeStamp data={data.timestamp} />
        </div>
        <div className='right-request-info'>
          <Path data={data.path} />
          <Headers
            data={data.headers}
            visibility={visibility}
            toggleVisibility={toggleVisibility} />
          <Body
            data={data.body}
            visibility={visibility}
            toggleVisibility={toggleVisibility} />
          <QueryParams
            data={data.queryParams}
            visibility={visibility}
            toggleVisibility={toggleVisibility} />
        </div>
      </dl>
    </li>
  );
};

const Method = ({ data }) => {
  return (
    <dt className='method'>[{data}]</dt>
  );
};

const TimeStamp = ({ data }) => {
  return (
    <dt>{data}</dt>
  );
};

const Path = ({ data }) => {
  return (
    <dt className='path'>{data}</dt>
  )
};

const Headers = ({ data, visibility, toggleVisibility }) => {
  return (
    <dt>
      <button type='button' onClick={() => toggleVisibility('headers')}>Headers</button>
      <pre className={visibility.headers}>
        {data}
      </pre>
    </dt>
  );
};

const Body = ({ data, visibility, toggleVisibility }) => {
  if (data) {
    return (
      <dt>
        <button type='button' onClick={() => toggleVisibility('body')}>Body</button>
        <pre className={visibility.body}>
          {data}
        </pre>
      </dt>
    );
  }
};

const QueryParams = ({ data, visibility, toggleVisibility }) => {
  if (data) {
    return (
      <dt>
        <button type='button' onClick={() => toggleVisibility('queryParams')}>Query Parameters</button>
        <pre className={visibility.queryParams}>
          {data || 'NO PARAMS'}
        </pre>
      </dt>
    );
  }
};

export default Bin;
