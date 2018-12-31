import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import Card from './common/Card';

const Members = ({ 
  crossMatchTraitId,
  members, 
  onUploadMembersCSV,
  setCrossMatchTrait,
  traits, 
}) => (
  <>
    <ul>
        {traits.map((trait, idx) => 
          // Turn into a styled.li component later
          <li 
            key={idx} 
            value={trait}
            onClick={e => 
              setCrossMatchTrait(e.target.getAttribute('value'))
            }
            >
            {crossMatchTraitId === idx ? `SELECTED ${trait}` : trait}
          </li>
        )}
    </ul>

    {members.length > 0 &&
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>email</th>
          {traits.map(trait =>
            <th key={trait}>{trait}</th>
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
        <a href="http://localhost:8080/sample.csv" download>Download a sample CSV file that Mealbot finds valid</a>
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
  setCrossMatchTrait: PropTypes.func.isRequired,
  traits: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Members;