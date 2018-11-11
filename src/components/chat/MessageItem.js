import React from 'react';
import moment from "moment";
import './Chat.css';

const MessageItem = props => {
        // {/*<p className="grey-text">{moment(props.createdAt.toDate()).calendar()}</p>*/}
  return (
    <div className="left-align message-item">
        <span className="">{props.content}</span>
        <p className="grey-text message-item-time">{moment(props.createdAt.toDate()).calendar()}</p>
    </div>
  );
};
export default MessageItem;

