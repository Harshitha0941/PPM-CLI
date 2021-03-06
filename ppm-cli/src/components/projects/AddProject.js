import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "./../../actions/ProjectAction";
import PropTypes from "prop-types";
import classnames from "classnames";
class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectIdentifier: " ",
      description: "",
      start_date: "",
      end_date: "",
      errors: {}, 
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = (event) => {
    event.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    this.props.createProject(newProject, this.props.history);
  };
  render() {
    const {errors}=this.state; 
    return(
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <h6>projectName</h6>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ",{"is-invalid":errors.projectName})}
                    placeholder="Project Name"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.onChange}
                  />
                  {errors.projectName&&(
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}
                </div>
                <h6>ProjectId</h6>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ",{"is-invalid":errors.projectIdentifier})}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={this.state.projectIdentifier}
                    onChange={this.onChange}
                  />
                  {errors.projectIdentifier&&(
                    <div className="invalid-feedback">{errors.projectIdentifier}</div>
                  )}
                </div>
                <h6>Desc</h6>
                <div className="form-group">
                  <textarea
                  className={classnames("form-control form-control-lg ",{"is-invalid":errors.description})}
                    placeholder="Project Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  ></textarea>
                  {errors.description&&(
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                <h6>Start Date</h6>

                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    value={this.state.start_date}
                    onChange={this.onChange}
                  />
                  <p>{errors.start_date}</p>
                </div>

                <h6>Estimated End Date</h6>

                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={this.state.end_date}
                    onChange={this.onChange}
                  />
                  <p>{errors.end_date}</p>
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
AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { createProject })(AddProject);

