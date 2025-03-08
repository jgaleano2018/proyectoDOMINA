import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import User from "./components/user/user.component";
import AddUser from "./components/user/add-user.component";
import Task from "./components/task/task.component";
import UserTask from "./components/task/user-task.component";
import AddTask from "./components/task/add-task.component";
import UpdateTask from "./components/task/edit-task.component";

class App extends Component {
  render() {
    return (
      <div>
         <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/user" className="navbar-brand">
            Users
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/components/user/user"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/components/task/task"} className="nav-link">
                Tasks
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/components/user/user" element={<User/>} />
            <Route path="/components/user/add" element={<AddUser/>} />
            <Route path="/components/task/task" element={<Task/>} />
            <Route path="/components/task/user-task/:id" element={<UserTask/>} />
            <Route path="/components/task/add" element={<AddTask/>} />
            <Route path="/components/task/update/:id" element={<UpdateTask/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;