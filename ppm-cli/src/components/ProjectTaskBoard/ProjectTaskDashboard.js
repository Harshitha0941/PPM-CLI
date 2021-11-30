import React from "react";
import CreateProjectTaskButton from "./CreateProjectTaskButton";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProjectTasks } from "./../../actions/ProjectTaskAction";
import ProjectBoard from "./ProjectBoard";

class ProjectTaskDashboard extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log("harsja--", id);
    this.props.getProjectTasks(id);
  }
  render() {
    let { project_tasks } = this.props.project_tasks;
    let sortedAsceding = project_tasks.sort((a, b) => {
      return a.priority - b.priority;
    });
    project_tasks = sortedAsceding;
    const { id } = this.props.match.params;
    console.log("From Projecttasss",project_tasks.status);
    
    return (
      <div>
        <CreateProjectTaskButton label="Add Project Task" id={id} />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <div className="card-header bg-secondary text-white">
                  <h3>TO DO</h3>
                </div>
              </div>

              {project_tasks.filter(
                (project_tasks) => project_tasks.status === "TO_DO").map((project_task) => {
                return (
                  <ProjectBoard
                    key={project_task.id}
                    project_task={project_task}
                  />
                );
              })}
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <div className="card-header bg-primary text-white">
                  <h3>In Progress</h3>
                </div>
              </div>
              {project_tasks.filter(
                (project_tasks) => project_tasks.status === "IN_PROGRESS").map((project_task) => {
                return (
                  <ProjectBoard
                    key={project_task.id}
                    project_task={project_task}
                  />
                );
              })}
            </div>

            <div className="col-md-4">
              <div className="card text-center mb-2">
                <div className="card-header bg-success text-white">
                  <h3>Done</h3>
                </div>
              </div>
              {project_tasks.filter(
                (project_tasks) => project_tasks.status === "DONE").map((project_task) => {
                return (
                  <ProjectBoard
                    key={project_task.id}
                    project_task={project_task}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectTaskDashboard.propTypes = {
  getProjectTasks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project_tasks: state.project_tasks,
});

export default connect(mapStateToProps, { getProjectTasks })(
  ProjectTaskDashboard
);