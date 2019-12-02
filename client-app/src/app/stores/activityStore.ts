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

    @action loadActivities = async () => {
        this.loadingInitial = true;
        // now lets use our agent to get the activities
        // promess based API. bnow we know that our request is getting an IActivity type
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split(".")[0];
                this.activities.push(activity);
            });
            this.loadingInitial = false;
        } catch (error) {
            this.loadingInitial = false;
            console.log(error)
        }
    }
}

export default createContext(new ActivityStore())