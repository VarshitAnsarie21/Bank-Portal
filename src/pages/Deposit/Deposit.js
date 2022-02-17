import React, { Component } from "react";
import { Col, Typography, Input } from "antd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Deposit.css";
import AfterLoginHeader from "../../components/AfterLoginHeader/AfterLoginHeader";
import { Redirect } from "react-router-dom";

class Deposit extends Component {
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

  submitHandler = () => {
    let data = {
      email: this.state.email,
      amount: this.state.amount,
    };
    fetch("http://localhost:61476/api/trans/Deposit", {
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
    const { amount } = this.state;
    if (this.state.user === null) {
      return <Redirect to="/" />;
    } else {
      return (
        <React.Fragment>
          <AfterLoginHeader />
          <div className="deposit-page">
            <Col span={6} className="deposit-page-menu-col">
              <Card variant="outlined" className="deposit-page-menu-card">
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="deposit-page-menu-title"
                  >
                    Dashboard
                  </Typography>
                  <button
                    className="deposit-page-menu-button"
                    variant="primary"
                  >
                    <a href="/after-customer-login">Account Details</a>
                  </button>
                  <br />
                  <button
                    className="deposit-page-menu-button"
                    variant="primary"
                  >
                    <a href="/withdraw">Withdraw</a>
                  </button>
                  <br />
                  <button
                    className="deposit-page-menu-button"
                    variant="primary"
                  >
                    <a href="/deposit">Deposit</a>
                  </button>
                  <br />
                  <button
                    className="deposit-page-menu-button"
                    variant="primary"
                  >
                    <a href="/transfer-money">Transfer Money</a>
                  </button>
                </CardContent>
              </Card>
            </Col>
            <Col span={18} className="deposit-page-detail-col">
              <Card variant="outlined" className="deposit-page-detail-card">
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="deposit-page-title"
                  >
                    DEPOSIT MONEY
                  </Typography>
                  <span>Enter Amount:</span>&nbsp;
                  <Input
                    className="deposit-page-detail-input"
                    value={amount}
                    name="amount"
                    onChange={this.changeHandler}
                  />
                  <br />
                  <button
                    type="primary"
                    className="deposit-page-submit-button"
                    onClick={this.submitHandler}
                  >
                    Deposit
                  </button>
                </CardContent>
              </Card>
            </Col>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Deposit;
