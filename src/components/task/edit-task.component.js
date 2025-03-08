import React, { Component } from "react";
import TaskDataService from "../../services/task.service";

export default class UpdateTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.state = {
      id: null,
      name: "",
      submitted: false,
      tasks:[]
    };
    this.retrieveTask = this.retrieveTask.bind(this);
  }

  componentDidMount() {
    let taskId = JSON.parse(localStorage.getItem('task'));    
    this.retrieveTask(taskId);
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  updateTask() {
    TaskDataService.update(
      JSON.parse(localStorage.getItem('task')),
      {"id":this.state.id,
      "name":this.state.name}
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The task was updated successfully!"
        });
        console.log("The task was updated succesfully");
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    TaskDataService.delete(JSON.parse(localStorage.getItem('task')))
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/task');
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveTask(taskId) {
      TaskDataService.get(taskId)
      .then(response => {
          this.state = {
            id: response.data[0].id,
            name: response.data[0].name,
            tasks: response.data
          };
      })
      .catch(e => {
          console.log(e);
      });
  }

  render() {
    return (
      <>
        <h1>Edit Task</h1>
        <br/>
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
                name="name" />
            </div>

            <button
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '10px 2px',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
              onClick={this.deleteTask}
            >Delete</button>

            <button
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '10px 2px',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
              onClick={this.updateTask}
            >Update</button>
          </div>
        )}
      </div></>  
    )
  }
}