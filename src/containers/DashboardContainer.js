import React from 'react';
import { connect } from 'react-redux';

import { createOrg, selectOrg, fetchOrgs } from '../actions/orgs';
import { fetchDashboardData } from '../actions/dashboard';
import Dashboard from '../components/Dashboard';

const mapStateToProps = state => ({
  orgs: state.orgs.orgs,
  selectedOrgId: state.orgs.selectedOrgId,
})

const mapDispatchToProps = {
  createOrg,
  fetchDashboardData,
  fetchOrgs,
  selectOrg,
};

let DashboardContainer = ({ 
  createOrg,
  fetchDashboardData,
  fetchOrgs,
  selectOrg,
  ...props, 
}) => (
  <Dashboard 
    {...props} 
    createOrg={name => createOrg(props.auth, name)}
    fetchDashboardData={() => fetchDashboardData(props.auth)}
    fetchOrgs={() => fetchOrgs(props.auth)}
    selectOrg={org => selectOrg(props.auth, org)}
    />
);

DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer);

export default DashboardContainer;