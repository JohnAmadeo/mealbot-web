// eslint-disable-next-line
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import Card from './common/Card';

// TODO: This component is incomplete: show list of errors, not just a single error
const ErrorList = props => (
  <StyledErrorList errors={props.errors}>
    {props.errors.length > 0 &&
    <Card error onClickError={props.removeError}>
      There was an error communicating with the server. Please check if you are connected to the Internet. If you are, then there is an internal error on the server. Please contact johnamadeo.daniswara@gmail.com for support.
    </Card>
    }

    {/* {props.errors.map((error, idx) => (
      <ErrorContainer key={idx}>
        <Card 
          error
          onClickError={() => props.removeError(idx)}
          >
          {error}
        </Card>
      </ErrorContainer>
    ))} */}
  </StyledErrorList>
);

ErrorList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeError: PropTypes.func.isRequired,
};

const StyledErrorList = styled.div`
  ${props => props.errors.length > 0 && css`
    padding: 16px;

    @media (min-width: 1024px) {
      padding: 16px 120px 16px 120px;
    }
  `}
`;

const ErrorContainer = styled.div`
  margin: 14px 0px;
`;

export default ErrorList;