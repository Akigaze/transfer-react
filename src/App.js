import React, { Component } from "react";
import Transfer from "./component/transfer";
import { cityList, countryList } from "./constant/list_data";

import "./style/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Transfer
            availableList={countryList}
            displayList={[]}
            useId="name"
            showText="name"
            showCheckbox={true}
            cancelAndSave={true}
            save={event => {
              return event;
            }}
            cancel={event => {
              return event;
            }}
          />
        </header>
      </div>
    );
  }
}

export default App;
