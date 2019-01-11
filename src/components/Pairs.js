import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Chips from './common/Chips';
import Header from './common/Header';
import PairTable from './PairTable';

class Pairs extends React.Component {
  render() {
    const { 
      roundPairs,
      selectedRoundPairsId,
      setSelectedRoundPairsId,
    } = this.props;

    return this.props.auth.isAuthenticated() ? (
      <StyledPairing>
        <Header title="Pairs"/>
        {roundPairs.length > 0 &&
        <>
          <P>Round</P>
          <Chips
            items={roundPairs.map((_, idx) => idx)}
            onClick={setSelectedRoundPairsId}
            selectedItemId={selectedRoundPairsId}
          />        
        </>
        }

        {selectedRoundPairsId !== null && 
          <PairTable pairs={roundPairs[selectedRoundPairsId]} />
        }
      </StyledPairing>
    ) : (
      <Redirect to='/' />
    );
  }
} 

Pairs.propTypes = {
  auth: PropTypes.object.isRequired,
  roundPairs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    member1: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    member2: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  }))).isRequired,
  selectedRoundPairsId: PropTypes.number,
  setSelectedRoundPairsId: PropTypes.func.isRequired,
};

const StyledPairing = styled.div`
  color: darkslategray;
  padding: 16px;

  @media (min-width: 1024px) {
    padding: 16px 120px 16px 120px;
  }
`;

const P = styled.p`
  margin: 16px 0 4px 0;
`;

export default Pairs;