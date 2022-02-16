import React, { Component } from "react";
import { Row, Col, Input, Button, Typography } from "antd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "./ResetPassword.css";
import ResetPasswordLogo from "../../images/reset-password.jpg";
import validator from "validator";

let error = "";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      newPasswordConfirmed: "",
      emailErrorMessage: "",
      newPasswordErrorMessage: "",
      newPasswordConfirmedErrorMessage: "",
      errorMessage: "",
    };
  }

  changeHandler = (e) => {
    this.setState({
      emailErrorMessage: "",
      newPasswordErrorMessage: "",
      newPasswordConfirmedErrorMessage: "",
      errorMessage: "",
    });
    this.setState({ [e.target.name]: e.target.value });
  };

  validation = () => {
    let isValid = true;
    if (
      !this.state.email &&
      !this.state.password &&
      !this.state.newPasswordConfirmed
    ) {
      isValid = false;
      error = "Fill the fields";
      this.setState({ errorMessage: error });
    } else {
      if (
        this.state.email &&
        (!validator.isEmail(this.state.email) ||
          /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/g.test(
            this.state.email
          ) ||
          this.state.email.includes("[a-z A-Z].com"))
      ) {
        isValid = false;
        error = "Invalid Email !";
        this.setState({ emailErrorMessage: error });
      }
      if (this.state.password && this.state.password.length > 25) {
        isValid = false;
        error = "Password should be upto 25 characters";
        this.setState({ newPasswordErrorMessage: error });
      }
      if (
        this.state.password ||
        (!this.state.password.match(/[A-Z]/) &&
          !this.state.password.match(/[0-9]/) &&
          !this.state.password.match(/[!@#$%^&*]/))
      ) {
        isValid = false;
        error =
          "Password should contain atleast one lowercase, one uppercase, one numeric value and one special character";
        this.setState({ newPasswordErrorMessage: error });
      }
      if (
        this.state.newPasswordConfirmed &&
        this.state.newPasswordConfirmed.length > 25
      ) {
        isValid = false;
        error = "Password should be upto 25 characters";
        this.setState({ newPasswordConfirmedErrorMessage: error });
      }
      if (
        this.state.newPasswordConfirmed ||
        (!this.state.newPasswordConfirmed.match(/[A-Z]/) &&
          !this.state.newPasswordConfirmed.match(/[0-9]/) &&
          !this.state.newPasswordConfirmed.match(/[!@#$%^&*]/))
      ) {
        isValid = false;
        error =
          "Password should contain atleast one lowercase, one uppercase, one numeric value and one special character";
        this.setState({ newPasswordConfirmedErrorMessage: error });
      }
      if (
        !this.state.email ||
        !this.state.newPassword ||
        !this.state.newPasswordConfirmed
      ) {
        isValid = false;
        error = "Fill this fields";
        this.setState({ errorMessage: error });
      } else if (
        validator.isEmail(this.state.email) &&
        this.state.newPassword &&
        this.state.newPasswordConfirmed
      ) {
        error = "";
        isValid = true;
      }
    }

    return isValid;
  };

  resetPasswordHandler = () => {
    if (this.validation()) {
      if (this.state.password === this.state.newPasswordConfirmed) {
        let data = {
          email: this.state.email,
          password: this.state.password,
        };
        fetch("http://localhost:61476/api/customer/reset_pass", {
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
              if (
                result.isSuccess === true ||
                result.message === "Password Updated Successfully"
              ) {
                alert("Password Reset Successfully");
              } else {
                alert("Invalid User !");
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
    } else {
      alert("Password Not Matched! Please check the Password");
    }
  };

  render() {
    const {
      email,
      password,
      newPasswordConfirmed,
      emailErrorMessage,
      newPasswordErrorMessage,
      newPasswordConfirmedErrorMessage,
      errorMessage,
    } = this.state;
    return (
      <div className="reset-password-page">
        <Col>
          <Row justify="center" className="reset-password-inner-container">
            <Col span={12} className="reset-password-col">
              <Card variant="outlined" className="reset-password-card">
                <CardMedia
                  component="img"
                  height="140"
                  image={ResetPasswordLogo}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="reset-password-title"
                  >
                    RESET PASSWORD
                  </Typography>
                  <Input
                    placeholder="Enter your Email ID"
                    className="reset-password-input"
                    value={email}
                    name="email"
                    onChange={this.changeHandler}
                  />
                  <br />
                  {emailErrorMessage && (
                    <div className="error-message-div">{emailErrorMessage}</div>
                  )}
                  {errorMessage && !email && (
                    <div className="error-message-div">{errorMessage}</div>
                  )}
                  <Input
                    placeholder="Enter your new PassWord"
                    className="reset-password-input"
                    value={password}
                    name="password"
                    onChange={this.changeHandler}
                  />
                  <br />
                  {newPasswordErrorMessage && (
                    <div className="error-message-div">
                      {newPasswordErrorMessage}
                    </div>
                  )}
                  {errorMessage && !password && (
                    <div className="error-message-div">{errorMessage}</div>
                  )}
                  <Input
                    placeholder="Confirm your new PassWord"
                    className="reset-password-input"
                    value={newPasswordConfirmed}
                    name="newPasswordConfirmed"
                    onChange={this.changeHandler}
                  />
                  <br />
                  {newPasswordConfirmedErrorMessage && (
                    <div className="error-message-div">
                      {newPasswordConfirmedErrorMessage}
                    </div>
                  )}
                  {errorMessage && !newPasswordConfirmed && (
                    <div className="error-message-div">{errorMessage}</div>
                  )}
                  <Button
                    type="primary"
                    className="reset-password-login-button"
                    onClick={this.resetPasswordHandler}
                  >
                    RESET
                  </Button>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}

export default ResetPassword;
