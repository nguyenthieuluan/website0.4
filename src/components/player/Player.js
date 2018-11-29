import React from 'react';
import './Player.css';

const Player = (props) => {
    const {song} = props;
    return (
        <div className="player">
            {/* <button className="previous round">&#8249;</button>
            <button className="next round">&#8250;</button> */}
            <audio controls type="audio/mpeg" src={song.url} />
            <span>{song.name}</span>
        </div>
        
    )
}

export default Player;
