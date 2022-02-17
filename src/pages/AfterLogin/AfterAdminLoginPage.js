import React, { Component } from "react";
import { Input } from "antd";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import "./AfterAdminLoginPage.css";
// import { Table } from "react-bootstrap";
// import { button, ButtonToolbar } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class AfterAdminLoginPage extends Component {
  constructor(props) {
    super(props);
    const token = sessionStorage.getItem("loggedUser");
    this.state = {
      userDetails: [],
      user: token,
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount = () => {
    fetch("http://localhost:61476/admin/allcustomer", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.status === 200) {
        resp.json().then((result) => {
          console.warn("result", result);
          this.setState({ userDetails: result });
        });
      } else if (resp.status >= 400 && resp.status < 500) {
        alert("Status code " + resp.status + "!Bad Request");
      } else if (resp.status >= 500 && resp.status < 600) {
        alert("Status code " + resp.status + "!Internal Server Error");
      }
    });
  };

  render() {
    const { userDetails } = this.state;
    if (this.state.user === null) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="after-admin-login-page">
          <div>
            {userDetails.map(
              ({
                acc_no,
                full_name,
                email,
                occupation,
                phone_no,
                address,
                index,
              }) => (
                <div>
                  <div className="user-details--tile-div">
                    <span>Account Number</span>
                    <span>Full Name</span>
                    <span>Email ID</span>
                    <span>Occupation</span>
                    <span>Phone Number</span>
                    <span>Address</span>
                  </div>
                  <div
                    key={index}
                    style={{ display: "flex" }}
                    className="user-details-div"
                  >
                    <Input
                      className="after-admin-login-input"
                      name="acc_no"
                      value={acc_no}
                      onChange={this.changeHandler}
                    />
                    <Input
                      className="after-admin-login-input"
                      name="full_name"
                      value={full_name}
                      onChange={this.changeHandler}
                    />
                    <Input
                      className="after-admin-login-input"
                      name="email"
                      value={email}
                      onChange={this.changeHandler}
                    />
                    <Input
                      className="after-admin-login-input"
                      name="occupation"
                      value={occupation}
                      onChange={this.changeHandler}
                    />
                    <Input
                      className="after-admin-login-input"
                      name="phone_no"
                      value={phone_no}
                      onChange={this.changeHandler}
                    />
                    <Input
                      className="after-admin-login-input"
                      name="address"
                      value={address}
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                //   <Table className="mt-4" striped bordered hover size="sm">
                //   <thead>
                //     <tr key={index}>
                //       <th colSpan={4} >{acc_no}</th>
                //       <th colSpan={3}>{full_name}</th>
                //       <th colSpan={3}>{email}</th>
                //       <th colSpan={3}>{occupation}</th>
                //       <th colSpan={3}>{phone_no}</th>
                //       <th colSpan={3}>{address}</th>
                //     </tr>
                //   </thead>
                // </Table>
              )
            )}
          </div>
        </div>
      );
    }
  }
}

export default AfterAdminLoginPage;
