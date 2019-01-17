import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from './Navbar';
import OrganizationSelect from './OrganizationSelect';

class Dashboard extends React.Component {
  state = {
    loggedOut: false,
  }

  componentDidMount() {
    if (this.props.orgs.length === 0) {
      this.props.fetchDashboardData();
      // this.props.fetchOrgs();
    } 
  }

  render() {
    const { 
      createOrg, 
      orgs, 
      routes, 
      selectedOrgId, 
      selectedRouteId 
    } = this.props;
    const options = orgs.map(org => ({ value: org, label: org }));

    return !this.state.loggedOut ? (
      <StyledDashboard>
        <LeftPanel>
          <LeftPanelContainer>
            <Select
              onChange={option => this.props.selectOrg(option.value)}
              options={options}
              value={options[selectedOrgId]}
              />

            <OrganizationSelect
              createOrg={createOrg}
              />

            {orgs.length > 0 && 
            <Navbar
              routes={routes}
              selectedRouteId={selectedRouteId}
              />
            }

            <LogOutButton
              onClick={() => {
                this.setState({ loggedOut: true });
                this.props.auth.logout();
              }}
              >
              Log Out
            </LogOutButton>
          </LeftPanelContainer>
        </LeftPanel>
        <Tab>
          {this.props.children}
        </Tab>
      </StyledDashboard>
    ) : (
      <Redirect to="/" />
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  createOrg: PropTypes.func.isRequired,
  fetchDashboardData: PropTypes.func.isRequired,
  orgs: PropTypes.arrayOf(PropTypes.string).isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.element,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  selectOrg: PropTypes.func.isRequired,
  selectedOrgId: PropTypes.number,
  selectedRouteId: PropTypes.number.isRequired,
};

const StyledDashboard = styled.div`
  color: midnightblue;
  display: flex;
  flex-direction: row;
  font-size: 14px;
`;

const LogOutButton = styled.button`
  bottom: 0;  
  position: absolute;

  background: midnightblue;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  height: 38px;
  width: 100%;

  &:hover {
    background: royalblue;
    cursor: pointer;
  }
`;

const LeftPanel = styled.div`
  background: whitesmoke;
  bottom: 0;
  height: 100vh;
  left:0;
  padding: 24px;
  position: fixed;
  top: 0;
  width: 240px;
`;

const LeftPanelContainer = styled.div`
  height: 100%;
  position: relative;
`;

const Tab = styled.div`
  margin: 0 0 0 240px;
  width: calc(100% - 240px);
`;

export default Dashboard;