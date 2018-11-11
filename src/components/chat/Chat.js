import React, {Component} from 'react';
import './Chat.css';
import {createChat, createMessage} from "../../store/actions/chatActions";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import MessageItem from "./MessageItem";
import ChatListItime from "./ChatListItime";
import {Redirect} from "react-router-dom";

class Chat extends Component {
  state = {
    chat: '',
    content: '',
    uid: '',
    chatId: '',
    suggestions: [
      {id: 3, name: "Bananas"},
    ],
    receiver: {
      id: '',
      firstName: '',
      lastName: ''
    },
    sender: {
      id: '',
      firstName: '',
      lastName: ''
    }
  };

  // get content message
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({tags})
  }

  handleAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({tags})
  }

  // choose convention
  handleSelectedUser = (chat) => {
    if (chat) {
      this.setState({
        chat: chat,
        chatId: chat.id
      })
    } else console.log('can not select chat');
  };

  // sent message
  handleSubmit = (e) => {
    e.preventDefault();
    const {profile, auth} = this.props;
    const message = {
      chatId: this.state.chat.id,
      content: this.state.content,
      sender: {id: auth.uid, firstName: profile.firstName, lastName: profile.lastName}
    };
    this.props.createMessage(message);
  };

  // subscribe props change
  componentWillReceiveProps(nextProps) {
    if (this.state.chatId) {
      this.setState({
        chat: nextProps.chats.find(x=>x.id === this.state.chatId)
      })
    }
  }

  /// render view
  render() {
    const {auth, chats} = this.props;

    if (!auth.uid) {
      return <Redirect to='/signin'/>
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col s3">
            <div className="friend-list white">
              <p>Chat list</p>
              <ul>
                {auth && chats && chats.filter(chat => chat.uid === auth.uid).map((chat, i) => {
                  return (
                    <li key={i}>
                      <div className="left-align" onClick={() => this.handleSelectedUser(chat)}>
                        <ChatListItime
                          firstName={chat.receiver.firstName}
                          lastName={chat.receiver.lastName}
                        />
                      </div>
                    </li>
                  )
                })}
                {/*{users && users.filter(u => u.key !== auth.uid).map((u, i) => {*/}
                {/*return (*/}
                {/*<li key={i}>*/}
                {/*<div onClick={() => this.handleSelectedUser(u)}>*/}
                {/*{u.firstName} {u.lastName}*/}
                {/*</div>*/}
                {/*</li>*/}
                {/*)*/}
                {/*})}*/}
              </ul>
            </div>
          </div>

          <div className="col s9">
            <form onSubmit={this.handleSubmit} className="white">
              <div className="center-block">
                <p className="left-align">Sent to: {this.state.chat && this.state.chat.receiver.lastName}</p>
                {/*<ReactTags*/}
                {/*tags={this.state.tags}*/}
                {/*suggestions={users && users.map(user => {*/}
                {/*return {id: user.key, name: `${user.firstName} ${user.lastName}`}*/}
                {/*})}*/}
                {/*handleDelete={this.handleDelete.bind(this)}*/}
                {/*handleAddition={this.handleAddition.bind(this)}/>*/}

                {/*<input id="uid" placeholder="find people" onChange={this.handleChange}/>*/}

              </div>
              <div className="chat-box">
                {this.state.chat && this.state.chat.message.map((m, i) => {
                  return (
                    <div key={i} className="left-align">
                      <MessageItem content={m.content}
                                   createdAt={m.createdAt}
                      />
                    </div>
                  )
                })}
              </div>
              <input id="content" placeholder="Enter Message" onChange={this.handleChange}/>
              <button type="submit" className="btn">Send</button>
            </form>
          </div>

        </div>
      </div>
    )
  }
}

const initMapStateToProps = (state) => {
  return {
    auth: state.firebaseReducer.auth,
    chats: state.firestoreReducer.ordered.chats,
    users: state.firestoreReducer.ordered.users,
    profile: state.firebaseReducer.profile
  }
};
const initMapDispatchToProps = (dispatch) => {
  return {
    createChat: (chat) => dispatch(createChat(chat)),
    createMessage: (message) => dispatch(createMessage(message))
  }
};
export default compose(
  connect(initMapStateToProps, initMapDispatchToProps),
  firestoreConnect([
    {collection: 'chats', limit: 1000, orderBy: ['createdAt', 'desc']},
    {collection: 'users', limit: 1000}
  ])
)(Chat);
