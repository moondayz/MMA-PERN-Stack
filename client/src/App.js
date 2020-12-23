import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
//components
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';

// <Route exact path='/login' render={props}/> exact prevents clashing the urls, uris - 
// render props , doesnt remout each time after sending the props
 

function App() {
  return <Fragment>
    <Router>
      <div className="container">
        <Switch>
          <Route exact path='/login' render={props => <Login {...props} /> }/> 
          <Route exact path='/register' render={props => <Register {...props} /> } />
          <Route exact path='/dashboard' render={props => <Dashboard {...props} /> } />
        </Switch>
      </div>
    </Router>
  </Fragment>

}

export default App;
