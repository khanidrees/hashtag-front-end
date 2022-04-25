import logo from './logo.svg';
import './App.css';

import { useEffect, useState} from 'react';

import { BrowserRouter, Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import { getToken, removeUserSession, setUserSession,isLoggedIn } from './utils/Common';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import RequireAuth from './components/RequireAuth';
import Message from './components/Message';

function App() {
  
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:8000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
      <BrowserRouter>
        {/* <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
          </div>
          <div className="content"> */}
            <Routes>
              {/* <Route exact path="/" component={Home} /> */}
              <Route path="/login"
              element={<Login />}
              />
              
              <Route path="/dashboard"
              element={
              <RequireAuth>
                <Dashboard/>
              </RequireAuth>
              } />
              <Route path="/message/:id"
              element={
              <RequireAuth>
                <Message/>
              </RequireAuth>
              } />
            </Routes>
          {/* </div>
        </div> */}
      </BrowserRouter>
  );
}

export default App;
