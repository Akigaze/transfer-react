import React, { Component } from 'react';
import Transfer from "./component/transfer"
import './style/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Transfer/>
        </header>
      </div>
    );
  }
}

export default App;
