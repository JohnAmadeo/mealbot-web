import React from 'react';
import PropTypes from 'prop-types';

const Members = ({ members, onUploadCSV }) => (
  <>
    <button 
      onClick={() => onUploadCSV(['John', 'George', 'Alice'])}
      >
      Upload CSV
    </button>
    <ul>
      {members.map(member => (
        <li key={member}>
          {member}
        </li>
      ))}
    </ul>
  </>
);

Members.propTypes = {
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Members;