import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class OrganizationSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newOrg: '',
    };
  }

  render() {
    return (
      <>
          <P>Create new organization</P>
          <CreateOrgDiv>
            <Input
              type="text"
              value={this.state.newOrg}
              onChange={event => this.setState({ newOrg: event.target.value })}
            />
            <Button
              onClick={_ => {
                this.props.createOrg(this.state.newOrg);
                this.setState({ newOrg: '' })
              }}
            >
              +
            </Button>
          </CreateOrgDiv>
      </>
    );
  }
}

OrganizationSelect.propTypes = {
  createOrg: PropTypes.func.isRequired,
};

const Input = styled.input`
  border: 1px solid lightgray;
  border-radius: 4px;
  font-size: 14px;
  padding: 8px;
  height: 38px;
  width: 142px;
`;

const CreateOrgDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background: midnightblue;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  height: 38px;
  width: 38px;

  &:hover {
    background: royalblue;
    cursor: pointer;
  }
`;

const P = styled.p`
  margin: 16px 0 4px 0;
`;

export default OrganizationSelect;