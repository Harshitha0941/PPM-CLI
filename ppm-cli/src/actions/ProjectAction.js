import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const createProject = (project, history) => async (dispatch) => {
  try {
    await axios.post(
      //sending request using await
      "/api/projects",
      project
    );
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getProjects = () => async (dispatch) => {
  const res = await axios.get(
    //sending request using await
    "/api/projects/all"
  );
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};

export const getProject = (id) => async (dispatch) => {
  const res = await axios.get(
    //sending request using await
    `/api/projects/${id}`
  );
  dispatch({
    type: GET_PROJECT,
    payload: res.data,
  });
};

export const deleteProject = (id) => async (dispatch) => {
  if (window.confirm("are you sure"))
  {
    const res = await axios.delete(`/api/projects/${id}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });
  }
};
