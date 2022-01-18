import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    return (
        <div id="user-list">
            <table className="table">
  <thead>
    <tr>
      <th scope="col">User ID</th>
      <th scope="col">Email</th>
      <th scope="col">Is Admin?</th>
    </tr>
  </thead>
  <tbody>
      {this.props.users.map((user) => {
          return (
            <tr key={user.id}>
      <th scope="row">{user.id}</th>
      <td>{user.email}</td>
      <td>{user.administrator}</td>
    </tr>
          )
      })}
    
  </tbody>
</table>
      </div>
    );
  }
}

const mapState = (state) => {
    return {
      users: state.users,
    };
  };

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);