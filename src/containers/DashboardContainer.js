import React from 'react';
import { connect } from 'react-redux';

import { createOrg, fetchOrgs, selectOrg } from '../actions/orgs';
import Dashboard from '../components/Dashboard';

const mapStateToProps = state => ({
  orgs: state.orgs.orgs,
  selectedOrgId: state.orgs.selectedOrgId,
})

const mapDispatchToProps = {
  createOrg,
  fetchOrgs,
  selectOrg,
};

let DashboardContainer = ({ 
  createOrg,
  fetchOrgs,
  selectOrg,
  ...props, 
}) => (
  <Dashboard 
    {...props} 
    createOrg={name => createOrg(props.auth, name)}
    fetchOrgs={() => fetchOrgs(props.auth)}
    selectOrg={org => selectOrg(props.auth, org)}
    />
);

DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer);

export default DashboardContainer;