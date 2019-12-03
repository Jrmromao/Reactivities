import { SyntheticEvent } from 'react';
import { IActivity } from './../models/activity';
import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext } from 'react';
import agent from '../API/agent';


configure({ enforceActions: 'always' })

class ActivityStore {
    // w3 
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    // this observable 
    @observable activityRegistry = new Map();
    // computed prop to sort the activities by date
    @computed get activitiesByDate() {
        // return the array sorted by date in ascending order
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date));
    }
    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
    }
    @action loadActivities = async () => {
        this.loadingInitial = true;
        // now lets use our agent to get the activities
        // promess based API. bnow we know that our request is getting an IActivity type
        try {
            const activities = await agent.Activities.list();
            runInAction('loading activities', () => {
                activities.forEach(activity => {
                    activity.date = activity.date.split(".")[0];
                    this.activityRegistry.set(activity.id, activity);
                });
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction('load activities error', () => {
                this.loadingInitial = false;
            });
            console.log(error)
        }
    };
    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction('creating activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
                this.submitting = false;
            });
        } catch (error) {
            runInAction('reate activity error', () => {
                this.submitting = false;
            });
            console.log(error)
        }
    };
    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('editing activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
            });
        } catch (error) {
            runInAction('edit acticity error', () => {
                this.submitting = false;
            });
            console.log(error)
        }
    }
    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction('deleting Activity', () => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
        } catch (error) {
            runInAction('delete acticity error', () => {
                this.submitting = false;
                this.target = '';
            });
            console.log(error)
        }
    }



    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    };
    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = true;

    };
    @action cancelSelelectedActivity = () => {
        this.selectedActivity = undefined;

    }
    @action cancelFormOpen = () => {
        this.editMode = false;
    }

}

export default createContext(new ActivityStore())