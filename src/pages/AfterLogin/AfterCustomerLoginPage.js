import React, { Component } from "react";
import { Col, Typography, Input, Button } from "antd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./AfterCustomerLoginPage.css";

class AfterCustomerLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      acc_no: "",
      email: !this.props.location.state.email
        ? ""
        : this.props.location.state.email,
      phone_no: "",
      address: "",
      card_number: "",
    };
  }

  componentDidMount = () => {
    let data = {
      email: this.state.email,
    };
    fetch("http://localhost:61476/api/customer/Get_Details", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.status === 200) {
        resp.json().then((result) => {
          console.warn("result", result);
          this.setState({
            full_name: result.UserDetails[0].full_name,
            acc_no: result.UserDetails[0].acc_no,
            phone_no: result.UserDetails[0].phone_no,
            address: result.UserDetails[0].address,
            card_number: result.UserDetails[0].card_number,
          });
        });
      } else if (resp.status >= 400 && resp.status < 500) {
        alert("Status code " + resp.status + "!Bad Request");
      } else if (resp.status >= 500 && resp.status < 600) {
        alert("Status code " + resp.status + "!Internal Server Error");
      }
    });
  };

  render() {
    const { full_name, acc_no, email, phone_no, address, card_number } =
      this.state;
    return (
      <div className="after-customer-login-page">
        <Col span={6} className="customer-detail-menu-col">
          <Card variant="outlined" className="customer-detail-menu-card">
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="after-customer-login-page-menu-title"
              >
                Dashboard
              </Typography>
              <button className="customer-detail-menu-button" variant="primary">
                <a href="/withdraw">Withdraw</a>
              </button>
              <br />
              <button className="customer-detail-menu-button" variant="primary">
                <a href="/deposit">Deposit</a>
              </button>
              <br />
              <button className="customer-detail-menu-button" variant="primary">
                <a href="/transfer-money">Transfer Money</a>
              </button>
            </CardContent>
          </Card>
        </Col>
        <Col span={18} className="customer-detail-col">
          <Card variant="outlined" className="customer-detail-card">
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="after-customer-login-page-title"
              >
                Account Details
              </Typography>
              <span>NAME:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Input
                className="customer-detail-input"
                value={full_name}
                disabled
              />
              <br />
              <span>EMAIL: </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Input className="customer-detail-input" value={email} disabled />
              <br />
              <span>PHONE: </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Input
                className="customer-detail-input"
                value={phone_no}
                disabled
              />
              <br />
              <span>ACCOUNT: </span>
              <Input
                className="customer-detail-input"
                value={acc_no}
                disabled
              />
              <br />
              <span>CARD NO.: </span>
              <Input
                className="customer-detail-input"
                value={card_number}
                disabled
              />
              <br />
              <span>ADDRESS: </span>
              <Input
                className="customer-detail-input"
                value={address}
                disabled
              />
            </CardContent>
          </Card>
        </Col>
      </div>
    );
  }
}

export default AfterCustomerLoginPage;
