import React from 'react';
import { connect } from 'react-redux';

import Rounds from '../components/Rounds';
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
});

const mapDispatchToProps = {
  addRound,
  changeRoundDate,
  removeRound,
  setRoundFocus,
  setSelectedRoundPairsId,
};

let RoundsContainer = ({
  addRound,
  changeRoundDate,
  removeRound,
  ...props,
}) => (
  <Rounds
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

RoundsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoundsContainer);

export default RoundsContainer;