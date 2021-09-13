import { Component } from "react";

import UsersTable from "../UsersTable";
import "./index.css";

class UsersSearch extends Component {
  state = { searchUserInput: "" };

  // on changing the input value in search input
  onChangeSearchInput = (event) => {
    this.setState({ searchUserInput: event.target.value });
  };

  render() {
    const { searchUserInput } = this.state;
// To Search results by name, email or role
    return (
      <div className="admin-ul-bg-container">
        <div className="search-bar">
          <input
            type="search"
            className="search"
            placeholder="Search by name,email or role"
            onChange={this.onChangeSearchInput}
          />
        </div>
      {/* Passing searchUserInputValue as props to Userstable */}
        <div className="users-data-container">
        <UsersTable searchUserInputValue={searchUserInput}/>
        </div>
      </div>
    );
  }
}

export default UsersSearch;
