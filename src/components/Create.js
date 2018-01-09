import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      item: '',
      description: '',
      toBeDoneBy: '',
      deadline: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { item, description, toBeDoneBy, deadline } = this.state;

    axios.post('/api/todo', { item, description, toBeDoneBy, deadline })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { item, description, toBeDoneBy, deadline } = this.state;
    return (
      <div class="container">
        <div class="pane, panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Add Todo Item</h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="item">Item:</label>
                <input type="text" class="form-control" name="item" value={item} onChange={this.onChange} placeholder="Item" />
              </div>
              <div class="form-group">
                <label for="toBeDoneBy">Assigned To:</label>
                <input type="text" class="form-control" name="toBeDoneBy" value={toBeDoneBy} onChange={this.onChange} placeholder="Assigned to" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="deadline">Published Deadline:</label>
                <div class='input-group date' data-provide="datepicker">
                  <input type="text" class="form-control" name="deadline" value={deadline} onChange={this.onChange} placeholder="Deadline" />
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

export default Create;
