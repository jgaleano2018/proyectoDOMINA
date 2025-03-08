import React, { Component } from "react";
import UserDataService from "../../services/user.service";
import RolDataService from "../../services/rol.service";
import UserRolDataService from "../../services/userRol.service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);
    this.retrieveRol = this.retrieveRol.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRol = this.setActiveRol.bind(this);

    this.state = {
      id: null,
      name: "",
      address: "", 
      phone: "",
      userName: "",
      password: "",
      roles: [],
      currentRol: null,
      currentIndex: -1,
      submitted: false
    };
  }

  componentDidMount() {
    this.retrieveRol();
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
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
  }

  saveUser() {
    var data = {
      name: this.state.name,
      address: this.state.address,
      phone: this.state.phone,
      userName: this.state.userName,
      password: this.state.password
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          address: response.data.address,
          phone: response.data.phone,
          userName: response.data.userName,
          password: response.data.password,    
          submitted: true
        });
        console.log(response.data);

        console.log("Before insert user by rol......");

        var data2 = {
            id_user: response.data.id,
            id_rol: this.state.currentIndex
        };

        console.log(data2);
      
        UserRolDataService.create(data2)
        .then(response => {
          this.setState({
            id_user: response.data.id_user,
            id_rol: response.data.id_rol,
            submitted: true
          });
          console.log(response.data);  
          
        })
        .catch(e => {
          console.log(e);
        });

      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      name: "",
      address: "", 
      phone: "",
      userName: "",
      password: "",
      submitted: false
    });
  }

  retrieveRol() {
    RolDataService.getAll()
    .then(response => {
        this.setState({
            roles: response.data
        });
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });
  }
  
  refreshList() {
    this.retrieveRol();
    this.setState({
      currentRol: null,
      currentIndex: -1
    });
  }

  setActiveRol(rol, index) {
    this.setState({
      currentRol: rol,
      currentIndex: index
    });
  }

  render() {
    return (
      <div className="">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                required
                value={this.state.address}
                onChange={this.onChangeAddress}
                name="address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                required
                value={this.state.phone}
                onChange={this.onChangePhone}
                name="phone"
              />
            </div>

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

            <br/>

            <div className="col-md-6">
                <h4>Roles List</h4>

                <ul className="list-group">
                    {this.state.roles &&
                    this.state.roles.map((rol, index) => (
                        <li
                        className={
                            "list-group-item " +
                            (index === this.state.currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveRol(rol, index)}
                        key={index}
                        >
                        {rol.name}
                        </li>
                    ))}
                </ul>

            </div>

            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}