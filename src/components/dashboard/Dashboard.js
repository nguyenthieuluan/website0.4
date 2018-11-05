import React, { Component } from 'react';
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Pagination from "react-js-pagination";
import "./Dashboard.css";

class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsCountPerPage: 10,
    };
  }

  handlePageChange = (pageNumber) => {
    //console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  render() {
    const { projects, auth, notifications } = this.props;
    const indexOfLastList = this.state.activePage * this.state.itemsCountPerPage;
    const indexOfFirstList = indexOfLastList - this.state.itemsCountPerPage;
    const projectsList = projects && projects.slice(indexOfFirstList, indexOfLastList);
    const notif = auth.uid ? <Notifications notifications={notifications}/> : null ;

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projectsList}/>
          </div>
          <div className="col s12 m5 offset-m1">
            {notif}
          </div>
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
          totalItemsCount={projects && projects.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
        <div className="white">
          <p>Total threads: {projects && projects.length}</p>
        </div>
      </div>
    )
  }
}
const initMapStateToProps = (state) => {
  return {
    projects: state.firestoreReducer.ordered.projects, 
    auth: state.firebaseReducer.auth,
    notifications: state.firestoreReducer.ordered.notifications
  }
};
export default compose(
  connect(initMapStateToProps),
  firestoreConnect([
    {collection: 'projects',limit: 1000, orderBy: ['createdAt', 'desc']},
    {collection: 'notifications', limit: 5, orderBy: ['time', 'desc']}
  ])
) (Dashboard);