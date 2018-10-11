import React, { Component } from 'react';
import Transfer from "./component/transfer"
import {cityList} from "./constant/list_data"

import './style/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Transfer availableList={cityList} displayList={[]} showCheckbox={false} cancelAndSave={true}/>
        </header>
      </div>
    );
  }
}

export default App;
