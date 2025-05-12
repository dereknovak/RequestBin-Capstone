import { useEffect, useState } from "react";
import requestbin_service from "../services/requestbin_service";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [binList, setBinList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {      
    (async () => {
      const allBins = await requestbin_service.getAllBins();
      setBinList(allBins.slice()); // Can remove slice once this is an actual backend call
    })();
  }, [])
  
  const handleFormSubmission = async (formData) => {
    const newBin = await requestbin_service.createBin(formData.get('new_url'));
    /* Placeholder for error handling if duplicate is found */
    const updatedList = binList.slice();
    updatedList.push(newBin);
    setBinList(updatedList);
  };

  const redirectHome = (e) => {
    e.preventDefault();
    navigate('/home');
  };
  
  return (
    <>
      <header>
        <h2 onClick={redirectHome}>RequestBin</h2>
      </header>

      <div id='home-flex' className='home-flex'>
        <NewBinForm onFormSubmission = {handleFormSubmission}/>
        <Bins binList={binList} />
      </div>
    </>  
  )
}  

const NewBinForm = ({ onFormSubmission }) => {
  const [newUrl, setNewUrl] = useState(''); // BE Service to generate intial url
  
  const handleFormUrlChange = (e) => {
    setNewUrl(e.target.value);
  };  
  
  return (
    <div id='new_bin_form' className='new_bin_form'>
      <form id='new_bin_form' action={onFormSubmission}>
        <h1>New Basket</h1>
        <p>Click the button below to create a new basket!</p>
        <label htmlFor='new_url'>https://requestbincap.stone/</label>
        <input
          id='new_url'
          name='new_url'
          className='new_url'
          value={newUrl}
          onChange={handleFormUrlChange}    
          ></input>
        <button>Create!</button>
      </form>
    </div>     
  )
};  

const Bins = ({ binList }) => {
  return (
    <div id='bin_list' className='bin_list'>
      <div id='bin_list_label'><h3>Available Bins:</h3></div>
      <div id='bin_list_items' className='bin_list_items'>
        <ul>
          {binList.map((bin_url, idx) => {
            return (
              <li key={idx}>
                <Link to={`/bin/${bin_url}`} className='bin_list_link'>{bin_url}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Home;