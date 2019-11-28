import React, { Component, useState, useEffect } from "react";
// import logo from "./logo.svg";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";

// interface IState{
//   activities: IActivity[]
// }

// react functional compo
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  useEffect(() => {
    // promess based API. bnow we know that our request is getting an IActivity type
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        setActivities(response.data);
      });
  }, []); // add this empty array to make sure the useEffect method is not called again.

  return (
    <div>
      
      <NavBar/>>

      <List>
        {/* i could not see anything in the broweser because i'm not using strong type, ie activity: any */}
        {activities.map(activity => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
