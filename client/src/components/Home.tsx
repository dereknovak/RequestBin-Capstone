import { useEffect, useState } from "react";
import service from "../services/requestbin_service";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ binList, setBinList }) => {
  const navigate = useNavigate();

  useEffect(() => {      
    (async () => {
      const allBins = await service.getAllBins();
      setBinList(allBins.slice()); // Can remove slice once this is an actual backend call
    })();
  }, [])
  
  const handleFormSubmission = async (formData) => {
    try {
      const newUrl = formData.get('new_url');
      
      if (binList.includes(newUrl)) throw new Error('Something went wrong');
      const newBin = await service.createBin(newUrl);

      const updatedList = binList.slice();
      updatedList.push(newBin);
      setBinList(updatedList);
      
      console.log('hello');
      navigate(`/bin/${newBin}`);
    } catch (err) {
      if (err) {
        alert(err.message);
      }
    }
  };

  const redirectHome = (e) => {
    e.preventDefault();
    navigate('/home');
  };
  
  return (
    <>
      <header>
      <h2 onClick={redirectHome}>RequestBin<em>Capstone</em></h2>
      </header>

      <main>
        <div id='home-flex' className='home-flex'>
          <NewBinForm onFormSubmission={handleFormSubmission}/>
          <Bins binList={binList} />
        </div>
      </main>
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
          required
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
          {binList.map((binUrl, idx) => {
            return (
              <li key={idx}>
                <Link to={`/bin/${binUrl}`} className='bin_list_link'>{binUrl}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Home;