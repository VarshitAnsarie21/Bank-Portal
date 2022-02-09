import React, { Component } from "react";
import "./RegistrationForm.css";
import {Row, Col, Input, Button, Typography} from 'antd'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const { Text } = Typography;

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      custName: "",
      accNumb: "",
      email: "",
      phoneNumb: "",
      password: "",
      date: "",
      address: "",
      cardNumb: "",
      occupation: "",
      gender: "",
      country: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  firsthandler = (event) => {
    this.setState({
      custName: event.target.value,
    });
  };
  lasthandler = (event) => {
    this.setState({
      accNumb: event.target.value,
    });
  };
  emailhandler = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  passwordhandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  phonehandler = (event) => {
    this.setState({
      phoneNumb: event.target.value,
    });
  };

  genderhandler = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };
  dobhandler = (event) => {
    this.setState({
      date: event.target.value,
    });
  };
  addresshandler = (event) => {
    this.setState({
      address: event.target.value,
    });
  };
  cardhandler = (event) => {
    this.setState({
      cardNumb: event.target.value,
    });
  };
  occuphandler = (event) => {
    this.setState({
      occupation: event.target.value,
    });
  };
  countryhandler = (event) => {
    this.setState({
      country: event.target.value,
    });
  };

  handleSubmit = (event) => {
    alert(
      `${this.state.custName} ${this.state.accNumb}  Registered Successfully !!!!`
    );
    console.log(this.state);
    this.setState({
      custName: "",
      accNumb: "",
      email: "",
      password: "",
      phoneNumb: "",
      gender: "",
      date: "",
      occupation: "",
      country: "",
    });
    event.preventDefault();
  };

  render() {
    return (
      <div className="registration-form-container">
        <Col>
        <Row justify='center' align='middle'>
        <Card className="registration-form-card">
        <div className="title">Registration</div>
        <div className="content">
          <form onSubmit={this.handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input
                  type="text"
                  value={this.state.custName}
                  onChange={this.firsthandler}
                  placeholder="FirstName..."
                />
                <br />
              </div>
              <div className="input-box">
                <span className="details">Account Number</span>
                <input
                  type="text"
                  value={this.state.accNumb}
                  onChange={this.lasthandler}
                  placeholder="AccountNumber..."
                />
                <br />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  value={this.state.email}
                  onChange={this.emailhandler}
                  placeholder="Email Address.."
                />
                <br />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  value={this.state.phoneNumb}
                  onChange={this.phonehandler}
                  placeholder="Phone Number..."
                />
                <br />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.passwordhandler}
                  placeholder="Password..."
                />
                <br />
              </div>
              <div className="input-box">
                <span className="details">DOB</span>
                <input
                  type="date"
                  value={this.state.date}
                  onChange={this.dobhandler}
                  placeholder="DOB..."
                />
                <br />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input
                  type="text"
                  value={this.state.address}
                  onChange={this.addresshandler}
                  placeholder="Address..."
                />
                <br />
              </div>
              <div className="input-box">
                <span className="details">Card Number</span>
                <input
                  type="text"
                  value={this.state.cardNumb}
                  onChange={this.cardhandler}
                  placeholder="CardNumber..."
                />
                <br />
              </div>
              <div className="input-box">
                <span className="details">Occupation</span>
                <input
                  type="text"
                  value={this.state.occupation}
                  onChange={this.occuphandler}
                  placeholder="Occupation..."
                />
                <br />
              </div>
              <div className="input-box">
                <span className="details">Gender</span>
                <select
                  onChange={this.genderhandler}
                  defaultValue="Select Gender"
                >
                  <option defaultValue>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <br />
              </div>
            </div>

            <div className="button">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
        </Card>
        </Row>
        </Col>
      </div>
    );
  }
}

export default RegistrationForm;
