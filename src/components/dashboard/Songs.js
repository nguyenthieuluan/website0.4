import React from 'react';
import moment from 'moment';
import "./Dashboard.css";

const Songs = (props) => {
  const {songs} = props;
    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content black white-text">
            <span className="card-title">Play List</span>
            <ul className="notification play-list-content">
              {songs && songs.map((item, i) => {
                return (
                  <li key={i} className="left-align">
                    <div className="white-text">{item.fileName} </div>
                    <div className="grey-text note-date">
                      {moment(item.updateAt.toDate()).fromNow()}
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
export default Songs;