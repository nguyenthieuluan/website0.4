import React, {Component} from 'react';
//import './Chat.css';
import {createChat, createMessage} from "../../store/actions/chatActions";
import {connect} from "react-redux";

class Chat extends Component {
  state = {
    content: '',
    createAt: '',
    uid: ''
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createMessage(this.state);
    // this.props.history.push('/')
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <div className="center-block">
            <p>Sent to: </p>
            <input id="uid" placeholder="find people" onChange={this.handleChange}/>
          </div>
          <input id="content" placeholder="Enter Message" onChange={this.handleChange}/>
          <button type="submit" className="btn">Send</button>
        </form>
      </div>
    )
  }
}

const initMapStateToProps = (state) => {
  return {
    auth: state.firebaseReducer.auth
  }
};
const initMapDispatchToProps = (dispatch) => {
  return {
    createChat: (chat) => dispatch(createChat(chat)),
    createMessage: (message) => dispatch(createMessage(message))
  }
};
export default connect(initMapStateToProps, initMapDispatchToProps)(Chat);
