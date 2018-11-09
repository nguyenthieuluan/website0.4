import './Messenger.css';
import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';

class Messenger extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://192.168.56.1:6900",
      color: 'white',
      message: '',
      feedback: '',
      output: []
    };
  }

  // sending sockets
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('change color', this.state.color) // change 'red' to this.state.color
  }
  

  // adding the function
  setColor = (color) => {
    this.setState({ color })
  }
  
  ///
  sendMessage = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('chat', this.state.message) // change 'red' to this.state.color
  }

  // get message content
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };
  componentDidMount = () => {
    
    const socket = socketIOClient(this.state.endpoint);

    socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
    })

    socket.on('chat', (data)=>{
      this.setState({
        feedback: null,
        output: [
          ...this.state.output, 
          (<p><strong>{this.props.profile && this.props.profile.firstName} {this.props.profile && this.props.profile.lastName}:</strong>{data}</p>)
        ]
      })
    })
  
    socket.on('typing', ()=>{
      this.setState({
        feedback: <p><em>thieu luan is typing a message...</em></p>
      })
    })

  }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send() }>Change Color</button>
        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>
        <div className="container">
         <div className="row">
           <div className="col s12 m3">
             <div className="white left-align">
             <input placeholder="search"/>
             <ul>
               <li>
                 <a href="/" className="btn btn-floating pink lighten-1">TiTri</a>
               </li>
             </ul>
             </div>
           </div>
           <div className="col s12 m8 offset-m1">
           <div className="white">
       
          <div id="mario-chat">
            <p>Chat</p>
            <div id="chat-window">
                <div id="output">
                  {this.state.output}
                </div>
                <div id="feedback">
                  {this.state.feedback}
                </div>
            </div>
            <input id="message" type="text" placeholder="Message" onChange={this.handleChange}/>
            <button className="btn pink" id="send" onClick={this.sendMessage}>Send</button>
        </div>
           </div>
           </div>
         </div>
       </div>
    </div>
    )
  }
}
const initMapStateToProps = (state) => {
  console.log(state.firebaseReducer.profile);
  return {
    profile: state.firebaseReducer.profile
  }
};
export default connect(initMapStateToProps)(Messenger);