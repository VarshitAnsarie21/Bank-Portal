import React, { Component } from "react";
import { Col, Typography, Input } from "antd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Withdraw.css";

class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      amount: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //   componentDidMount = () => {
  //     let data = {
  //       email: this.state.email,
  //     };
  //     fetch("http://localhost:61476/api/customer/Get_Details", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }).then((resp) => {
  //       if (resp.status === 200) {
  //         resp.json().then((result) => {
  //           console.warn("result", result);
  //           this.setState({
  //             full_name: result.UserDetails[0].full_name,
  //             acc_no: result.UserDetails[0].acc_no,
  //             phone_no: result.UserDetails[0].phone_no,
  //             address: result.UserDetails[0].address,
  //             card_number: result.UserDetails[0].card_number,
  //           });
  //         });
  //       } else if (resp.status >= 400 && resp.status < 500) {
  //         alert("Status code " + resp.status + "!Bad Request");
  //       } else if (resp.status >= 500 && resp.status < 600) {
  //         alert("Status code " + resp.status + "!Internal Server Error");
  //       }
  //     });
  //   };

  render() {
    const { amount } = this.state;
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
                // onClick={this.customerLoginHandler}
              >
                Withdraw
              </button>
            </CardContent>
          </Card>
        </Col>
      </div>
    );
  }
}

export default Withdraw;
