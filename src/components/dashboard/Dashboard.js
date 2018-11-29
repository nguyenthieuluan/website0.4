import React, { Component } from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import "./Dashboard.css";
import firebase from '../../config/firebaseConfig';
import Player from '../player/Player';



const storage = firebase.storage().ref();
class Dashboard extends Component{
  constructor () {
    super()
    this.state = {
      lithuania: '',
      uk: ''
    }

    this.getImage('lithuania')
    this.getImage('uk')
  }
  getImage (image) {
    storage.child(`${image}.png`).getDownloadURL().then((url) => {
      this.state[image] = url
      this.setState(this.state)
    })
  }
  handleGetSong = () => {
    storage.child('A Thousand Years - Christina Perri - Broken Heart - V.A - Playlist NhacCuaTui.MP3').getDownloadURL().then((url) => {
      console.log(url);
    })
  };
  render() {
    return (
      <div className="dashboard container">
        <div className="row">
           <audio controls type="audio/mpeg" src={"https://firebasestorage.googleapis.com/v0/b/ntl001-186700.appspot.com/o/A%20Thousand%20Years%20-%20Christina%20Perri%20-%20Broken%20Heart%20-%20V.A%20-%20Playlist%20NhacCuaTui.MP3?alt=media&token=a6d63fd4-45a7-4dfa-b722-a7d46e23baa2"} />
           <audio controls type="audio/mpeg" src={"https://firebasestorage.googleapis.com/v0/b/ntl001-186700.appspot.com/o/musics%2Fvertu.mp3?alt=media&token=2d55827f-d50b-423b-bc45-575104502bbd"} />
        </div>
        <div className="player">
          <Player/>
        </div>
        {/* <button onClick={this.handleGetSong}>click</button> */}
        
      </div>
    )
  }
}
const initMapStateToProps = (state) => {
  return {
    projects: state.firestoreReducer.ordered.projects, 
    auth: state.firebaseReducer.auth,
    notifications: state.firestoreReducer.ordered.notifications,
  }
};
export default compose(
  connect(initMapStateToProps),
  firestoreConnect([
    {collection: 'projects',limit: 1000, orderBy: ['createdAt', 'desc']},
    {collection: 'notifications', limit: 5, orderBy: ['time', 'desc']}
  ])
) (Dashboard);