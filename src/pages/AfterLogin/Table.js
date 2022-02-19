import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Table extends Component {
  constructor(props) {
    super(props);
  }

  DeleteStudent = () => {
    axios
      .delete(
        "http://localhost:61476/admin/delete?id=" + this.props.obj.email
      )
      .then((json) => {
        if (json.data.Status === "Delete") {
          alert("Record deleted successfully!!");
        }
      });
  };
  render() {
    return (
      <tr>
        <td>{this.props.obj.full_name}</td>
        <td>{this.props.obj.address}</td>
        <td>{this.props.obj.phone_no}</td>
        <td>{this.props.obj.occupation}</td>
        <td>
          <Link to={"/edit/" + this.props.obj.email} className="btn btn-success">
            Edit
          </Link>
        </td>
        <td>
          <button
            type="button"
            onClick={this.DeleteStudent}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Table;
