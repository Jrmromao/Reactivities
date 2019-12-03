import React, { useEffect, Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { Route } from "react-router-dom";
import { homePage } from "../../features/home/homePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

// react functional compo

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); // depency array add this empty array to make sure the useEffect method is not called again.

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading acticities..." />;
  return (
    <Fragment>
      <NavBar />
    {/* fisr match wins */}
      <Container style={{ marginTop: "7em" }}>
        <Route exact path='/' component={homePage} />
        <Route exact path='/activities' component={ActivityDashboard} />
        <Route exact path='/activities/:id' component={ActivityDetails} />
        <Route path='/createActivity' component={ActivityForm} />
        
      </Container>
    </Fragment>
  );
};

export default observer(App);
