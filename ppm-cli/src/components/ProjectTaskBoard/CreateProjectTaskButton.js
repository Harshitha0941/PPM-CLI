import React from "react";
import {Link} from "react-router-dom";
const CreateProjectTaskButton = (props) => {
  return (
      <div>
      <Link to={`/addProjectTask/${props.id}`} className="btn btn-primary mb-3">
      <i className="fas fa-plus-circle"> {props.label}</i>
    </Link>
    <br />
  </div>
  );
};

export default CreateProjectTaskButton;