import React, { Component } from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import "./Dashboard.css";
import Player from '../player/Player';
import Songs from './Songs';
// import CanvasComponent from '../canvas/Canvas';

class Dashboard extends Component{
  constructor () {
    super()
    this.state = {
      currentSongIndex: 0,
      play: false,
      autoplay: true,
    }
  }

  

  handleBackSong = () => {
    if (this.state.currentSongIndex > 0) {
      const index = this.state.currentSongIndex - 1;
      this.setState({
        ...this.state,
        currentSongIndex: index,
        play: true
      });
    }
  };
  handleNextSong = () => {
    const index = this.state.currentSongIndex + 1;
    if (index < this.props.musics.length) {
      this.setState({
        ...this.state,
        currentSongIndex: index,
        play: true
      });
    } else {
      this.setState({
        ...this.state,
        currentSongIndex: 0,
        play: true
      });
    }
  };
  handleEndedSong = () => {
    this.handleNextSong();
  };

  componentWillMount() {
    if (this.state.autoplay === true) {
      this.setState({
        ...this.state,
        play: true
      });
    }
  }

  render() {
    // const foo= new Sound("url",100,true);
    // foo.start();
    // foo.stop();
    // foo.start();
    // foo.init(100,false);
    // foo.remove();
    const {musics} = this.props;
    const player = musics ? (
        <Player song={musics[this.state.currentSongIndex]}
                autoplay={this.state.autoplay}
                play={this.state.play}
                ended={this.handleEndedSong}
                backSong={this.handleBackSong}
                nextSong={this.handleNextSong}
        />
      ) : 'loading...';
    return (
      <body id="page">
        <ul class="cb-slideshow">
          <li><span>Image 01</span></li>
          <li><span>Image 02</span></li>
          <li><span>Image 03</span></li>
          <li><span>Image 04</span></li>
          <li><span>Image 05</span></li>
          <li><span>Image 06</span></li>
        </ul>
        <div className="dashboard container">
          <Songs songs = {musics}/>
          <div className="player">
            {player}
          </div>
        </div>
      </body>
      
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
    {collection: 'musics',limit: 1000, orderBy: ['updateAt', 'asc']},
  ])
) (Dashboard);

