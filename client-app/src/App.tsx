import React, { Component } from "react";
import logo from "./logo.svg";
import axios from 'axios';
import "./App.css";

// react functional compo
class App extends Component {
  
  state = {
    values: []
  };

  componentDidMount() {
    
    // promess based API
    axios.get('http://localhost:5000/api/values')
      .then((response) => {
        console.log(response)
        this.setState({
          values:  response.data
          });
      })
      
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
              <ul>
                  {this.state.values.map((value: any) => (
                      <li key={value.id}>{value.name}</li>
                  ))}
              </ul>
        </header>
      </div>
    );
  }
}

export default App;
