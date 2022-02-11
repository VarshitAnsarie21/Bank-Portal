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
      newPassword: "",
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
      !this.state.newPassword &&
      !this.state.newPasswordConfirmed
    ) {
      isValid = false;
      error = "Fill the fields";
      this.setState({ errorMessage: error });
    } else {
      if (
        this.state.email &&
        (!validator.isEmail(this.state.email) ||
          /[!#$%^&*.,()?"":{}|<>]/g.test(this.state.email) ||
          this.state.email.includes("g.com"))
      ) {
        isValid = false;
        error = "Invalid Email !";
        this.setState({ emailErrorMessage: error });
      }
      if (this.state.newPassword && this.state.newPassword.length > 25) {
        isValid = false;
        error = "Password should be upto 25 characters";
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
      alert("Password Reset Successfully!");
    } else {
      alert("Incorrect Details! Fill the detail again");
    }
  };

  render() {
    const {
      email,
      newPassword,
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
                    value={newPassword}
                    name="newPassword"
                    onChange={this.changeHandler}
                  />
                  <br />
                  {newPasswordErrorMessage && (
                    <div className="error-message-div">
                      {newPasswordErrorMessage}
                    </div>
                  )}
                  {errorMessage && !newPassword && (
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
