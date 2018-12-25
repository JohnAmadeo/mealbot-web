import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MembersContainer from './containers/MembersContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MembersContainer/>
      </div>
    );
  }
}

export default App;
