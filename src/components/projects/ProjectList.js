import React from 'react';
import ProjectSummary from "./ProjectSummary";
import { Link } from 'react-router-dom';


const ProjectList = ({projects}) => {
    return (
      <div className="project-list section">
        { projects && projects.map((project, i) => {
          return (
            <Link key={i} to={'/project/' + project.id}>
              <ProjectSummary project={project} key={project.id}/>
            </Link>
          )
        }) }
      </div>
    )
};

export default ProjectList;
