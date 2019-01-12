// eslint-disable-next-line
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { display } from '../utils';

// TODO: Refactor MemberTable and PairTable into a base Table component
const MemberTable = ({ traits, members }) => (
  <TableContainer>
    <StyledTable>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          {traits.map(trait =>
            <th key={trait}>{display.capitalize(trait)}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {members.map(member =>
          <tr key={member.name}>
            <td key={`${member.name}-name`}>
              {member.name}
            </td>
            <td key={`${member.name}-email`}>
              {member.email}
            </td>
            {traits.map(trait =>
              <td key={`${member.name}-${trait}`}>
                {member[trait]}
              </td>
            )}
          </tr>
        )}
      </tbody>
    </StyledTable>
  </TableContainer>
);

MemberTable.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  })).isRequired,
  traits: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const TableContainer = styled.div`
  border-bottom: 2px solid whitesmoke;
  border-top: 2px solid whitesmoke;
  display: inline-block;
  max-height: 600px;
  margin: 24px 0px 12px 0px;
  overflow-y: scroll;
  width: 100%;
`;

const StyledTable = styled.table`
  text-align: left;
  width: 100%;

  td, th {
    padding: 16px 24px;
  }

  tbody tr:nth-child(odd) {
    background: whitesmoke;
  }

  thead {
    font-size: 16px;
  }
`;

export default MemberTable;