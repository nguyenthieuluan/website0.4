import React, {Component} from 'react';

class  ProjectDetails extends Component {

  render() {
    const id = this.props.match.params.id;
    return (
      <div className="container project-detail section">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">
              Project title {id}
            </span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consequuntur, culpa dignissimos ducimus enim ex harum impedit maxime natus necessitatibus nemo placeat similique. Consectetur itaque nisi quas reprehenderit suscipit tenetur!
            </p>
          </div>
          <div className="card-action lighten-4 grey-text grey">
            <div>Posted by nguyenthieuluan</div>
            <div>2nd semtemper 2am</div>
          </div>
        </div>
      </div>
    )
  }
}
export default ProjectDetails;
