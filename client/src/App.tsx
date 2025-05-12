import './App.css'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';

import Bin from './components/Bin';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/bin/:bin_url' element={<Bin />} />
      </Routes>
    </Router>
  );
}

export default App
