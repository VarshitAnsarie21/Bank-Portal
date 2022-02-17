import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import logo from "../../images/cog-logo.png";
import "./AfterLoginHeader.css";
import * as ReactBootStrap from "react-bootstrap";

const { Title } = Typography;

const AfterLoginHeader = () => {
  return (
    <>
      <Layout.Header className="page-header">
        <Row align="middle" justify="center">
          <Col span={24}>
            <img className="cog-img" src={logo} alt="cognizant-logo" />
            <Title className="title">BANK PORTAL</Title>
          </Col>
        </Row>
      </Layout.Header>
      <ReactBootStrap.Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <ReactBootStrap.Container>
          <ReactBootStrap.Navbar.Brand href="#home">
            Bank Services
          </ReactBootStrap.Navbar.Brand>
          <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </ReactBootStrap.Container>
      </ReactBootStrap.Navbar>
    </>
  );
};

export default AfterLoginHeader;
