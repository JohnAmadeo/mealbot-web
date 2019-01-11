import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Card from './common/Card';
import Header from './common/Header';
import MembersTable from './MemberTable';

const Members = ({ 
  auth,
  crossMatchTraitId,
  members, 
  onUploadMembersCSV,
  setCrossMatchTrait,
  traits, 
}) => auth.isAuthenticated() ? (
  <StyledMembers>
    <Header title={"Members"} />
    {members.length > 0 &&
    <MembersTable members={members} traits={traits}/>
    }
    <Card>
      <a href="http://localhost:8080/sample.csv" download>Download a sample CSV file that Mealbot accepts</a>
    </Card>
    <Dropzone
      accept="text/csv"
      multiple={false}
      onDrop={(acceptedFiles, rejectedFiles) => {
        if (acceptedFiles.length === 1) {
          onUploadMembersCSV(acceptedFiles[0]);
        }
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <DropArea
          {...getRootProps()}
          expanded={!(members.length > 0)}
        >
          <input {...getInputProps()} />
          <p>Upload a CSV file of your organization's members</p>
          <p>The first line of the file will be interpreted as columns, and there must be a 'Name' column</p>
        </DropArea>
      )}
    </Dropzone>
  </StyledMembers>
) : (
  <Redirect to='/' />
);

Members.propTypes = {
  auth: PropTypes.object.isRequired,
  crossMatchTraitId: PropTypes.number,  
  members: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  })).isRequired,
  onUploadMembersCSV: PropTypes.func.isRequired,
  setCrossMatchTrait: PropTypes.func.isRequired,
  traits: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const StyledMembers = styled.div`
  color: darkslategray;
  padding: 16px;

  @media (min-width: 1024px) {
    padding: 16px 120px 16px 120px;
  }
`;

const DropArea = styled.div`
  border: 1px dashed darkslategray;
  cursor: pointer;
  margin: 8px 0px;
  padding: 4px;
  text-align: center;

  ${props => props.expanded && css`
    padding: 72px 4px;
  `}
`;

export default Members;