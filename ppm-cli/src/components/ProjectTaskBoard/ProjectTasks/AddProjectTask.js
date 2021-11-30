import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProjectTask } from "./../../../actions/ProjectTaskAction";
import { Link } from "react-router-dom";
import classnames from "classnames";

class AddProjectTask extends React.Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    console.log("from constr", id);
    this.state = {
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: 0,
      dueDate: "",
      projectIdentifier: id,
      errors: {}, 
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      console.log(nextProps.errors);
      this.setState({
        errors: nextProps.errors,
      });
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newProjectTask = {
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
    };
    this.props.addProjectTask(
      this.state.projectIdentifier,
      newProjectTask,
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
                className="btn btn-primary"
              >
                Back to Project Board
              </Link>
              <h5 className="display-4 text-center">
                Add /Update Project Task
              </h5>
              <p className="lead text-center"><b>Project Code -  {this.state.projectIdentifier}</b></p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Project Task summary</label>
                  <input
                    type="text"
                    className={ classnames("form-control form-control-lg ",{"is-invalid":errors.summary})}
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
                  className={ classnames("form-control form-control-lg ",{"is-invalid":errors.acceptanceCriteria})}
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
                  <p>{errors.dueDate}</p>
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
                  <p>{errors.priority}</p>
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
                  </select>
                  <p>{errors.status}</p>
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

AddProjectTask.propTypes = {
  addProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { addProjectTask })(AddProjectTask);