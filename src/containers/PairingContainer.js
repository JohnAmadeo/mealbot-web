import React from 'react';
import { connect } from 'react-redux';

import Pairing from '../components/Pairing';
import { 
  addRound, 
  changeRoundDate, 
  fetchPairs,
  fetchRounds,
  removeRound, 
  setRoundFocus,
} from '../actions/pairing';

const mapStateToProps = state => ({
  isRoundFocused: state.pairing.isRoundFocused,
  org: state.orgs.orgs[state.orgs.selectedOrgId],
  pairs: state.pairing.pairs,
  rounds: state.pairing.rounds,
});

const mapDispatchToProps = {
  addRound,
  changeRoundDate,
  fetchPairs,
  fetchRounds,
  removeRound,
  setRoundFocus,
};

let PairingContainer = ({
  addRound,
  changeRoundDate,
  fetchPairs,
  fetchRounds,
  removeRound,
  ...props,
}) => (
    <Pairing
      {...props}
      addRound={round => addRound(props.auth, props.org, round)}
      changeRoundDate={(roundId, round) =>
        changeRoundDate(props.auth, props.org, roundId, round)
      }
      fetchPairs={
        roundId => fetchPairs(props.auth, props.org, roundId)
      }
      fetchRounds={() => fetchRounds(props.auth, props.org)}
      removeRound={
        roundId => removeRound(props.auth, props.org, roundId)
      }
      />
  );

PairingContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PairingContainer);

export default PairingContainer;