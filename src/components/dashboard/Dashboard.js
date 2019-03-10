import React, { Component } from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import "./Dashboard.css";
import Player from '../player/Player';
import Songs from './Songs';
// import Menu from '../ui/menu/Menu';
import BackGround from '../ui/back-ground/BackGround';
import MailTo from '../ui/mail-to/MailTo';
// import CanvasComponent from '../canvas/Canvas';

class Dashboard extends Component{
  constructor () {
    super()
    this.state = {
      currentSongIndex: 0,
      play: false,
      autoplay: true,
      transform: null
    }
  }
  mail = 'luanthieu.nguyen@gmail.com';

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
  
  handleScroll = (event) => {
    let scrollTop = event.srcElement.body.scrollTop,
        itemTranslate = Math.min(0, scrollTop/3 - 60);

    this.setState({
      transform: itemTranslate
    });

    console.log('scroll ',this.state.transform);
    
  };

  componentWillMount() {
    if (this.state.autoplay === true) {
      this.setState({
        ...this.state,
        play: true
      });
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount = () => {
      window.removeEventListener('scroll', this.handleScroll);
  };

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
      <div>
        <span className="version">
          v1.02
        </span>
        <div className="back-ground">
          <BackGround/>
        </div>
        <div className="mail-to">
          <MailTo email={'mailto:' + this.mail}/>
        </div>
        <div className="dashboard container">
          <div className="menu">
            {/* <Menu/> */}
          </div>
          <div className="play-list" >
            <Songs songs = {musics}/>
          </div>
          <div className="player">
            {player}
          </div>
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
    {collection: 'musics',limit: 1000, orderBy: ['updateAt', 'asc']},
  ])
) (Dashboard);

