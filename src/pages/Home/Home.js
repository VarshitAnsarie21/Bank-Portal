import React, { Component } from "react";
import { Row, Col, Input, Button, Typography } from "antd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "./Home.css";
import Admin from "../../images/admin-logo.jpg";
import Customer from "../../images/customer-logo.png";
import "react-alice-carousel/lib/react-alice-carousel";
import banner1 from "../../images/banner1.jpg";
import banner2 from "../../images/banner2.jpeg";
import banner3 from "../../images/banner3.jpeg";
import banner4 from "../../images/banner4.jpeg";
import banner5 from "../../images/banner5.jpeg";
import Carousel from "react-bootstrap/Carousel";
import validator from "validator";
import { withRouter } from "react-router-dom";

const { Text } = Typography;

let error = "";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      adminEmail: "",
      adminPassword: "",
      email: "",
      password: "",
      adminEmailErrorMessage: "",
      adminPasswordErrorMessage: "",
      CustomerEmailErrorMessage: "",
      customerPasswordErrorMessage: "",
      adminCardErrorMessage: "",
      customerCardErrorMessage: "",
    };
    this.adminLoginHandler = this.adminLoginHandler.bind(this);
    this.customerLoginHandler = this.customerLoginHandler.bind(this);
  }

  handleSelect = (selectedIndex) => {
    this.setState({ index: selectedIndex });
  };

  changeHandler = (e) => {
    this.setState({
      adminCardErrorMessage: "",
      customerCardErrorMessage: "",
      adminEmailErrorMessage: "",
      adminPasswordErrorMessage: "",
      CustomerEmailErrorMessage: "",
      customerPasswordErrorMessage: "",
    });
    this.setState({ [e.target.name]: e.target.value });
  };

  customerValidation = () => {
    let isValid = true;
    if (!this.state.email && !this.state.password) {
      isValid = false;
      error = "Fill the fields";
      this.setState({ customerCardErrorMessage: error });
    } else {
      if (
        this.state.email &&
        (/[!#$%^&*,()?"":{}|<>]/g.test(this.state.email) ||
          this.state.email.includes("g.com"))
      ) {
        isValid = false;
        error = "Invalid Email !";
        this.setState({ CustomerEmailErrorMessage: error });
      }
      if (this.state.password && this.state.password.length > 25) {
        isValid = false;
        error = "Password should be upto 25 characters";
        this.setState({ customerPasswordErrorMessage: error });
      }
      if (!this.state.email || !this.state.password) {
        isValid = false;
        error = "Fill this fields";
        this.setState({ customerCardErrorMessage: error });
      } else if (validator.isEmail(this.state.email) && this.state.password) {
        error = "";
        isValid = true;
      }
    }

    return isValid;
  };

  adminValidation = () => {
    let isValid = true;
    if (!this.state.adminEmail && !this.state.adminPassword) {
      isValid = false;
      error = "Fill the fields";
      this.setState({ adminCardErrorMessage: error });
    } else {
      if (
        this.state.adminEmail &&
        (!validator.isEmail(this.state.adminEmail) ||
          /[!#$%^&*.,()?"":{}|<>]/g.test(this.state.adminEmail) ||
          this.state.adminEmail.includes("g.com"))
      ) {
        isValid = false;
        error = "Invalid Email !";
        this.setState({ adminEmailErrorMessage: error });
      }
      if (this.state.adminPassword && this.state.adminPassword.length > 25) {
        isValid = false;
        error = "Password should be upto 25 characters";
        this.setState({ adminPasswordErrorMessage: error });
      }
      if (!this.state.adminEmail || !this.state.adminPassword) {
        isValid = false;
        error = "Fill this fields";
        this.setState({ adminCardErrorMessage: error });
      } else if (
        validator.isEmail(this.state.adminEmail) &&
        this.state.adminPassword
      ) {
        error = "";
        isValid = true;
      }
    }

    return isValid;
  };

  customerLoginHandler = () => {
    if (this.customerValidation()) {
      let data = {
        email: this.state.email,
        password: this.state.password,
      };
      fetch("http://localhost:61476/api/customer/login", {
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
            if((result.isSuccess === true) || (result.message === "User Login successfully")){
              this.props.history.push({pathname: "/after-customer-login", state: data})
            }else{
              alert("Invalid User !")
            }   
          });
        } else if (resp.status >= 400 && resp.status < 500) {
          alert("Status code " + resp.status + "!Bad Request");
        } else if (resp.status >= 500 && resp.status < 600) {
          alert("Status code " + resp.status + "!Internal Server Error");
        }
      });
    } else {
      console.log(error);
    }
  };

  adminLoginHandler = () => {
    if (this.adminValidation()) {
      let data = {
        full_name: this.state.full_name,
        acc_no: this.state.acc_no,
        email: this.state.email,
        password: this.state.password,
        phone_no: this.state.phone_no,
        dob: this.state.dob,
        address: this.state.address,
        occupation: this.state.occupation,
        card_number: this.state.card_number,
        gender: this.state.gender,
      };
      fetch("http://localhost:61476/api/customer/InsertCustomer", {
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
            this.props.history.push({pathname: "/after-admin-login"})
          });
        } else if (resp.status >= 400 && resp.status < 500) {
          alert("Status code " + resp.status + "!Bad Request");
        } else if (resp.status >= 500 && resp.status < 600) {
          alert("Status code " + resp.status + "!Internal Server Error");
        }
      });
    } else {
      console.log(error);
    }
  };

  render() {
    const {
      index,
      adminEmail,
      adminPassword,
      email,
      password,
      adminEmailErrorMessage,
      adminPasswordErrorMessage,
      CustomerEmailErrorMessage,
      customerPasswordErrorMessage,
      adminCardErrorMessage,
      customerCardErrorMessage,
    } = this.state;
    return (
      <div className="home-page">
        <Col>
          <Row justify="center" className="home-page-inner-container">
            <Col span={12} className="admin-col">
              <Card variant="outlined" className="home-page-admin-card">
                <CardMedia
                  component="img"
                  height="140"
                  image={Admin}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="home-page-title"
                  >
                    Admin Login
                  </Typography>
                  <Input
                    placeholder="Enter your Email ID"
                    className="home-page-input"
                    name="adminEmail"
                    value={adminEmail}
                    onChange={this.changeHandler}
                  />
                  <br />
                  {adminEmailErrorMessage && (
                    <div className="error-message-admin-div">
                      {adminEmailErrorMessage}
                    </div>
                  )}
                  {adminCardErrorMessage && !adminEmail && (
                    <div className="error-message-admin-div">
                      {adminCardErrorMessage}
                    </div>
                  )}
                  <Input
                    placeholder="Enter your PassWord"
                    className="home-page-input"
                    value={adminPassword}
                    name="adminPassword"
                    onChange={this.changeHandler}
                    type="password"
                  />
                  <br />
                  {adminPasswordErrorMessage && (
                    <div className="error-message-admin-div">
                      {adminPasswordErrorMessage}
                    </div>
                  )}
                  {adminCardErrorMessage && !adminPassword && (
                    <div className="error-message-admin-div">
                      {adminCardErrorMessage}
                    </div>
                  )}
                  <Button
                    type="primary"
                    className="home-page-login-button"
                    onClick={this.adminLoginHandler}
                  >
                    Login
                  </Button>
                  <br />
                  <hr />
                  <Text className="home-page-text">
                    Reset Your PassWord!
                  </Text>{" "}
                  <a className="home-page-hyperlink" href="/reset-password">
                    Here
                  </a>
                </CardContent>
              </Card>
            </Col>
            <Col span={12} className="customer-col">
              <Card variant="outlined" className="home-page-customer-card">
                <CardMedia
                  component="img"
                  height="140"
                  image={Customer}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="home-page-title"
                  >
                    Customer Login
                  </Typography>
                  <Input
                    placeholder="Enter your Email ID"
                    className="home-page-input"
                    value={email}
                    name="email"
                    onChange={this.changeHandler}
                  />
                  <br />
                  {CustomerEmailErrorMessage && (
                    <div className="error-message-customer-div">
                      {CustomerEmailErrorMessage}
                    </div>
                  )}
                  {customerCardErrorMessage && !email && (
                    <div className="error-message-customer-div">
                      {customerCardErrorMessage}
                    </div>
                  )}
                  <Input
                    placeholder="Enter your PassWord"
                    className="home-page-input"
                    value={password}
                    name="password"
                    onChange={this.changeHandler}
                    type="password"
                  />
                  <br />
                  {customerPasswordErrorMessage && (
                    <div className="error-message-customer-div">
                      {customerPasswordErrorMessage}
                    </div>
                  )}
                  {customerCardErrorMessage && !password && (
                    <div className="error-message-customer-div">
                      {customerCardErrorMessage}
                    </div>
                  )}
                  <Button
                    type="primary"
                    className="home-page-login-button"
                    onClick={this.customerLoginHandler}
                  >
                    Login
                  </Button>
                  <br />
                  <Text className="home-page-text">
                    Not a Registered Customer?
                  </Text>{" "}
                  <a className="home-page-hyperlink" href="/registration">
                    Sign Up
                  </a>
                  <hr />
                  <Text className="home-page-text">
                    Reset Your PassWord!
                  </Text>{" "}
                  <a className="home-page-hyperlink" href="/reset-password">
                    Here
                  </a>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </Col>
        <Row>
          <Carousel
            className="home-carousel"
            activeIndex={index}
            onSelect={this.handleSelect}
          >
            <Carousel.Item>
              <img className="banner1" src={banner1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="banner2" src={banner2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="banner3" src={banner3} alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="banner4" src={banner4} alt="Fourth slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="banner5" src={banner5} alt="Fifth slide" />
            </Carousel.Item>
          </Carousel>
        </Row>
      </div>
    );
  }
}

export default withRouter(Home);
