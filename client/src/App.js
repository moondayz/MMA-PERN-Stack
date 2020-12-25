import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

//components
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';


// <Route exact path='/login' render={props}/> exact prevents clashing the urls, uris - 
// render props , doesnt remout each time after sending the props

toast.configure(); 

function App() {

  // Validate JWT token when refreshed
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []); // runs only once when rendered thanks to []

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
  <Fragment>
    <Router>
      <div className="container">
        <Switch>
        <Route exact path='/' render={props => !isAuthenticated ? (
            <Home {...props} setAuth={setAuth} />
          ) : (
              <Redirect to="/" />
            )} />
          <Route exact path='/login' render={props => !isAuthenticated ? (
            <Login {...props} setAuth={setAuth} />
          ) : (
              <Redirect to="/dashboard" />
            )} />
          <Route exact path='/register' render={props => !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )} />
          <Route exact path='/dashboard' render={props => isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )} />
        </Switch>
      </div>
    </Router>
  </Fragment>
  )
}

export default App;
