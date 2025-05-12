import { useNavigate } from "react-router-dom";
import service from '../services/requestbin_service';

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

export default Options;