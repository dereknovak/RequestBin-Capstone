import './App.css'
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom';

import Bin from './components/Bin';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/bin/:bin_url' element={<Bin />} />
        <Route path='*' element={<Navigate to='/home' replace />} />
      </Routes>
    </Router>
  );
}

export default App
