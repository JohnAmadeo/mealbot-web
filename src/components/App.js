import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Auth from '../auth/auth';
import DashboardContainer from '../containers/DashboardContainer';
import MembersContainer from '../containers/MembersContainer';
import PairingContainer from '../containers/PairingContainer';
import Landing from './Landing';
import Callback from './Callback';

console.log('starting');
const auth = new Auth();

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Route path="/" exact render={props => <Landing auth={auth}/>} />
          <Route 
            path="/members"
            exact
            // TODO: Wrap MembersContainer in Dashboard component
            // encapsulates left nav & error list 
            render={props => 
              <DashboardContainer auth={auth}>
                <MembersContainer auth={auth}/>
              </DashboardContainer> 
            } 
            />
          <Route 
            path="/pairing" 
            exact 
            render={props =>
              <DashboardContainer auth={auth}>
                <PairingContainer auth={auth} />
              </DashboardContainer> 
            } />
          <Route 
            path="/callback" 
            exact
            render={props => <Callback auth={auth} {...props}/>} 
            />
        </>
      </BrowserRouter>
    );
  }
}


export default App;