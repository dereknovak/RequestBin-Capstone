import { useNavigate } from "react-router-dom";
import service from '../services/requestbin_service';

const Options = ({ setRequests, bin, setBin, binList, setBinList }) => {
  const navigate = useNavigate();

  const handleBurn = () => {
    service.deleteAllRequests('FAKE_URL');
    setRequests([]);
  };

  const handleDelete = () => {
    console.log(bin);
    service.deleteBin(bin);
    setBinList(binList.filter(b => b !== bin));
    setBin('');
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

export default Options;