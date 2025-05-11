import { useEffect, useState } from "react";
import requestbin_service from "../services/requestbin_service";

const Home = () => {
  
  return (
    <div id='home-flex' className='home-flex'>
      <NewBinForm />
      <Bins />
    </div>
  )
}

const NewBinForm = () => {
  return (
    <div id='new_bin_form' className='new_bin_form'>
      <form id='new_bin_form' onSubmit={(e) => e.preventDefault()}>
        <h1>New Basket</h1>
        <p>Click the button below to create a new basket!</p>
        <label htmlFor='new_url'>https://requestbincap.stone/</label>
        <input id='new_url' className='new_url' value='testbin'></input>
        <button>Create!</button>
      </form>
    </div> 
  )
};

const Bins = () => {
  const [binList, setBinList] = useState([]);
  
  useEffect(() => {      
    (async () => {
      const requestBins = await requestbin_service.getAllBins();
      setBinList(requestBins);
    })();
  }, [])

  return (
    <div id='bin_list' className='bin_list'>
      <div id='bin_list_label'>Available Bins:</div>
      <div id='bin_list_items' className='bin_list_items'>
        <ul>
          {binList.map((bin_url, idx) => {
            return (
              <li key={idx}>
                <a href={`/bin/${bin_url}`} className='bin_list_link'>{bin_url}</a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Home;