import React, { Component } from "react";
import { Col, Typography, Input } from "antd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Withdraw.css";
import { Redirect } from "react-router-dom";

class Withdraw extends Component {
  constructor(props) {
    super(props);
    const token = sessionStorage.getItem("loggedUser");
    const result = JSON.parse(sessionStorage.getItem("loggedUser"));
    this.state = {
      email: result === null ? "" : result.UserDetails.email,
      amount: "",
      user: token,
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  logoutHandler = () => {
    sessionStorage.removeItem("loggedUser");
    this.props.history.push("/");
  };

  submitHandler = () => {
    let data = {
      email: this.state.email,
      amount: this.state.amount,
    };
    fetch("http://localhost:61476/api/trans/withdraw", {
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
          if (result.isSuccess === true) {
            alert("Money Successfully Withdrawn");
            this.props.history.push("/after-customer-login");
          } else {
            alert("Request Denied !");
          }
        });
      } else if (resp.status >= 400 && resp.status < 500) {
        alert("Status code " + resp.status + "!Bad Request");
      } else if (resp.status >= 500 && resp.status < 600) {
        alert("Status code " + resp.status + "!Internal Server Error");
      }
    });
  };

  render() {
    const { amount, email } = this.state;
    if (this.state.user === null) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="withdraw-page">
          <Col span={6} className="withdraw-page-menu-col">
            <Card variant="outlined" className="withdraw-page-menu-card">
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="withdraw-page-menu-title"
                >
                  Dashboard
                </Typography>
                <button className="withdraw-page-menu-button" variant="primary">
                  <a href="/after-customer-login">Account Details</a>
                </button>
                <br />
                <button className="withdraw-page-menu-button" variant="primary">
                  <a href="/withdraw">Withdraw</a>
                </button>
                <br />
                <button className="withdraw-page-menu-button" variant="primary">
                  <a href="/deposit">Deposit</a>
                </button>
                <br />
                <button className="withdraw-page-menu-button" variant="primary">
                  <a href="/transfer-money">Transfer Money</a>
                </button>
              </CardContent>
            </Card>
          </Col>
          <Col span={18} className="withdraw-page-detail-col">
            <Card variant="outlined" className="withdraw-page-card">
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="withdraw-page-title"
                >
                  WITHDRAW MONEY
                </Typography>
                <span>Enter Amount:</span>&nbsp;
                <Input
                  className="withdraw-page-input"
                  value={amount}
                  name="amount"
                  onChange={this.changeHandler}
                />
                <br />
                <button
                  type="primary"
                  className="withdraw-page-submit-button"
                  onClick={this.submitHandler}
                >
                  Withdraw
                </button>
              </CardContent>
            </Card>
            <span className="email-display">{email}</span>
            <button
              type="primary"
              className="logout-button"
              onClick={this.logoutHandler}
            >
              LOGOUT
            </button>
          </Col>
        </div>
      );
    }
  }
}

export default Withdraw;
