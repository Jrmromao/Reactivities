import { IActivity } from './../models/activity';
import { observable, action } from 'mobx';
import { createContext } from 'react';
import agent from '../API/agent';

class ActivityStore {
    // w3 
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
        this.editMode = false;
    }

    @action loadActivities = () => {
        this.loadingInitial = true;
        // now lets use our agent to get the activities
        // promess based API. bnow we know that our request is getting an IActivity type
        agent.Activities.list()
            .then(activities => {
                activities.forEach(activity => {
                    activity.date = activity.date.split(".")[0];
                    this.activities.push(activity);
                });
            }).catch(error => console.log(error))
            .finally(() => this.loadingInitial = false);
    }
}

export default createContext(new ActivityStore())