import React, { Component } from 'react';
import './Messenger.css';

export default class Messenger extends Component {
  render() {
    return (
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
         
          <div className="container-message">
            <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar"/>
            <p>Hello. How are you today?</p>
            <span className="time-right">11:00</span>
          </div>

          <div className="container-message darker">
            <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" className="right"/>
            <p>Hey! I'm fine. Thanks for asking!</p>
            <span class="time-left">11:01</span>
          </div>

          <div className="container-message">
            <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar"/>
            <p>Sweet! So, what do you wanna do today?</p>
            <span className="time-right">11:02</span>
          </div>

          <div className="container-message darker">
            <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" class="right"/>
            <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
            <span className="time-left">11:05</span>
          </div>

          </div>
          </div>
        </div>
      </div>
    )
  }
}
