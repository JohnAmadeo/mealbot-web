// eslint-disable-next-line
import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = props => (
  <Nav>
    {props.routes.map((route, idx) => (
      <StyledLink
        to={`/${route.path}`}
        key={idx}
        selected={idx === props.selectedRouteId}
      >
        {route.title}
      </StyledLink>
    ))}
  </Nav>
);

Navbar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.element,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  selectedRouteId: PropTypes.number.isRequired,
};

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  margin: 30px 0 0 0;
`;

const StyledLink = styled(Link)`
  color: midnightblue;
  margin: 4px 0 4px 0;
  text-decoration: none;
  ${props => props.selected && css`
  font-weight: bold;
  `}
  &:hover {
    color: royalblue;
  }
`;

export default Navbar;