import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Pairing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: this.props.rounds.map(_ => false),
      newRound: null,
      newRoundFocused: false,
    };
  }

  componentDidMount() {
    if (this.props.rounds.length === 0) {
      this.props.fetchRounds();
    }
  }

  isRoundOutsideRange = (day, roundId) => {
    const { rounds } = this.props;

    const today = moment();
    const nextYear = moment().add(365, 'days');

    // round has already happened
    if (day.isSameOrBefore(today)) {
      return true;
    }

    // the earliest date this round can be scheduled
    // at is the later date between tomorrow and the 
    // previous round
    const earliest = moment.max(
      today,
      roundId > 0 ? rounds[roundId - 1] : today,
    );

    // the latest this round can be scheduled at is the 
    // earlier date between the next round and some 
    // arbitrary max future date
    const latest = moment.min(
      nextYear,
      roundId < rounds.length - 1 ? rounds[roundId + 1] : nextYear,
    );

    return !day.isBetween(earliest, latest, 'day');
  }

  isNewRoundOutsideRange = day => {
    const { rounds }  = this.props;
    const today = moment();
    const lastRound = rounds[rounds.length - 1];
    return day.isSameOrBefore(moment.max(lastRound, today));
  }

  render() {
    const { 
      pairs, 
      rounds,
      changeRoundDate,
    } = this.props;

    const today = moment();

    return this.props.auth.isAuthenticated() ? (
      <>
        {pairs.length > 0 &&
          <table>
            <tbody>
              {pairs.map((pair, idx) =>
                <tr key={idx}>
                  <td key={pair.member1.email}>
                    {pair.member1.name}
                  </td>
                  <td key={pair.member2.email}>
                    {pair.member2.name}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        }
        <div>
          {rounds.map((round, idx) =>
            <div key={idx}>
              <div>
                <SingleDatePicker
                  disabled={round.isSameOrBefore(today)}
                  date={round}
                  onDateChange={date => changeRoundDate(idx, date)}
                  focused={this.props.isRoundFocused[idx]} 
                  onFocusChange={({ focused }) => 
                    this.props.setRoundFocus(focused, idx)
                  } 
                  id={`${idx}`}
                  isOutsideRange={day =>
                    this.isRoundOutsideRange(day, idx)
                  }
                  />
              </div>
              {!round.isSameOrBefore(today) &&
              <button onClick={e => this.props.removeRound(idx)}>
                Remove
              </button>
              }
            </div>
          )}
          <div>
            <p>Add a new round</p>
            <SingleDatePicker
              date={this.state.newRound}
              onDateChange={this.props.addRound}
              focused={this.state.newRoundFocused}
              onFocusChange={({ focused }) => this.setState({
                newRoundFocused: focused
              })}
              id={`new-round`}
              isOutsideRange={this.isNewRoundOutsideRange}
            />
          </div>
        </div>
      </>
    ) : (
      <Redirect to='/' />
    );
  }
} 

Pairing.propTypes = {
  addRound: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  changeRoundDate: PropTypes.func.isRequired,
  fetchPairs: PropTypes.func.isRequired,
  fetchRounds: PropTypes.func.isRequired,
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
  removeRound: PropTypes.func.isRequired,
  rounds: PropTypes.arrayOf(PropTypes.object).isRequired,
  setRoundFocus: PropTypes.func.isRequired,
};

export default Pairing;