import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from "react-router-dom";
import moment from "moment";
import Spinner from "../ui/spinner/Spinner";
import CommentEditor from "./comments/CommentEditor";
import Comment from './comments/Comments';

import {createComment} from "../../store/actions/projectActions";


class ProjectDetails extends Component {
  state = {
    value: '',
    projectId: ''
  };
  handleChangeValue = e => {
    this.setState({value: e.target.value});
  };
  handleComment = (e) => {
    e.preventDefault();
    this.props.createComment({content: this.state.value, projectId: this.state.projectId});
    //alert(this.state.value);
  };
  handleDeleteThread = () => {
    alert(this.props.match.params.id)
  };
  componentWillMount() {
    this.setState({
      projectId: this.props.match.params.id
    });
  }
  render() {
    const {project, auth} = this.props;
    if (!auth.uid) {
      return <Redirect to='/signin'/>
    }
    if (project) {
      return (
        <div className="container project-detail section left-align">
          <div className="card z-depth-0">
            <div className="card-content">
              <div className="">
              </div>
              <span className="card-title">
                {project.title}
                <button className="right-align" onClick={this.handleDeleteThread}>...</button>
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
          <Comment comments={project.comments}/>
          <CommentEditor handleComment={this.handleComment}
                         value={this.state.value}
                         onChangeValue={this.handleChangeValue}/>
        </div>
      )
    } else {
      return (
        <div className="container">
          <Spinner/>
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

const initMapDispatchToProps = (dispatch) => {
  return {
    createComment: (comment) => dispatch(createComment(comment))
  }
};

export default compose(
  connect(initMapStateToProps, initMapDispatchToProps),
  firestoreConnect([
    {collection: 'projects'}
  ])
)(ProjectDetails);
