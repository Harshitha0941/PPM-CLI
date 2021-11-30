import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { deleteProjectTask } from "../../actions/ProjectTaskAction";

class ProjectBoard extends React.Component {
  ondeleteClick = (id, projectSequence) => {
    // window.location.reload(false);
    console.log("delete project", id, "  seq id:", projectSequence);
    this.props.deleteProjectTask(id, projectSequence);
   window.location.reload(true);
  };
  render() {
    const { project_task } = this.props;
    let priorityString;
    let priorityClass;

    if (project_task.priority === 1) {
      priorityClass = "bg-danger text-light";
      priorityString = "HIGH";
    }

    if (project_task.priority === 2) {
      priorityClass = "bg-warning text-light";
      priorityString = "MEDIUM";
    }

    if (project_task.priority === 3) {
      priorityClass = "bg-info text-light";
      priorityString = "LOW";
    }


    return (
      <div className="card mb-1 bg-light">
      <div className={`card-header text-primary ${priorityClass}`}>
          ID: {project_task.projectSequence} -- Prioirty : {priorityString}
        </div>

        <div className="card-body bg-light">
          <h5 className="card-title"> {project_task.summary}</h5>

          <p className="card-text text-truncate ">
            {project_task.acceptanceCriteria}
          </p>

          <Link
            to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`}
            className="btn btn-primary"
          >
            Update
          </Link>
          <li
            className="list-group-item delete"
            onClick={this.ondeleteClick.bind(
              this,
              project_task.projectIdentifier,
              project_task.projectSequence
            )}
          >
            <i className="btn btn-danger ml-4">Delete Project</i>
          </li>
        </div>
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired,
};

export default connect(null, { deleteProjectTask })(ProjectBoard);