import "./App.css";
import Dashboard from "./components/Dashboard";
import HeaderComponent from "./components/Layout/HeaderComponent";
import React from "react";
import ProjectTaskDashboard from "./components/ProjectTaskBoard/ProjectTaskDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProject from "./components/projects/AddProject";
import UpdateProject from "./components/projects/UpdateProject";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import UpdateProjectTask from "./components/ProjectTaskBoard/ProjectTasks/UpdateProjectTask";
import store from "./store";
import AddProjectTask from './components/ProjectTaskBoard/ProjectTasks/AddProjectTask';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <HeaderComponent />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route  path="/addProject" component={AddProject} />
        <Route  path="/updateProject/:id" component={UpdateProject} />
        <Route  path="/projectTaskDashboard/:id" component={ProjectTaskDashboard} />
        <Route  path="/addProjecttask/:id" component={AddProjectTask} />
        <Route  path="/updateProjectTask/:id/:seqId" component={UpdateProjectTask} />
        <Route  path="/login" component={LoginComponent} />
        <Route  path="/signUp" component={SignUpComponent} />
      </Router>
    </Provider>
  );
}

export default App;
