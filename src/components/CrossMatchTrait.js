// eslint-disable-next-line
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Card from './common/Card';
import Chips from './common/Chips';
import Header from './common/Header';

const CrossMatchTrait = ({ 
  auth,
  crossMatchTraitId,
  members, 
  traits,
  setCrossMatchTrait,
}) => auth.isAuthenticated() ? (
  <Container>
    <Header title={"Cross Match Trait"} />
    {traits.length > 0 ? (
    <>
      <Card>
        Select a trait, and Mealbot will try to match people up with different values for that trait. For example, you can match up people from different years.
      </Card>
      <Chips
        items={traits}
        onClick={setCrossMatchTrait}
        selectedItemId={crossMatchTraitId}
      />
    </>
    ) : (
    <Card>
      Your members do not have any traits (i.e CSV columns that aren't 'Name' or 'Email'). Go to the Members tab to see a sample CSV that has traits.
    </Card>
    )}
  </Container>
) : (
  <Redirect to='/' />
);

CrossMatchTrait.propTypes = {
  auth: PropTypes.object.isRequired,
  crossMatchTraitId: PropTypes.number,
  members: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  })).isRequired,
  setCrossMatchTrait: PropTypes.func.isRequired,
  traits: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Container = styled.div`
  color: darkslategray;
  padding: 16px;

  @media (min-width: 1024px) {
    padding: 16px 120px 16px 120px;
  }
`;

export default CrossMatchTrait;