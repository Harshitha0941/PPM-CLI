import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProjectTask } from "../../../actions/ProjectTaskAction";
import { updateProjectTask } from "../../../actions/ProjectTaskAction";
import { Link } from "react-router-dom";
import classnames from "classnames";

class UpdateProjectTask extends React.Component {
  constructor(props) {
    super(props);
    const projectId = this.props.match.params.id;
    this.state = {
      id: "",
      projectSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: 0,
      dueDate: "",
      projectIdentifier: projectId,
      errors: {},
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    const { seqId } = this.props.match.params;
    this.props.getProjectTask(id, seqId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    const {
      id,
      projectSequence,
      summary, 
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
    } = nextProps.project_task;
    this.setState({
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
    });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = (event) => {
    event.preventDefault();
    const projectId = this.props.match.params.id;
    const { seqId } = this.props.match.params;
    const updatedProjecttask = {
      id: this.state.id,
      projectSequence: this.state.projectSequence,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
    };
    
    this.props.updateProjectTask(
      updatedProjecttask,
      projectId,
      seqId,
      this.props.history
    );
  };
  render() {
     const { errors } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/projectTaskDashboard/${this.state.projectIdentifier}`}
                className="btn btn-light"
              >
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">Project Name + Project Code</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">   
                <label>Project Identifier</label>          
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    disabled
                    value={this.state.projectIdentifier}
                  />
                                    
                </div>
                <div className="form-group">
                 <label>Project ID</label>             
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Project ID"
                    name="id"
                    disabled
                    value={this.state.id}
                  />                 
                </div>
                <div className="form-group">
                <label>Project Summary</label>   
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ",{"is-invalid":errors.summary})}
                    name="summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                    placeholder="Project Task summary"
                  />
                  {errors.summary&&(
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}  
                </div>
                <div className="form-group">
                <label>Acceptance Criteria</label>   
                  <textarea
                  className={classnames("form-control form-control-lg ",{"is-invalid":errors.acceptanceCriteria})}
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  ></textarea>
                  {errors.acceptanceCriteria&&(
                    <div className="invalid-feedback">{errors.acceptanceCriteria}</div>
                  )}  
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                  
                </div>
                <div className="form-group">
                <label>Priority</label>   
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    onChange={this.onChange}
                    value={this.state.priority}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>
                <div className="form-group">
                <label>Status</label>   
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    onChange={this.onChange}
                    value={this.state.status}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project_task: state.project_tasks.project_task,
  errors: state.errors,
});
export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);