import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SingedInLinks from "./SignedInLinks";
import SingedOutLinks from "./SignedOutLinks";
import {connect} from 'react-redux';
import "./Layout.css";

class Navbar extends Component {
  render() {
    const {auth, profile} = this.props;
    const links = auth.uid ? <SingedInLinks profile={profile}/> : <SingedOutLinks/>;
    return (
      <div className="navbar-fixed navbar">
        <nav className="purple lighten-3">
          <div className="nav-wrapper darken-3 left-align">
            <Link to="/" className="brand-logo left-align">THIEULUAN</Link>
            <ul className="right hide-on-med-and-down">
              {links}
            </ul>
          </div>
        </nav>
      </div>
    )
  }

}

const initMapStateToProps = (state) => {
  return {
    auth: state.firebaseReducer.auth,
    profile: state.firebaseReducer.profile
  }
};

export default connect(initMapStateToProps)(Navbar);