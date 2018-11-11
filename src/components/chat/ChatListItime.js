import React from 'react';

const ChatListItime = (props) => {
  return (
    <div>
      {/*<button className="btn btn-floating pink z-depth-1">{props.initials}</button>*/}
      <p className="pink-text lighten-1">{props.firstName} {props.lastName}</p>
    </div>
  );
};

export default ChatListItime;

