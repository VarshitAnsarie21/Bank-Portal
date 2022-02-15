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
