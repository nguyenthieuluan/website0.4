import React from 'react';

const CommentItem = ({comment}) => {
    return (
        <div className="left-align">
          <div className="card z-depth-0">
            <div className="card-content">
            
              <p>
                {comment.content}
              </p>
            </div>
            <div className="card-action lighten-4 grey-text grey">
              <div>Posted by {comment.authorLastName}</div>
              {/* <div>{moment(project.createdAt.toDate()).calendar()}</div> */}
            </div>
          </div>
        </div>
    );
};

export default CommentItem;