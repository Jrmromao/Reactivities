import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

interface IDetailParams{
  id: string
}


const ActivityDetails: React.FC<RouteComponentProps<IDetailParams>> = ({
  match
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity: activity,
    openEditForm,
    cancelSelelectedActivity,
    loadactivity,
    loadingInitial
  } = activityStore;

  useEffect(() => {
    loadactivity(match.params.id);
  }, [loadactivity]); // to run only one time

if(loadingInitial || !activity) return <LoadingComponent content='Loading activity...'/>

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            onClick={() => openEditForm(activity!.id)}
            content="Edit"
          />
          <Button
            basic
            color="grey"
            onClick={cancelSelelectedActivity}
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
export default observer(ActivityDetails);
