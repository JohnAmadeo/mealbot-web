import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Auth from '../auth/auth';
import CrossMatchTraitContainer from '../containers/CrossMatchTraitContainer';
import DashboardContainer from '../containers/DashboardContainer';
import MembersContainer from '../containers/MembersContainer';
import PairsContainer from '../containers/PairsContainer';
import Landing from './Landing';
import Callback from './Callback';
import RoundsContainer from '../containers/RoundsContainer';
import ErrorListContainer from '../containers/ErrorListContainer';

const auth = new Auth();

class App extends React.Component {
  render() {
    const orgs = this.props.orgs;
    const routes = [
      {
        component: <MembersContainer auth={auth} />,
        path: 'members',
        title: 'Members',
      },
      {
        component: <PairsContainer auth={auth} />,
        path: 'pairs',
        title: 'Pairs',
      },
      {
        component: <CrossMatchTraitContainer auth={auth} />,
        path: 'crossmatchtrait',
        title: 'Cross Match Trait',
      },
      {
        component: <RoundsContainer auth={auth} />,
        path: 'rounds',
        title: 'Rounds',        
      }
    ];

    return (
      <>
        <BrowserRouter>
          <>
            <Route path="/" exact render={props => <Landing auth={auth}/>} />
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={`/${route.path}`}
                exact
                render={props => auth.isAuthenticated() ? (
                  <DashboardContainer
                    auth={auth}
                    routes={routes}
                    selectedRouteId={idx}
                    >
                    <ErrorListContainer />
                    {orgs.length > 0 ? route.component : <></>}
                  </DashboardContainer>
                ) : (
                  <Redirect to="/" />
                )}
                />
            ))}
            <Route 
              path="/callback" 
              exact
              render={props => <Callback auth={auth} {...props}/>} 
              />
          </>
        </BrowserRouter>
      </>
    );
  }
}

App.propTypes = {
  orgs: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default App;