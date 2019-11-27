import React, { Component } from "react";
// import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { Header, Icon, List } from "semantic-ui-react";

// react functional compo
class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    // promess based API
    axios.get("http://localhost:5000/api/values").then(response => {
    
      this.setState({
        values: response.data
      });
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Reactivities</Header.Content>
        </Header>

        <List>
        
          {this.state.values.map((value: any) => (
          
          <List.Item key={value.id}>{value.name}</List.Item>
          ))}
  </List>
      </div>
    );
  }
}

export default App;
