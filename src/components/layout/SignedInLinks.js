import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from "../../store/actions/authActions";

const SingedInLinks = (props) => {
  return (
    <ul className="right">
      <li><NavLink to="/create">New Thread</NavLink></li>
      <li><NavLink to="/" onClick={props.signOut}>Log out</NavLink></li>
      <li><NavLink to="/" className="btn btn-floating pink lighten-1">{props.profile.initials}</NavLink></li>
    </ul>
  )
};
const initMapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
};
export default connect(null, initMapDispatchToProps) (SingedInLinks);