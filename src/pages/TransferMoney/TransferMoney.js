import React, { Component } from "react";
import { Col, Typography, Input } from "antd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./TransferMoney.css";
import AfterLoginHeader from "../../components/AfterLoginHeader/AfterLoginHeader";
import { Redirect } from "react-router-dom";

class TransferMoney extends Component {
  constructor(props) {
    super(props);
    const token = sessionStorage.getItem("loggedUser");
    const result = JSON.parse(sessionStorage.getItem("loggedUser"));
    this.state = {
      email: result === null ? "" : result.UserDetails.email,
      amount: "",
      email1: "",
      user: token,
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = () => {
    let data = {
      email: this.state.email,
      email1: this.state.email1,
      amount: this.state.amount,
    };
    fetch("http://localhost:61476/api/trans/transfer", {
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
            alert("Money Successfully Transferred");
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
    const { amount, email, email1 } = this.state;
    if (this.state.user === null) {
      return <Redirect to="/" />;
    } else {
      return (
        <React.Fragment>
          <AfterLoginHeader />
          <div className="transfer-money-page">
            <Col span={6} className="transfer-money-menu-col">
              <Card variant="outlined" className="transfer-money-menu-card">
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="transfer-money-menu-title"
                  >
                    Dashboard
                  </Typography>
                  <button
                    className="transfer-money-menu-button"
                    variant="primary"
                  >
                    <a href="/after-customer-login">Account Details</a>
                  </button>
                  <br />
                  <button
                    className="transfer-money-menu-button"
                    variant="primary"
                  >
                    <a href="/withdraw">Withdraw</a>
                  </button>
                  <br />
                  <button
                    className="transfer-money-menu-button"
                    variant="primary"
                  >
                    <a href="/deposit">Deposit</a>
                  </button>
                  <br />
                  <button
                    className="transfer-money-menu-button"
                    variant="primary"
                  >
                    <a href="/transfer-money">Transfer Money</a>
                  </button>
                </CardContent>
              </Card>
            </Col>
            <Col span={18} className="transfer-money-detail-col">
              <Card variant="outlined" className="transfer-money-detail-card">
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="transfer-money-title"
                  >
                    MONEY TRANSFER
                  </Typography>
                  <span>FROM:</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input
                    className="transfer-money-detail-input"
                    value={email}
                    name="email"
                    onChange={this.changeHandler}
                  />
                  <br />
                  <span>TO:</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input
                    className="transfer-money-detail-input"
                    value={email1}
                    name="email1"
                    onChange={this.changeHandler}
                  />
                  <br />
                  <span>AMOUNT:</span>&nbsp;&nbsp;&nbsp;
                  <Input
                    className="transfer-money-detail-input"
                    value={amount}
                    name="amount"
                    onChange={this.changeHandler}
                  />
                  <br />
                  <button
                    type="primary"
                    className="transfer-money-submit-button"
                    onClick={this.submitHandler}
                  >
                    TRANSFER
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

export default TransferMoney;
