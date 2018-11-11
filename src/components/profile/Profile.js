import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

export class Profile extends Component {
    state = {
        isShowChangePassword: false
    };

    changePasswordHandle = (e) => {
      e.preventDefault();
        this.setState({
            isShowChangePassword: !this.state.isShowChangePassword
        })
    };
  render() {
    const {auth} = this.props;
    const changePassword = this.state.isShowChangePassword ? (
        <div className="">
          <div className="input-field">
            <label htmlFor="email">Password</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Corfirm Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Save</button>
          </div>
        </div>
      ) : null;

    return (
        <div className="left-align white container">
          <form onSubmit={this.changePasswordHandle}>
            <h5 className="grey-text text-darken-3">Your profile</h5>
            <div className="row">
              <div className="input-field col s9">
                <span className="s3 pink-text">{auth.email}</span>
              </div>
              <div className="col col2">
                <button type="submit" className="btn pink lighten-1">Change Password</button>
              </div>
            </div>
            <div className="row">
              {changePassword}
            </div>
            {/* <div className="input-field">
            <label htmlFor="email">Password</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Corfirm Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Save</button>
          </div> */}
          </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebaseReducer.auth
  }
}

// const mapDispatchToProps = {
  
// }

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      {collection: 'users',limit: 100, orderBy: ['createdAt', 'desc']},
    ])
  )(Profile)
