import { useState } from "react";

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
        <ul>
          {Object.entries(data).map((pair, idx) =>
            <li key={idx}>{pair[0]}: {pair[1]}</li>
          )}
        </ul>
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
          {JSON.stringify(data)}
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
        <ul>
          {Object.values(data).map((param, idx) =>
            <li key={idx}>{param}</li>
          )}
        </ul>
        </pre>
      </dt>
    );
  }
};

export default Request;
