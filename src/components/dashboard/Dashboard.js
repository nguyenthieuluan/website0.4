import React, { Component } from 'react';
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Dashboard extends Component{
  render() {
    const { projects, auth, notifications } = this.props;

    const notif = auth.uid ? <Notifications notifications={notifications}/> : null ;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects}/>
          </div>
          <div className="col s12 m5 offset-m1">
            {notif}
          </div>
        </div>
      </div>
    )
  }
}
const initMapStateToProps = (state) => {
  //console.log(state)
  return {
    projects: state.firestoreReducer.ordered.projects,
    auth: state.firebaseReducer.auth,
    notifications: state.firestoreReducer.ordered.notifications
  }
};
export default compose(
  connect(initMapStateToProps),
  firestoreConnect([
    {collection: 'projects', orderBy: ['createdAt', 'desc']},
    {collection: 'notifications', limit: 5, orderBy: ['time', 'desc']}
  ])
) (Dashboard);