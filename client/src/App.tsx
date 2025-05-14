import './App.css'
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom';

import Bin from './components/Bin';
import Home from './components/Home';

const App = () => {
  const [binList, setBinList] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home binList={binList} setBinList={setBinList} />} />
        <Route path='/bin/:bin_url' element={<Bin binList={binList} setBinList={setBinList} />} />
        <Route path='*' element={<Navigate to='/home' replace />} />
      </Routes>
    </Router>
  );
}

export default App
