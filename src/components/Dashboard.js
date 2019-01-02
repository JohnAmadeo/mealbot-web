import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newOrg: '',
    };
  }

  componentDidMount() {
    if (this.props.orgs.length === 0) {
      this.props.fetchDashboardData(this.props.auth);
    } 
  }

  render() {
    const { orgs, selectedOrgId } = this.props;
    return (
      <>
        <div style={{ background: 'peachpuff' }}>
          <select 
            value={orgs[selectedOrgId]} 
            onChange={event => this.props.selectOrg(event.target.value)}
            >
            {orgs.map((org, idx) => 
              <option key={idx} value={org}>{org}</option>
            )}
          </select>

          <p>Create new organization:</p>
          <input 
            type="text" 
            value={this.state.newOrg}
            onChange={event => this.setState({ newOrg: event.target.value })}
            />
          <button
            onClick={_ => {
              this.props.createOrg(this.state.newOrg);
              this.setState({ newOrg: '' })
            }}
            >
            + (Replace with icon)
          </button>

          <nav>
            <Link to='/members'>Members</Link>
            <Link to='/pairing'>Pairing</Link>
          </nav>
        </div>
        {this.props.children}
      </>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  createOrg: PropTypes.func.isRequired,
  fetchDashboardData: PropTypes.func.isRequired,
  orgs: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectOrg: PropTypes.func.isRequired,
  selectedOrgId: PropTypes.number,
};

export default Dashboard;