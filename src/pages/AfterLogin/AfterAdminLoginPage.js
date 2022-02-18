import React, { Component } from "react";
import { Input } from "antd";
import "./AfterAdminLoginPage.css";
import AfterLoginHeader from "../../components/AfterLoginHeader/AfterLoginHeader";
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

  deleteHandler = (index) => {
    var userDetails = [...this.state.userDetails];
    userDetails.splice(index, 1);
    this.setState({ userDetails });
  };

  logoutHandler = () => {
    sessionStorage.removeItem("loggedUser");
    this.props.history.push("/");
  };

  render() {
    const { userDetails } = this.state;
    if (this.state.user === null) {
      return <Redirect to="/" />;
    } else {
      return (
        <React.Fragment>
          <AfterLoginHeader />
          <div className="after-admin-login-page">
            <button
              type="primary"
              className="logout-button"
              onClick={this.logoutHandler}
            >
              LOGOUT
            </button>
            <h1 className="after-admin-page-title">ADMIN DASHBOARD</h1>
            <hr />
            <div>
              <div className="user-details--tile-div">
                <span>Account Number</span>
                <span>Full Name</span>
                <span>Email ID</span>
                <span>Occupation</span>
                <span>Phone Number</span>
                <span>Address</span>
              </div>
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
                    <button
                      type="primary"
                      className="delete-button"
                      onClick={this.deleteHandler.bind(this, index)}
                    >
                      Delete
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default AfterAdminLoginPage;
