import React from 'react';
import moment from 'moment';

const Notifications = (props) => {
  const {notifications} = props;
    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">Notification</span>
            <ul className="notification">
              {notifications && notifications.map((item, i) => {
                return (
                  <li key={i} className="left-align">
                    <span className="pink-text">{item.user} </span>
                    <span>{item.content}</span>
                    <div className="grey-text note-date">
                      {moment(item.time.toDate()).fromNow()}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
};
export default Notifications;