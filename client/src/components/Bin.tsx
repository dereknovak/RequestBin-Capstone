import { useState, useEffect } from 'react';
import service from '../services/requestbin_service';
import { useNavigate, useParams } from 'react-router-dom';

import Options from './Options';
import Request from './Request';

const Bin = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  // const url = useParams().url
  const url = 'yqgulne';

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
        <h1>Bin: {url}</h1>
        <p>
          Requests are collected at <kbd>{`https://requestbincap.stone/${url}`}</kbd>
          <CopyURLSpan url={url} />
        </p>
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

const CopyURLSpan = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`https://requestbincap.stone/${url}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (isCopied) {
    return (
      <span onClick={copyToClipboard} title='URL is copied to your clipboard'>
        <img id='checkbox' src='src/assets/checkbox.svg' />
      </span>
    );
  } else {
    return (
      <span onClick={copyToClipboard} title='URL copied'>
        <img id='clipboard' src='src/assets/clipboard.svg' />
      </span>
    );
  }
}


export default Bin;
