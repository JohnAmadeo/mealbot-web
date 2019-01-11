import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

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
const GlobalStyle = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900');
    margin: 0;
  }

  * {
    box-sizing: border-box;
    font-family: Helvetica, sans-serif;
    font-weight: lighter;
  }
`;

class App extends React.Component {
  render() {
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
        {/* ugly styled-components API; semantically confusing in React */}
        {/* <GlobalStyle/> */}
        <BrowserRouter>
          <>
            <Route path="/" exact render={props => <Landing auth={auth}/>} />
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={`/${route.path}`}
                exact
                render={props =>
                  <DashboardContainer
                    auth={auth}
                    routes={routes}
                    selectedRouteId={idx}
                  >
                    <ErrorListContainer />
                    {route.component}
                  </DashboardContainer>
                }
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


export default App;