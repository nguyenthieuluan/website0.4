import React from 'react';
import CommentItem from './CommentItem';

const Comments = ({comments}) => {
  return (
    <div className="container">
      {comments && comments.map((comment, i) => {
        return (
          <div key={i}>
            i
            <CommentItem comment = {comment}/>
          </div>
        )
      })}
    </div>
  );
};

export default Comments;
