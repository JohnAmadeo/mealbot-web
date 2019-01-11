// eslint-disable-next-line
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import close from '../../svg/close.svg';
import errorclose from '../../svg/errorclose.svg';
import info from '../../svg/info.svg';
import errorinfo from '../../svg/errorinfo.svg';

// TODO: Split into InfoCard and ErrorCard components
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  render() {
    return (
      <StyledCard error={this.props.error} open={this.state.open}>
        <CloseContainer>
          <img 
            src={!this.props.error ? close : errorclose} 
            alt="close" 
            onClick={() => {
              this.setState({ open: false });
              if (this.props.error) {
                this.props.onClickError();
              }
            }}
            />
        </CloseContainer>
        <div>
          <img src={!this.props.error ? info : errorinfo} alt="info" />
        </div>
        {this.props.children}
      </StyledCard>
    );
  }
};

const StyledCard = styled.div`
  border: 2px solid royalblue;
  border-radius: 2px;
  box-shadow: 0 6px 13px -3px rgba(50,50,93,.25), 0 4px 8px -4px rgba(0,0,0,.3);
  color: royalblue;
  padding: 16px;
  position: relative;
  margin: 16px 0px;
  // z-index: -1;

  ${props => !props.open && css`
    display: none;
  `}

  ${props => props.error && css`
    border: 2px solid crimson;
    color: crimson;
  `}

  a {
    border-bottom: 1px dashed;
    color: royalblue;
    ${props => props.error && css`
      color: crimson
    `}
    text-decoration: none;
  }
  a:hover {
    border-bottom: 1px solid;
    color: royalblue;
    ${props => props.error && css`
      color: crimson;
    `}
  }
`;

Card.propTypes = {
  error: PropTypes.bool,
  onClickError: PropTypes.func,
};

const CloseContainer = styled.div`
  cursor: pointer;
  position: absolute;
  right: 8px;
  top: 8px;
`;

export default Card;