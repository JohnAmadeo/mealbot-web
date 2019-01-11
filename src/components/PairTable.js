// eslint-disable-next-line
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO: Refactor MemberTable and PairTable into a base Table component
const PairTable = ({ pairs }) => (
  <TableContainer>
    <StyledTable>
      <thead>
        <tr>
          {/* <td>Pairs</td> */}
        </tr>
      </thead>
      <tbody>
        {pairs.map((pair, idx) =>
          <tr key={idx}>
            <td key={idx+1}>
              {idx+1}
            </td>
            <td key={pair.member1.email}>
              {pair.member1.name}
            </td>
            <td key={pair.member2.email}>
              {pair.member2.name}
            </td>
          </tr>
        )}
      </tbody>
    </StyledTable>
  </TableContainer>
);

PairTable.propTypes = {
  pairs: PropTypes.arrayOf(PropTypes.shape({
    member1: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    member2: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  })).isRequired,
}

const TableContainer = styled.div`
  border-bottom: 2px solid whitesmoke;
  border-top: 2px solid whitesmoke;
  display: inline-block;
  height: 600px;
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

export default PairTable;