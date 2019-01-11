// eslint-disable-next-line
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.p`
  border-bottom: 1px solid darkslategray;
  font-size: 18px;
  margin: 0px;
  padding: 12px 0px;
`;

const Header = props => (
  <StyledHeader>
    {props.title}
  </StyledHeader>
);

export default Header;