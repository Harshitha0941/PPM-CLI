import React, { Component } from "react";
import { getProject, createProject } from "./../../actions/ProjectAction";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import classnames from "classnames";

class UpdateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
      errors:{},
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProject(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    const {
      id, 
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    } = nextProps.project;
    this.setState({
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    });
  }

  onChange = (event) => {

    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = (event) => {
    event.preventDefault();
    const updatedProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    
    this.props.createProject(updatedProject, this.props.history);
  };
  render() {
    const {errors}=this.state; 
    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Edit Project form</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                  <label>Project Name</label>
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ",{"is-invalid":errors.projectName})}
                      placeholder="Project Name"
                      name="projectName"
                      value={this.state.projectName}
                      onChange={this.onChange}
                    />
                    ??{errors.projectName&&(
                      <div className="invalid-feedback">{errors.projectName}</div>
                    )} 
                   ?? ?? ?? ?? ?? ?? ?? ?? ?? ??
                  </div>
                   ?? ?? ?? ?? ?? ?? ??
                  <div className="form-group">
                  <label>Project Identifier</label>?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ??
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ",{"is-invalid":errors.projectIdentifier})}
                      placeholder="Unique Project ID"
                      name="projectIdentifier"
                      disabled
                      value={this.state.projectIdentifier}
                    />
                    ??  {errors.projectIdentifier&&(
                      <div className="invalid-feedback">{errors.projectIdentifier}</div>
                    )}?? ?? ?? ?? ?? ?? ?? ?? ?? ??
                  </div>
                  ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ??
                  <div className="form-group">
                  ?? ??<label>Project Summary</label> ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ??
                    <textarea
                    className={classnames("form-control form-control-lg ",{"is-invalid":errors.description})}
                      placeholder="Project Description"
                      name="description"
                      onChange={this.onChange}
                      value={this.state.description}
                    ></textarea>
                    ?? ??{errors.description&&(
                      <div className="invalid-feedback">{errors.description}</div>
                    )}?? ?? ?? ?? ?? ?? ?? ?? ??
                  </div>
                  ?? ?? ?? ?? ??
                  <div className="form-group">
                  ?? ??<label>Start Date</label> ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ??
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="start_date"
                      onChange={this.onChange}
                      value={this.state.start_date}
                    />
                    ?? <p>{errors.start_date}</p>?? ?? ?? ?? ?? ?? ?? ?? ??
                  </div>
                  <h6>Estimated End Date</h6>?? ?? ?? ?? ?? ?? ?? ?? ??
                  <div className="form-group">
                    ?? ??<label>Estimated End Date</label> ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ??
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="end_date"
                      onChange={this.onChange}
                      value={this.state.end_date}
                    />
                    ?? ?? ?? ?? ?? ?? ?? ?? ??
                  </div>?? ?? ?? ?? ?? ?? ?? ?? ??
                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                  ?? ?? ?? ?? ?? ?? ?? ??
                </form>
                ?? ?? ?? ?? ?? ??
              </div>
              ?? ?? ??
            </div>
            ??
          </div>
          ??
        </div>
      </div>
    );
  }
}

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.projects.project,
  errors: state.errors,
});
export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);