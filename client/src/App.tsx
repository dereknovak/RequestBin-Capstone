import './App.css'

import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';

// import Home from './components/Home';
import Bin from './components/Bin';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='/bin' element={<Bin />} />
      </Routes>
    </Router>
  );
}

export default App
