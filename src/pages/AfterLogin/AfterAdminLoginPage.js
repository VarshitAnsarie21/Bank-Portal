import React, { Component } from "react";
import { Col, Typography, Input } from "antd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./AfterAdminLoginPage.css";
import { Table } from "react-bootstrap";
import { button, ButtonToolbar } from "react-bootstrap";

class AfterAdminLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acc_no: "",
      full_name: "",
      phone_no: "",
      occupation: "",
      email: "",
      address: "",
      userDetails: []
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:61476/admin/allcustomer", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.status === 200) {
        resp.json().then((result) => {
          console.warn("result", result);
          this.setState({userDetails: result})
          let i;
          for (i = 0; i < result.length; i++) {
            this.setState({
              full_name: result[i].full_name,
              acc_no: result[i].acc_no,
              phone_no: result[i].phone_no,
              address: result[i].address,
              occupation: result[i].occupation,
              email: result[i].email,
            });
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
    const { full_name, acc_no, email, phone_no, address, occupation, userDetails } = this.state;
    return (
      <div className="after-admin-login-page">
        <div>
          {userDetails.map(({acc_no,full_name,email,occupation,phone_no,address, index}) => (
              <Table className="mt-4" striped bordered hover size="sm">
              <thead>
                <tr key={index}>
                  <th colSpan={4} >{acc_no}</th>
                  <th colSpan={3}>{full_name}</th>
                  <th colSpan={3}>{email}</th>
                  <th colSpan={3}>{occupation}</th>
                  <th colSpan={3}>{phone_no}</th>
                  <th colSpan={3}>{address}</th>
                  {/* <th colSpan={3}>Options</th> */}
                </tr>
              </thead>
            </Table>
          ))}
          {/* <Table className="mt-4" striped bordered hover size="sm">
            <thead>
              <tr>
                <th colSpan={4}>{acc_no}</th>
                <th colSpan={3}>{full_name}</th>
                <th colSpan={3}>{email}</th>
                <th colSpan={3}>{occupation}</th>
                <th colSpan={3}>{phone_no}</th>
                <th colSpan={3}>{address}</th>
                <th colSpan={3}>Options</th>
              </tr>
            </thead>
          </Table> */}
        </div>
      </div>
    );
  }
}

export default AfterAdminLoginPage;
