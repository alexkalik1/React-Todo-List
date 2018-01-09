import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    axios.get('/api/todo')
      .then(res => {
        this.setState({ todos: res.data });
        console.log(this.state.todos);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Todo Catalog</h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>Add Todo Item</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Assigned To</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {this.state.todos.map(todo =>
                  <tr>
                    <td><Link to={`/show/${todo._id}`}>{todo.item}</Link></td>
                    <td>{todo.toBeDoneBy}</td>
                    <td>{todo.deadline}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
