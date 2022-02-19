import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import Card from "@mui/material/Card";
import validator from "validator";
import Select from "react-select";
import Header from "../../components/Header/Header"
import "./RegistrationForm.css";

let error = "";

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      acc_no: "",
      email: "",
      phone_no: "",
      password: "",
      dob: "",
      address: "",
      card_number: "",
      occupation: "",
      gender: "",
      balance:"",
      errorMessage: "",
      emailErrorMessage: "",
      nameErrorMessage: "",
      phoneErrorMessage: "",
      passwordErrorMessage: "",
      accNumberErrorMessage: "",
      cardNumberErrorMessage: "",
      dateErrorMessage: "",
      addressErrorMessage: "",
      occupationErrorMessage: "",
      genderErrorMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler = (e) => {
    this.setState({
      errorMessage: "",
      emailErrorMessage: "",
      nameErrorMessage: "",
      phoneErrorMessage: "",
      passwordErrorMessage: "",
      accNumberErrorMessage: "",
      cardNumberErrorMessage: "",
      dateErrorMessage: "",
      addressErrorMessage: "",
      occupationErrorMessage: "",
      genderErrorMessage: "",
    });
    this.setState({ [e.target.name]: e.target.value });
  };

  changeGender = (selectedGender) => {
    this.setState({ gender: selectedGender.value });
    console.log(this.state.gender);
  };

  validation = () => {
    let isValid = true;
    if (
      !this.state.full_name &&
      !this.state.acc_no &&
      !this.state.email &&
      !this.state.phone_no &&
      !this.state.password &&
      !this.state.dob &&
      !this.state.address &&
      !this.state.card_number &&
      !this.state.occupation &&
      !this.state.gender&&
      !this.state.balance
    ) {
      isValid = false;
      error = "Fill the fields";
      this.setState({ errorMessage: error });
    } else {
      if (
        this.state.email &&
        (!validator.isEmail(this.state.email) ||
          /[!#$%^&*,()?"":{}|<>]/g.test(this.state.email) ||
          this.state.email.includes("[a-z A-Z].com"))
      ) {
        isValid = false;
        error = "Invalid Email !";
        this.setState({ emailErrorMessage: error });
      }
      if (
        this.state.phone_no &&
        (/[!@#$%^&*.,()?"":{}|<>]/g.test(this.state.phone_no) ||
          /^[A-Z a-z]/.test(this.state.phone_no))
      ) {
        isValid = false;
        error = "Invalid Phone Number! Enter only Numbers";
        this.setState({ phoneErrorMessage: error });
      }
      if (
        this.state.password &&
        (!this.state.password.match(/[A-Z]/) ||
          !this.state.password.match(/[a-z]/) ||
          !this.state.password.match(/[0-9]/) ||
          !this.state.password.match(/[!@#$%^&*]/))
      ) {
        isValid = false;
        error =
          "Password should contain atleast one lowercase, one uppercase, one numeric value and one special character";
        this.setState({ passwordErrorMessage: error });
      }
      if (this.state.password && this.state.password.length > 25) {
        isValid = false;
        error = "Password should be upto 25 characters";
        this.setState({ passwordErrorMessage: error });
      }
      if (
        this.state.phone_no &&
        /^[0-9]/.test(this.state.phone_no) &&
        (this.state.phone_no.length > 10 ||
          this.state.phone_no.length < 10 ||
          this.state.phone_no.charAt(0) === "0")
      ) {
        isValid = false;
        error = "Phone Number should be of 10 digits";
        this.setState({ phoneErrorMessage: error });
      }
      if (this.state.full_name && this.state.full_name.length > 50) {
        isValid = false;
        error = "customer name should be upto 50 characters";
        this.setState({ nameErrorMessage: error });
      }
      if (this.state.address && this.state.address.length > 50) {
        isValid = false;
        error = "address should be upto 50 characters";
        this.setState({ addressErrorMessage: error });
      }
      if (
        this.state.acc_no &&
        (this.state.acc_no.length > 18 || this.state.acc_no.length < 9)
      ) {
        isValid = false;
        error = "account number's length should be of 9 to 15 characters";
        this.setState({ accNumberErrorMessage: error });
      }
      if (
        !this.state.full_name ||
        !this.state.acc_no ||
        !this.state.email ||
        !this.state.phone_no ||
        !this.state.password ||
        !this.state.dob ||
        !this.state.address ||
        !this.state.card_number ||
        !this.state.occupation ||
        !this.state.gender ||
        !this.state.balance
      ) {
        isValid = false;
        error = "Fill this fields";
        this.setState({ errorMessage: error });
      } else if (
        this.state.full_name &&
        this.state.acc_no &&
        this.state.email &&
        validator.isEmail(this.state.email) &&
        this.state.phone_no &&
        validator.isMobilePhone(this.state.phone_no) &&
        this.state.password &&
        this.state.dob &&
        this.state.address &&
        this.state.card_number &&
        this.state.occupation &&
        this.state.gender &&
        this.state.balance
      ) {
        error = "";
        isValid = true;
      }
    }

    return isValid;
  };

  handleSubmit = (event) => {
    if (this.validation()) {
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
        balance: this.state.balance
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
            alert("Successfully Registered");
            this.props.history.push("/")
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
      full_name,
      acc_no,
      email,
      phone_no,
      password,
      dob,
      address,
      card_number,
      occupation,
      gender,
      balance,
      errorMessage,
      nameErrorMessage,
      emailErrorMessage,
      phoneErrorMessage,
      passwordErrorMessage,
      dateErrorMessage,
      accNumberErrorMessage,
      addressErrorMessage,
      occupationErrorMessage,
      genderErrorMessage,
      cardNumberErrorMessage,
    } = this.state;
    return (
      <React.Fragment>
        <Header></Header>
        <div className="registration-form-container">
          <Col>
            <Row justify="center" align="middle">
              <Card className="registration-form-card">
                <div className="title">Registration</div>
                <div className="content">
                  <form onSubmit={this.handleSubmit}>
                    <div className="user-details">
                      <div className="input-box">
                        <span className="details">Full Name</span>
                        <input
                          type="text"
                          value={full_name}
                          name="full_name"
                          onChange={this.changeHandler}
                          placeholder="CustomerFullName..."
                        />
                        <br />
                        {nameErrorMessage && (
                          <div className="error-message-div">
                            {nameErrorMessage}
                          </div>
                        )}
                        {errorMessage && !full_name && (
                          <div className="error-message-div">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                      <div className="input-box">
                        <span className="details">Account Number</span>
                        <input
                          type="text"
                          value={acc_no}
                          name="acc_no"
                          onChange={this.changeHandler}
                          placeholder="AccountNumber..."
                        />
                        <br />
                        {accNumberErrorMessage && (
                          <div className="error-message-div">
                            {accNumberErrorMessage}
                          </div>
                        )}
                        {errorMessage && !acc_no && (
                          <div className="error-message-div">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                      <div className="input-box">
                        <span className="details">Email</span>
                        <input
                          type="text"
                          value={email}
                          name="email"
                          onChange={this.changeHandler}
                          placeholder="Email Address.."
                        />
                        <br />
                        {emailErrorMessage && (
                          <div className="error-message-div">
                            {emailErrorMessage}
                          </div>
                        )}
                        {errorMessage && !email && (
                          <div className="error-message-div">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                      <div className="input-box">
                        <span className="details">Phone Number</span>
                        <input
                          type="text"
                          value={phone_no}
                          name="phone_no"
                          onChange={this.changeHandler}
                          placeholder="Phone Number..."
                        />
                        <br />
                        {phoneErrorMessage && (
                          <div className="error-message-div">
                            {phoneErrorMessage}
                          </div>
                        )}
                        {errorMessage && !phone_no && (
                          <div className="error-message-div">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                      <div className="input-box">
                        <span className="details">Password</span>
                        <input
                          type="password"
                          value={password}
                          name="password"
                          onChange={this.changeHandler}
                          placeholder="Password..."
                        />
                        <br />
                        {passwordErrorMessage && (
                          <div className="error-message-div">
                            {passwordErrorMessage}
                          </div>
                        )}
                        {errorMessage && !password && (
                          <div className="error-message-div">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                      <div className="input-box">
                        <span className="details">DOB</span>
                        <input
                          type="date"
                          value={dob}
                          name="dob"
                          onChange={this.changeHandler}
                          placeholder="DOB..."
                        />
                        <br />
                        {dateErrorMessage && (
                          <div className="error-message-div">
                            {dateErrorMessage}
                          </div>
                        )}
                        {errorMessage && !dob && (
                          <div className="error-message-div">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                      <div className="input-box">
                        <span className="details">Address</span>
                        <input
                          type="text"
                          value={address}
                          name="address"
                          onChange={this.changeHandler}
                          placeholder="Address..."
                        />
                        <br />
                        {addressErrorMessage && (
                          <div className="error-message-div">
                            {addressErrorMessage}
                          </div>
                        )}
                        {errorMessage && !address && (
                          <div className="error-message-div">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                      <div className="input-box">
                        <span className="details">Card Number</span>
                        <input
                          type="text"
                          value={card_number}
                          name="card_number"
                          onChange={this.changeHandler}
                          placeholder="CardNumber..."
                        />
                        <br />
                        {cardNumberErrorMessage && (
                          <div className="error-message-div">
                            {cardNumberErrorMessage}
                          </div>
                        )}
                        {errorMessage && !card_number && (
                          <div className="error-message-div">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                      <div className="input-box">
                        <span className="details">Occupation</span>
                        <input
                          type="text"
                          value={occupation}
                          name="occupation"
                          onChange={this.changeHandler}
                          placeholder="Occupation..."
                        />
                        <br />
                        {occupationErrorMessage && (
                          <div className="error-message-div">
                            {occupationErrorMessage}
                          </div>
                        )}
                        {errorMessage && !occupation && (
                          <div className="error-message-div">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                      <div className="input-box">
                        <span className="details">Initial Deposit</span>
                        <input
                          type="number"
                          value={balance}
                          name="balance"
                          onChange={this.changeHandler}
                          placeholder="Initial Deposit..."
                        />
                        <br />
                        {errorMessage && !balance && (
                          <div className="error-message-div">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                      <div className="input-box">
                        <span className="details">Gender</span>
                        <Select
                          value={genders.find((x) => x.value === gender)}
                          className="registration-form-dropdown"
                          options={genders}
                          onChange={this.changeGender}
                        />
                        <br />
                        {genderErrorMessage && (
                          <div className="error-message-div">
                            {genderErrorMessage}
                          </div>
                        )}
                        {errorMessage && !gender && (
                          <div className="error-message-div">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Button
                        type="primary"
                        className="registration-form-submit-button"
                        onClick={this.handleSubmit}
                      >
                        SUBMIT
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </Row>
          </Col>
        </div>
      </React.Fragment>
    );
  }
}

export default RegistrationForm;
