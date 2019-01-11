import React from 'react';
import { connect } from 'react-redux';

import { uploadMembers, setCrossMatchTrait } from '../actions/members';
import CrossMatchTrait from '../components/CrossMatchTrait';

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

let CrossMatchTraitContainer = ({
  onUploadMembersCSV,
  setCrossMatchTrait,
  ...props,
}) => (
  <CrossMatchTrait
    {...props}
    onUploadMembersCSV={
      csv => onUploadMembersCSV(props.auth, props.org, csv)
    }
    setCrossMatchTrait={
      trait => setCrossMatchTrait(props.auth, props.org, trait)
    }
  />
);

CrossMatchTraitContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CrossMatchTraitContainer);

export default CrossMatchTraitContainer;