import React, { Component } from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import "./Dashboard.css";
import Player from '../player/Player';
import Songs from './Songs';
import Rain from '../rain/Rain';

class Dashboard extends Component{
  constructor () {
    super()
    this.state = {
      currentSong: {
        name: 'Nohidea',
        url: 'https://firebasestorage.googleapis.com/v0/b/ntl001-186700.appspot.com/o/musics%2FNohidea-Drowning.mp3?alt=media&token=b2b958a5-431d-4992-93fd-a161da17e17d'
      }
    }
  }

  render() {
    const {musics} = this.props;
    return (
      <div className="dashboard container">
        <Rain numDrops={500}/>
        <div>
          <Songs songs = {musics}/>
        </div>
        <div className="player">
          <Player song={this.state.currentSong}/>
        </div>
      </div>
    )
  }
}
const initMapStateToProps = (state) => {
  return {
    musics: state.firestoreReducer.ordered.musics, 
    auth: state.firebaseReducer.auth,
  }
};
export default compose(
  connect(initMapStateToProps),
  firestoreConnect([
    {collection: 'musics',limit: 1000, orderBy: ['updateAt', 'desc']},
  ])
) (Dashboard);