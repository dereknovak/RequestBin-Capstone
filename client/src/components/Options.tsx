import { useNavigate } from "react-router-dom";
import service from '../services/requestbin_service';

const Options = ({ setRequests, bin, binList, setBinList }) => {
  const navigate = useNavigate();

  const handleBurn = () => {
    service.deleteAllRequests(bin);
    setRequests([]);
  };

  const handleDelete = () => {
    service.deleteBin(bin);
    setRequests([]);
    setBinList(binList.filter(b => b !== bin));
    
    navigate('/home');
  };

  return (
    <div id='options'>
      <button id='burn-button' type='button' onClick={handleBurn}>Burn</button>
      <button id='delete-button' type='button' onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Options;