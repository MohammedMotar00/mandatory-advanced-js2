import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

import Main from './Components/Main';
import Add from './Components/Add';
import Edit from './Components/Edit';
import Details from './Components/Details';
import NavLinks from './Components/NavLinks';

import Img from './img/image1.png';

function App() {
  return (
    <div className="App">
      <Router>

        <NavLinks />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h2 style={{ fontSize: '4rem' }}>EC Movie Editor</h2>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img 
                        src={Img} 
                        style={{ 
                            height: '20rem',
                            width: '20rem',
                            marginBottom: '2rem'
                    }}/>
                </div>

        <Route exact path="/" component={Main} />
        <Route path="/add" component={Add} />

        <Route path="/edit/:id" render={(props) => <Edit id={props.match.params.id} />} />
        <Route path="/details/:id" render={(props) => <Details id={props.match.params.id} />} />

      </Router>
    </div>
  );
}

export default App;
