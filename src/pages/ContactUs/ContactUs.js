import React, { Component } from "react";
import { Row, Col, Button, Typography } from "antd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Marquee from "react-fast-marquee";
import "./ContactUs.css";
import Header from "../../components/Header/Header";
import Select from "react-select";

const { Text, Title } = Typography;

const complaintsOption = [
  { value: "digitalPayment", label: "Digital Payment" },
  { value: "aboutWithdraw", label: "About Withdraw" },
  { value: "aboutDeposit", label: "About Deposit" },
  { value: "aboutExchangeRate", label: "About Exchange Rate" },
  { value: "aboutMyAccount", label: "About MyAccount" },
];

let error = "";

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaint: "",
      feedback: "",
      complaintErrorMessage: "",
      feedbackErrorMessage: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ complaintErrorMessage: "" });
    this.setState({ [e.target.name]: e.target.value });
  };

  changecomplaints = (selectedcomplaints) => {
    this.setState({ complaintErrorMessage: "" });
    this.setState({ complaint: selectedcomplaints.value });
  };

  complaintValidation = () => {
    let isValid = true;

    if (!this.state.complaint) {
      isValid = false;
      error = "Required ! This Field cannot be Empty";
      this.setState({ complaintErrorMessage: error });
    } else {
      isValid = true;
      error = "";
    }

    return isValid;
  };

  feedbackValidation = () => {
    let isValid = true;

    if (!this.state.feedback) {
      isValid = false;
      this.setState({ feedbackErrorMessage: "Please Fill the Feedback Form" });
    } else if (this.state.feedback.length > 50) {
      isValid = false;
      this.setState({
        feedbackErrorMessage: "Exceed the Limit! Maximum 50 Words Allowed",
      });
    } else {
      isValid = true;
    }

    return isValid;
  };

  handleSubmitComplaint = () => {
    if (this.complaintValidation()) {
      alert("Complaint Registered Successfully !");
    } else {
      alert("Incorrect details! Fill the detail again");
    }
  };

  handleSubmitFeedback = () => {
    if (this.feedbackValidation()) {
      alert("Feedback Submitted Successfully !");
    } else if (
      !this.state.feedbackErrorMessage ||
      this.state.feedbackErrorMessage === "Please Fill the Feedback Form"
    ) {
      alert("Please Fill the Feedback Form");
    } else if (
      this.state.feedbackErrorMessage === "Exceed the Limit! Maximum 50 Words Allowed"
    ) {
      alert("Exceed the Limit! Maximum 50 Words Allowed");
    }
  };

  render() {
    const { complaint, feedback, complaintErrorMessage } = this.state;
    return (
      <React.Fragment>
        <Header></Header>
        <div className="contact-us-page">
          <center>
            <Col className="contact-us-col">
              <Marquee className="contact-us-dropdown-marquee">
                Dear customer, you may select "Check Complaint/Request" and then
                select "the complaint".
              </Marquee>
              <Row
                justify="center"
                align="middle"
                className="first-dropdown-row"
              >
                <Text className="contact-us-dropdown-label">
                  Raise Request / Complaint Types:{" "}
                </Text>
                <div className="contact-us-complaint-type-div">
                  <span className="contact-us-complaint-type-text">
                    Raise Complaint or Request
                  </span>
                </div>
              </Row>
              <Row
                justify="center"
                align="middle"
                className="second-dropdown-row"
              >
                <Text className="contact-us-dropdown-label">
                  Raise Request / Complaint:{" "}
                </Text>
                <Select
                  value={complaintsOption.find((x) => x.value === complaint)}
                  className="contact-us-complaints-dropdown"
                  options={complaintsOption}
                  onChange={this.changecomplaints}
                />
              </Row>
              {complaintErrorMessage && (
                <center>
                  <div className="error-message-div">
                    {complaintErrorMessage}
                  </div>
                </center>
              )}
              <Row>
                <Button
                  type="primary"
                  className="contact-us-page-submit-button"
                  onClick={this.handleSubmitComplaint}
                >
                  SUBMIT
                </Button>
              </Row>
            </Col>
            <hr />
            <Col className="feedback-col">
              <Marquee className="contact-us-feedback-marquee">
                Dear customer, you may share your valuable feedback below.
              </Marquee>
              <Row justify="center" className="contact-us-inner-container">
                <Col span={12} className="feedback-col">
                  <Card variant="outlined" className="contact-us-feedback-card">
                    <CardContent>
                      <Title className="contact-us-feedback-title">
                        FEEDBACK FORM
                      </Title>
                      <textarea
                        placeholder="Enter Your Valuable Feedback Here"
                        className="contact-us-textarea-input"
                        name="feedback"
                        value={feedback}
                        onChange={this.changeHandler}
                      />
                      <br />
                      <Row>
                        <Button
                          type="primary"
                          className="contact-us-page-feedback-submit-button"
                          onClick={this.handleSubmitFeedback}
                        >
                          SUBMIT FEEDBACK
                        </Button>
                      </Row>
                      <br />
                    </CardContent>
                  </Card>
                </Col>
              </Row>
            </Col>
          </center>
        </div>
      </React.Fragment>
    );
  }
}

export default ContactUs;
