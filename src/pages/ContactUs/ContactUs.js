import React from "react";
import { Row, Col, Button, Typography } from "antd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Marquee from "react-fast-marquee";
import "./ContactUs.css";

const { Text, Title } = Typography;

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <center>
        <Col className="contact-us-col">
          <Marquee className="contact-us-dropdown-marquee">
            Dear customer, you may select "Check Complaint/Request" and then
            select "the complaint".
          </Marquee>
          <Row justify="center" align="middle" className="first-dropdown-row">
            <Text className="contact-us-dropdown-label">
              Raise Request / Complaint Types:{" "}
            </Text>
            <select
              // onChange={this.changeHandler}
              // name="gender"
              // value={gender}
              className="first-dropdown"
            >
              <option defaultValue className="option">
                -Select-
              </option>
              <option value="raiseComplaint">Raise Complaint or Request</option>
            </select>
          </Row>
          <Row justify="center" align="middle" className="second-dropdown-row">
            <Text className="contact-us-dropdown-label">
              Raise Request / Complaint:{" "}
            </Text>
            <select
              // onChange={this.changeHandler}
              // name="gender"
              // value={gender}
              className="second-dropdown"
            >
              <option defaultValue>-Select-</option>
              <option value="raiseComplaint" className="option">
                Digital Payment
              </option>
              <option value="raiseComplaint" className="option">
                About Withdraw
              </option>
              <option value="raiseComplaint" className="option">
                About Deposit
              </option>
              <option value="raiseComplaint" className="option">
                About Exchange Rate
              </option>
              <option value="raiseComplaint" className="option">
                About MyAccount
              </option>
            </select>
          </Row>
          <Row>
            <Button type="primary" className="contact-us-page-submit-button">
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
                  />
                  <br />
                  <Row>
                    <Button
                      type="primary"
                      className="contact-us-page-feedback-submit-button"
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
        {/* <Row>
        <Card className="contact-us-card">
          <Row>
            <Select placeholder="Select Complaint Type">
              <Option value="CT">Raise Complaint or Request</Option>
            </Select>
          </Row>
        </Card>
      </Row> */}
      </center>
    </div>
  );
};

export default ContactUs;
