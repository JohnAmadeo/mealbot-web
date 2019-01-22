// eslint-disable-next-line
import React from 'react';
import styled from 'styled-components';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import moment from 'moment';
import PropTypes from 'prop-types';

import Card from './common/Card';
import Header from './common/Header';

class Rounds extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      newRound: null,
      newRoundFocused: false,
    };
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
    const { rounds } = this.props;
    const today = moment();
    const lastRound = rounds[rounds.length - 1];
    return day.isSameOrBefore(moment.max(lastRound, today));
  }

  render() {
    const {
      addRound,
      changeRoundDate,
      isRoundFocused,
      rounds,
      removeRound,
      setRoundFocus,
    } = this.props;

    const today = moment();

    return (
      <Container>
        <Header title="Round Schedule" />
        <Card>Mealbot will automatically pair your members and send them an email at noon on the day you've scheduled a round.</Card>
        {rounds.map((round, idx) =>
          <DateWrapper key={idx}>
            <SingleDatePicker
              disabled={round.isSameOrBefore(today)}
              date={round}
              onDateChange={date => changeRoundDate(idx, date)}
              focused={isRoundFocused[idx]}
              onFocusChange={({ focused }) =>
                setRoundFocus(focused, idx)
              }
              id={`${idx}`}
              isOutsideRange={day =>
                this.isRoundOutsideRange(day, idx)
              }
              />
            {!round.isSameOrBefore(today) &&
            <Button onClick={e => removeRound(idx)}>
              x
            </Button>
            }
          </DateWrapper>
        )}

        <p>Add a new round</p>
        <DateWrapper>
          <SingleDatePicker
            date={this.state.newRound}
            onDateChange={addRound}
            focused={this.state.newRoundFocused}
            onFocusChange={({ focused }) => this.setState({
              newRoundFocused: focused
            })}
            id={`new-round`}
            isOutsideRange={this.isNewRoundOutsideRange}
          />
        </DateWrapper>
      </Container>
    );
  }
};

const Button = styled.button`
  background: midnightblue;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  height: 38px;
  margin: 0px 12px;
  width: 38px;

  &:hover {
    background: royalblue;
    cursor: pointer;
  }
`;

const Container = styled.div`
  color: darkslategray;
  padding: 16px;

  @media (min-width: 1024px) {
    padding: 16px 120px 16px 120px;
  }
`;

// TODO: Find a less hacky way to style Airbnb's SingleDatePicker component
// using styled-components
const DateWrapper = styled.div`
  input {
    height: 38px;
  }

  .CalendarDay__selected {
    background: midnightblue;
    border: midnightblue;
  }

  .DateInput_input__focused {
    border-bottom: 2px solid midnightblue;
  }

  margin: 12px 0px;
`;

Rounds.propTypes = {
  addRound: PropTypes.func.isRequired,
  changeRoundDate: PropTypes.func.isRequired,
  isRoundFocused: PropTypes.arrayOf(PropTypes.bool).isRequired,
  rounds: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeRound: PropTypes.func.isRequired,
  setRoundFocus: PropTypes.func.isRequired,  
}

export default Rounds;