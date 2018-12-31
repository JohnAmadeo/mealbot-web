import React from 'react';
import { connect } from 'react-redux';

import { uploadMembers, setCrossMatchTrait } from '../actions/members';
import Members from '../components/Members';

const mapStateToProps = state => ({ 
  org: state.orgs.orgs[state.orgs.selectedOrgId],
  crossMatchTraitId: state.members.crossMatchTraitId,
  members: state.members.members, 
  traits: state.members.traits,
})

const mapDispatchToProps = {
  onUploadMembersCSV: uploadMembers,
  setCrossMatchTrait,
};

let MembersContainer = ({
  onUploadMembersCSV,
  setCrossMatchTrait,
  ...props,
}) => (
  <Members 
    {...props}
    onUploadMembersCSV={
      csv => onUploadMembersCSV(props.auth, props.org, csv)
    }
    setCrossMatchTrait={
      trait => setCrossMatchTrait(props.auth, props.org, trait)
    }
    />
);

MembersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MembersContainer);

export default MembersContainer;