import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

import Main from './Components/Main';
import Add from './Components/Add';
import Edit from './Components/Edit';
import Details from './Components/Details';
import NavLinks from './Components/NavLinks';

function App() {
  return (
    <div className="App">
      <Router>

        <NavLinks />

        <Route exact path="/" component={Main} />
        <Route path="/add" component={Add} />

        <Route path="/edit/:id" render={(props) => <Edit id={props.match.params.id} />} />
        <Route path="/details/:id" render={(props) => <Details id={props.match.params.id} />} />

      </Router>
    </div>
  );
}

export default App;
