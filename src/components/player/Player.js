import React from 'react';
import './Player.css';

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          play: false,
          // muted: false,
          // loop: false,
          // currentTime: 0,
          // startTime: 0,
          // duration: 0,
           autoPlay: true,
           volume: 100,
          // ended: 0,
          // value: 0,
        };
        this.audio = new Audio();
       this.audio.src = this.props.song.url;
      }
    
      play = () => {
        this.audio.pause();
        this.setState({
          ...this.state,
          play: false
        });
      };
      
      pause = () => {
        this.audio.play();
        this.setState({
          ...this.state,
          play: true
        });
      };

      handleChange = (event) => {
        //this.setState({value: event.target.value});
      };
      handleChangeVolume = (event) => {
          const volume = event.target.value;
        this.setState({
          volume: volume
        });
      };

  componentDidMount() {
    if (this.props.play === true) {
      this.setState({
        ...this.state,
        play: true
      });
    }
  }
  componentWillReceiveProps(nextProps) {
      this.audio.src = nextProps.song.url;
      if (this.props.play === true) {
        this.setState({
          ...this.state,
          play: true
        });
      }
  }


    render() {
      console.log('change audio: ');

      this.audio.autoplay = this.state.autoPlay;
    //  this.audio.loop = this.state.loop;
      this.audio.volume = this.state.volume/100;
        // this.audio.currentTime = this.state.currentTime;
      //audio.addEventListener('ended', this.props.ended);
      let processButton = (<button onClick={this.play}>Play</button>);

      if (!this.state.play) {
          processButton = (
             <button onClick={this.pause}>Pause</button>
          );
      } else if (this.state.play) {
          processButton = (
              <button onClick={this.play}>Play</button>
          );
      }
    
      return (
        <div className = "player">
          <button className="" onClick={this.props.backSong}>back</button>
          {processButton}
          <button className="" onClick={this.props.nextSong}>next</button>

          <div>
            {this.props.song && this.props.song.fileName}
          </div>


            <input type="range" min="0" max="100" step="1"
                value={0}
                onChange={this.handleChange}
            />
            <input type="range" min="0" max="100" step="1"
                value={this.state.volume}
                onChange={this.handleChangeVolume}
            />
            <div className="">
            </div>
        </div>
        );
      }
}

export default Player;
