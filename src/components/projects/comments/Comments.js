import React from 'react';
import CommentItem from './CommentItem';
import './Comment.css'


const Comments = ({comments}) => {
  return (
    <div className="white">
      {comments && comments.map((comment, i) => {
        return (
          <div key={i}>
            <CommentItem comment = {comment}/>
          </div>
        )
      })}
    </div>
  );
};

export default Comments;
