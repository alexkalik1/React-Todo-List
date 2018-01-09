import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: {}
    };
  }

  componentDidMount() {
    axios.get('/api/todo/'+this.props.match.params.id)
      .then(res => {
        this.setState({ todo: res.data });
        console.log(this.state.todo);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('/api/todo/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {this.state.todo.title}
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Todo List</Link></h4>
            <dl>
              <dt>Item:</dt>
              <dd>{this.state.todo.item}</dd>
              <dt>Description:</dt>
              <dd>{this.state.todo.description}</dd>
              <dt>Assigned To:</dt>
              <dd>{this.state.todo.toBeDoneBy}</dd>
              <dt>Deadline:</dt>
              <dd>{this.state.todo.deadline}</dd>
            </dl>
            <Link to={`/edit/${this.state.todo._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.todo._id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
