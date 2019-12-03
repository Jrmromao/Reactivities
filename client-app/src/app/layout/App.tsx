import React, {  useEffect, Fragment, useContext } from "react";
import {observer} from 'mobx-react-lite';
// import axios from "axios";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from '../stores/activityStore';

// react functional compo

const App = () => {

  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); // depency array add this empty array to make sure the useEffect method is not called again.

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading acticities..." />;
  return (
    <Fragment>
      <NavBar/>

      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
