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
  }

  componentDidMount = () =>{
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
  }

  render() {
    return (
      <div className="after-admin-login-page">
        <div>
          <Table className="mt-4" striped bordered hover size="sm">
            <thead>
              <tr>
                <th colSpan={4}>Account No.</th>
                <th colSpan={3}>Full Name</th>
                <th colSpan={3}>Email Id</th>
                <th colSpan={3}>Occupation</th>
                <th colSpan={3}>Contact No.</th>
                <th colSpan={3}>Permanent Address</th>
                <th colSpan={3}>Options</th>
              </tr>
            </thead>
          </Table>
        </div>
      </div>
    );
  }
}

export default AfterAdminLoginPage;
