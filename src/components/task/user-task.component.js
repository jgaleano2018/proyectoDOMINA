import React, { Component } from "react";
import TaskDataService from "../../services/task.service";
import UserTaskDataService from "../../services/userTask.service";

export default class UserTask extends Component {
  constructor(props) {
    super(props);
    this.saveUserTask = this.saveUserTask.bind(this);
    this.retrieveTask = this.retrieveTask.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);

    this.state = {
      id: null,
      tasks: [],
      currentUserIndex: -1,
      currentTask: null,
      currentIndex: -1,
      submitted: false
    };
  }

  componentDidMount() {   
    let userId = JSON.parse(localStorage.getItem('user'));    
    this.setState({
        currentUserIndex: userId
    });
    this.retrieveTask();
  }
  
  saveUserTask() {
    var data = {
      id_user: this.state.currentUserIndex,
      id_task: this.state.currentIndex
    };

    UserTaskDataService.create(data)
      .then(response => {
        this.setState({
          id_user: response.data.id_user,
          id_task: response.data.id_task,
          submitted: true
        });
        console.log(response.data);

      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveTask() {
    TaskDataService.getAll()
    .then(response => {
        this.setState({
            tasks: response.data
        });
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });
  }
  
  refreshList() {
    this.retrieveTask();
    this.setState({
      currentTask: null,
      currentIndex: -1
    });
  }

  setActiveTask(rol, index) {
    this.setState({
      currentTask: rol,
      currentIndex: index
    });
  }

  render() {
    return (
      <div className="">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success">
              Get Return
            </button>
          </div>
        ) : (
          <div>
            
            <div className="col-md-6">
                <h4>Module User - New Tasks</h4>
                <br/>
                <h4>Tasks List</h4>
                <ul className="list-group">
                    {this.state.tasks &&
                    this.state.tasks.map((task, index) => (
                        <li
                        className={
                            "list-group-item " +
                            (index === this.state.currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveTask(task, index)}
                        key={index}
                        >
                        {task.name}
                        </li>
                    ))}
                </ul>

            </div>

            <button onClick={this.saveUserTask} className="btn btn-success">
              Save
            </button>
          </div>
        )}
      </div>
    );
  }
}