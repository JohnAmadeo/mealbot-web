import React from 'react';
import { connect } from 'react-redux';

import Pairs from '../components/Pairs';
import { 
  setSelectedRoundPairsId,
} from '../actions/pairing';

const mapStateToProps = state => ({
  org: state.orgs.orgs[state.orgs.selectedOrgId],
  roundPairs: state.pairing.roundPairs,
  selectedRoundPairsId: state.pairing.selectedRoundPairsId,
});

const mapDispatchToProps = {
  setSelectedRoundPairsId,
};

let PairsContainer = ({
  ...props,
}) => (
    <Pairs {...props}/>
  );

PairsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PairsContainer);

export default PairsContainer;