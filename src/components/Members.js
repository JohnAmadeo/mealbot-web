import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import Card from './common/Card';

const Members = ({ 
  crossMatchTraitId,
  members, 
  onUploadMembersCSV,
  traits, 
}) => (
  <>
    <ul>
        {traits.map((trait, idx) => 
          // Turn into a styled.li component later
          <li key={idx}>
            {crossMatchTraitId === idx ? `SELECTED ${trait}` : trait}
          </li>
        )}
    </ul>

    {members.length > 0 &&
    <table>
      <thead>
        <tr>
          {traits.map(trait =>
            <th key={trait}>{trait}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {members.map(member =>
          <tr key={member.name}>
            {traits.map(trait => 
              <td key={`${member.name}-${trait}`}>
                {member[trait]}
              </td>
            )}
          </tr>
        )}
      </tbody>
    </table>
    }

    <Dropzone
      accept="text/csv"
      multiple={false}
      onDrop={(acceptedFiles, rejectedFiles) => {
        if(acceptedFiles.length === 1) {
          onUploadMembersCSV(acceptedFiles[0]);
        }
      }}
      >
      {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Upload a CSV file of your organization's members</p>
            <p>The first line of the file will be interpreted as columns, and there must be a 'Name' column</p>
          </div>
      )}
    </Dropzone>

    <Card>
        <a href="http://localhost:8080/samplecsv" download>Download a sample CSV file that Mealbot finds valid</a>
    </Card>
  </>
);

Members.propTypes = {
  auth: PropTypes.object.isRequired,
  crossMatchTraitId: PropTypes.number,  
  members: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  })).isRequired,
  onUploadMembersCSV: PropTypes.func.isRequired,
  traits: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Members;