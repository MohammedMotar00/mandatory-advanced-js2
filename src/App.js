import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

import Main from './Components/Main';
import Add from './Components/Add';
import Edit from './Components/Edit';
import Details from './Components/Details';
import DeleteMovie from './Components/DeleteMovie';

function App() {
  return (
    <div className="App">
      <Router>

        <Route exact path="/" component={Main} />
        <Route path="/add" component={Add} />
        <Route path="/edit" component={Edit} />
        <Route path="/details" component={Details} />

        <Route path="/edit/:id" render={(props) => <Edit id={props.match.params.id} />} />
        <Route path="/details/:id" render={(props) => <Details id={props.match.params.id} />} />
        <Route path="/:id" render={(props) => <DeleteMovie id={props.match.params.id} />} />

        {/* <Route path="/edit/:id" render={(props) => <Edit id={props.match.params.id} />}/> */}
      </Router>
    </div>
  );
}

export default App;
