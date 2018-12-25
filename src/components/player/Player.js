import React from 'react';
import './Player.css';

class Player extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          play: false,
          // muted: false,
          loop: false,
          // currentTime: 0,
          // startTime: 0,
          // duration: 0,
           autoPlay: true,
           volume: 100,
          // ended: 0,
          // value: 0,
          currentTime: 0,
          duration: '00:00',
          duration1: null

        };
        this.audio = new Audio();
       this.audio.src = this.props.song.url;
      }


  componentDidMount() {

    this.slider.value = 0;

		this.currentTimeInterval = null;

		// Get duration of the song and set it as max slider value
		this.audio.onloadedmetadata = function() {
			this.setState({...this.state, duration1: this.audio.duration});
		}.bind(this);

		// Sync slider position with song current time
		this.audio.onplay = () => {
			this.currentTimeInterval = setInterval( () => {
        this.slider.value = this.audio.currentTime;
			}, 1000);
		};

		this.audio.onpause = () => {
			clearInterval(this.currentTimeInterval);
		};

		// Seek functionality
    this.slider.oninput = (e) => {
      clearInterval(this.currentTimeInterval);
      this.audio.currentTime = e.target.value;

    };
    ///
    if (this.props.play === true) {
      this.setState({
        ...this.state,
        play: true
      });
    };
    this.audio.addEventListener('loadedmetadata', (event) => {
      const t = (Math.floor(this.audio.duration));
      const minute = ('0' + Math.floor(t/60)).slice(-2);

      const second = ('0' + (t - Math.floor(minute*60))).slice(-2);
      const duration = minute + ':' + second;
      this.setState({
        ...this.state, duration: duration
      });

    }, false);
    this.audio.addEventListener('ended', this.props.ended);

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

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /// handle
  handlePlay = () => {
    this.audio.pause();
    this.setState({
      ...this.state,
      play: false
    });
  };

  handlePause = () => {
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

  handleLoop = () => {
    this.setState({
      ...this.state,
      loop: !this.state.loop
    }, () => {
      console.log(this.state.loop)
      this.audio.loop = this.state.loop;
    })
  };
  /// View
  render() {
    console.log('update player')

    /// audio properties
    this.audio.autoplay = this.state.autoPlay;
    this.audio.volume = this.state.volume/100;

    /// event handle

    this.audio.addEventListener('timeupdate', (event) => {
      const currentTime = Math.floor(this.audio.currentTime);
      // this.setState({
      //   currentTime: currentTime
      // })
      //currentMinute = Math.floor(currentTime/60);
      //currentSecond = currentTime - currentMinute*60;
  }, false);


  /// element View
    let processButton = (<button onClick={this.handlePlay}>Play</button>);

    if (!this.state.play) {
        processButton = (
            <div className="pause" onClick={this.handlePause}/>
        );
    } else if (this.state.play) {
        processButton = (
            <div className="play" onClick={this.handlePlay}/>
        );
    }

    let loopButton = (<div className="loop" onClick={this.handleLoop}>
                      </div>);

    if (this.state.loop) {
      loopButton = (<div className="loop-current" onClick={this.handleLoop}>
                      </div>);
    } else {
      loopButton = (<div className="loop" onClick={this.handleLoop}>
                      </div>);
    }

    return (
      <div className = "player">

          <div className="previous" onClick={this.props.backSong}/>
          {processButton}
          <div className="next" onClick={this.props.nextSong}/>

        <div>
          {this.state.currentTime}
        </div>

        <div className="time-bar">
              <input ref={(slider) => { this.slider = slider }}
                className="seak-bar"
                type="range"
                name="points"
                id="points"
                data-show-value="true"
                min="0" max={this.state.duration1} />
        </div>

        {this.state.duration}

        <div className="volume">
          <input type="range" 
            className="volume"
            min="0" max="100" step="1"
            value={this.state.volume}
            onChange={this.handleChangeVolume}
          />
        </div>

        {loopButton}

        <div className="track-info">
          {this.props.song && this.props.song.fileName}
        </div>

      </div>
      );
    }
}

export default Player;
