import React from 'react';

const CommentItem = ({comment}) => {
    return (
          <div className="card z-depth-0 left-align comment-item">
            <div className="card-action lighten-4 grey-text grey comment-content">
              <span><b>{comment.authorLastName}: </b>{comment.content}</span>
              {/* <div>{moment(project.createdAt.toDate()).calendar()}</div> */}
            </div>
          </div>
    );
};

export default CommentItem;