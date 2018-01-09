import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

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

  onChange = (e) => {
    const state = this.state.todo
    state[e.target.name] = e.target.value;
    this.setState({todo:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { item, description, toBeDoneBy, deadline } = this.state.todo;

    axios.put('/api/todo/'+this.props.match.params.id, { item, description, toBeDoneBy, deadline })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT TODO
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.todo._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Todo List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="item">Item:</label>
                <input type="text" class="form-control" name="item" value={this.state.todo.item} onChange={this.onChange} placeholder="Item" />
              </div>
              <div class="form-group">
                <label for="toBeDoneBy">Assigned To:</label>
                <input type="text" class="form-control" name="author" value={this.state.todo.toBeDoneBy} onChange={this.onChange} placeholder="Assigned To" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" class="form-control" name="description" value={this.state.todo.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="deadline">Deadline:</label>
                <div class='input-group date' data-provide="datepicker">
                  <input type="number" class="form-control" name="deadline" value={this.state.todo.deadline} onChange={this.onChange} placeholder="Deadline" />
                  <div class="input-group-addon">
                    <span class="glyphicon glyphicon-th"></span>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
