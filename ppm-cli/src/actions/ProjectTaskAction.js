import axios from "axios";
import { GET_ERRORS, GET_PROJECT_TASK, GET_PROJECT_TASKS,DELETE_PROJECT_TASK} from "./types";

export const addProjectTask =
  (backlog_id, project_task, history) => async (dispatch) => {
    try {
      await axios.post(`/api/backlog/${backlog_id}`, project_task);
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      history.push(`/projectTaskDashboard/${backlog_id}`);
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

export const getProjectTask =
  (backlog_id, sequence, history) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/backlog/${backlog_id}/${sequence}`);
      dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data,
      });
    } catch (err) {
      history.push("/dashboard");
    }
  };

export const getProjectTasks = (backlog_id) => async (dispatch) => {
  const res = await axios.get(`/api/backlog/${backlog_id}`);
  dispatch({
    type: GET_PROJECT_TASKS,
    payload: res.data,
  });
};

export const deleteProjectTask = (id, sequence) => async (dispatch) => {
  if (window.confirm("are you sure")) {
    const res = await axios.delete(`/api/backlog/${id}/${sequence}`);
    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: id,
    });
  }
};
export const updateProjectTask =
  (projectTask, id, sequence, history) => async (dispatch) => {
    try {
      const res = await axios.patch(
        `/api/backlog/${id}/${sequence}`,
        projectTask
      );
      dispatch({
        type: GET_ERRORS,
        payload: res.data,
      });
      history.push(`/projectTaskDashboard/${id}`);
    } catch (err) {}
  };