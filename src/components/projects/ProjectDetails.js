import React, {Component} from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {Redirect} from "react-router-dom";
import moment from "moment";

class  ProjectDetails extends Component {
  render() {
    const {project, auth} =this.props;
    if (!auth.uid) {
      return <Redirect to='/signin' />
    }
    if(project) {
      return (
        <div className="container project-detail section left-align">
          <div className="card z-depth-0">
            <div className="card-content">
            <span className="card-title">
              {project.title}
            </span>
              <p>
                {project.content}
              </p>
            </div>
            <div className="card-action lighten-4 grey-text grey">
              <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>
            </div>
          </div>
        </div>
        )
    } else {
      return (
        <div className="container">
          <p>Loading ...</p>
        </div>
      )
    }
  }
}
const initMapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestoreReducer.data.projects;
  const project = projects ? projects[id] : null
  return {
    project: project,
    auth: state.firebaseReducer.auth
  }
};

export default compose(
  connect(initMapStateToProps),
  firestoreConnect([
    {collection: 'projects'}
  ])
)(ProjectDetails);
