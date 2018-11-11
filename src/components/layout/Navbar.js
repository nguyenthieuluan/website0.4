import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SingedInLinks from "./SignedInLinks";
import SingedOutLinks from "./SignedOutLinks";
import {connect} from 'react-redux';

class Navbar extends Component {
  render() {
    const {auth, profile} = this.props;
    const links = auth.uid ? <SingedInLinks profile={profile}/> : <SingedOutLinks/>;
    return (
      <nav>
        <div className="nav-wrapper grey darken-3 left-align">
          <Link to="/" className="brand-logo">THIEULUAN</Link>
          {links}
        </div>
      </nav>
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