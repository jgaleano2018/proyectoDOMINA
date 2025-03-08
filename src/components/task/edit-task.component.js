import React, { Component } from "react";
import TaskDataService from "../../services/task.service";
import { withRouter } from '../../common/with-router';

class UpdateTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.getTask = this.getTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.retrieveTask = this.retrieveTask.bind(this);

    this.state = {
      currentTask: {
        id: null,
        name: "",
        published: false
      },
      currentTaskSource: null,
      tasks:[],
      message: ""
    };
  }

  componentDidMount() {
    let taskId = JSON.parse(localStorage.getItem('task'));    
    this.retrieveTask();
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          name: name
        }
      };
    });
  }

  getTask(id) {
    TaskDataService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask() {
    TaskDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The task was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/task');
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

  render() {
    const { currentTask } = this.state;

    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentTask.name}
                  onChange={this.onChangeName}
                />
              </div>
            </form>

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
            
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(UpdateTask);