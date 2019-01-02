import React from 'react';
import { connect } from 'react-redux';

import Pairing from '../components/Pairing';
import { 
  addRound, 
  changeRoundDate, 
  removeRound, 
  setRoundFocus,
  setSelectedRoundPairsId,
} from '../actions/pairing';

const mapStateToProps = state => ({
  isRoundFocused: state.pairing.isRoundFocused,
  org: state.orgs.orgs[state.orgs.selectedOrgId],
  rounds: state.pairing.rounds,
  roundPairs: state.pairing.roundPairs,
  selectedRoundPairsId: state.pairing.selectedRoundPairsId,
});

const mapDispatchToProps = {
  addRound,
  changeRoundDate,
  removeRound,
  setRoundFocus,
  setSelectedRoundPairsId,
};

let PairingContainer = ({
  addRound,
  changeRoundDate,
  removeRound,
  ...props,
}) => (
    <Pairing
      {...props}
      addRound={round => addRound(props.auth, props.org, round)}
      changeRoundDate={(roundId, round) =>
        changeRoundDate(props.auth, props.org, roundId, round)
      }
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