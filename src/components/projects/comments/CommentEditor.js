import React from 'react';

const CommentEditor = (props) => {
  return (
    <div>
      <form onSubmit={props.handleComment}>
        <input placeholder="Enter a comment"
               type="text"
               value={props.value}
               onChange={props.onChangeValue}/>
      </form>
    </div>
  );
};

export default CommentEditor;
