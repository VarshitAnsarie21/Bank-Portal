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
      full_name: "",
      acc_no: "",
      phone_no: "",
      occupation: "",
      address: "",
      email: "",
      isEdit: false,
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

  editHandler = (index) => {
    var userDetails = [...this.state.userDetails];
    this.setState({
      full_name: userDetails[0].full_name,
      acc_no: userDetails[0].acc_no,
      email: userDetails[0].email,
      phone_no: userDetails[0].phone_no,
      occupation: userDetails[0].occupation,
      address: userDetails[0].address,
      isEdit: true,
    });
  };

  deleteHandler = (index) => {
    var userDetails = [...this.state.userDetails];
    userDetails.splice(index, 1);
    this.setState({ userDetails });

    this.componentDidMount();
  };

  logoutHandler = () => {
    sessionStorage.removeItem("loggedUser");
    this.props.history.push("/");
  };

  submitDetailsHandler = () => {
    let data = {
      full_name: this.state.full_name,
      acc_no: this.state.acc_no,
      email: this.state.email,
      phone_no: this.state.phone_no,
      occupation: this.state.occupation,
      address: this.state.address,
    };
    fetch("http://localhost:61476/admin/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
    const {
      userDetails,
      full_name,
      acc_no,
      email,
      phone_no,
      occupation,
      address,
      isEdit,
    } = this.state;
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
                    <button
                      type="primary"
                      className="edit-button"
                      onClick={this.editHandler.bind(this, index)}
                    >
                      Edit
                    </button>
                  </div>
                )
              )}
            </div>
            <hr />
            {isEdit && (
              <div>
                <div>
                  <div className="user-details-title-div">
                    <span>Account Number</span>
                    <span>Full Name</span>
                    <span>Email ID</span>
                    <span>Occupation</span>
                    <span>Phone Number</span>
                    <span>Address</span>
                  </div>
                </div>
                <div style={{ display: "flex" }} className="user-details-div">
                  <Input
                    className="after-admin-login-input"
                    name="acc_no"
                    value={acc_no}
                    onChange={this.changeHandler}
                    disabled
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
                    disabled
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
                <button
                  type="primary"
                  className="submit-details-button"
                  onClick={this.submitDetailsHandler}
                >
                  Submit Details
                </button>
              </div>
            )}
          </div>
        </React.Fragment>
      );
    }
  }
}

export default AfterAdminLoginPage;
