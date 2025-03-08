import React, { Component } from "react";
import UserDataService from "../../services/user.service";
import { NavLink  } from "react-router-dom";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.retrieveUser = this.retrieveUser.bind(this);
    
    this.state = {
      id: null,
      userName: "",
      password: "",
      users: [],
      submitted: false
    };
  }

  componentDidMount() {
    this.retrieveUser();
  }

  onChangeUserName(e) {
    this.setState({
      userName: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });

    this.state.users.forEach((user, index) => {

        if(this.state.users[index].userName === this.state.userName && this.state.users[index].password === e.target.value) {
            this.setState({
                id: this.state.users[index].id
            });

            localStorage.setItem('user', JSON.stringify(this.state.users[index].id));
        }
    });

  }


  retrieveUser() {
      UserDataService.getAll()
      .then(response => {
          this.setState({
              users: response.data
          });
          console.log(response.data);
      })
      .catch(e => {
          console.log(e);
      });
  }

  render() {
    return (
      <div className="submit-form">
        {
          <div>
              
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                required
                value={this.state.userName}
                onChange={this.onChangeUserName}
                name="userName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>

            <div className="d-flex justify-content-start">
            <NavLink exact="true" className="nav-link me-5" to={"/components/task/user-task/" + this.state.id} style={{color: 'blue'}}>Login
            </NavLink>

            <NavLink exact="true" className="nav-link" to={"/components/user/add/"} style={{color: 'blue'}}>Register New user
            </NavLink>
            </div>
          </div>
        }
      </div>
    );
  }
}