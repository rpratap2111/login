import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import RefereshHandler from './RefereshHandler';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => { 
    return isAuthenticated ? element : <Navigate to="/login"/>
  }

  return (
    <div className="App">
      <ToastContainer />
      <RefereshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/" element={<Navigate to = '/login'/>} />
        <Route path="/home" element={<PrivateRoute element={<Home/>}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
