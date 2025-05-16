import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../services/requestbin_service';

import Options from './Options';
import Request from './Request';

import clipboardIcon from '../assets/clipboard.svg';
import checkboxIcon from '../assets/checkbox.svg';

const Bin = ({ binList, setBinList }) => {
  const [bin, setBin] = useState('');
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  
  const params = useParams();

  const redirectHome = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  useEffect(() => {
    service.getAllRequests(params.bin_url).then(data => {
      // console.log(data);
      setRequests(data);
    });

    setBin(params.bin_url);
  }, []);

  return (
    <>
      <header>
        <h2 onClick={redirectHome}>RequestBin<em>Capstone</em></h2>
        <Options
          setRequests={setRequests}
          bin={params.bin_url}
          setBin={setBin}
          binList={binList}
          setBinList={setBinList}
        />
      </header>

      <main>
        <div id='bin-data'>
          <h1>Bin: {params.bin_url}</h1>
          <p className='request-count'>Requests: {requests.length}</p>
          <p>
            Requests are collected at <kbd>{`https://requestbincap.stone/${params.bin_url}`}</kbd>
            <CopyURLSpan url={params.bin_url} />
          </p>
        </div>

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

  const iconSrc = isCopied ? checkboxIcon : clipboardIcon;
  const altText = isCopied ? 'Copied' : 'Copy';

  return (
    <span onClick={copyToClipboard} title={altText}>
      <img id={isCopied ? 'checkbox' : 'clipboard'} src={iconSrc} alt={altText} />
    </span>
  );
};

export default Bin;
