import { connect } from 'react-redux';

import { uploadMembers, setCrossMatchTrait } from '../actions/members';
import Members from '../components/Members';

const mapStateToProps = state => ({ 
  crossMatchTraitId: state.members.crossMatchTraitId,
  members: state.members.members, 
  traits: state.members.traits,
})

const mapDispatchToProps = {
  onUploadMembersCSV: uploadMembers,
  setCrossMatchTrait,
};

const MembersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Members);

export default MembersContainer;