import { connect } from 'react-redux';
import { setMembers } from '../actions/index';
import Members from '../components/Members';

const mapStateToProps = state => ({ members: state.members })

const mapDispatchToProps = dispatch => ({
  // placeholder
  onUploadCSV: members => dispatch(setMembers(members))
})

const MembersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Members);

export default MembersContainer;