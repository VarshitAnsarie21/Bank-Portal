import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import logo from "../images/cog-logo.png";
import "./Header.css";
import * as ReactBootStrap from "react-bootstrap";

const { Link, Title } = Typography;

const Header = () => {
  return (
    <>
      <Layout.Header className="page-header">
        <Row align="middle" justify="center">
          <Col span={24}>
            <img className="cog-img" src={logo} />
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
          <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
            <ReactBootStrap.Nav className="me-auto">
              <ReactBootStrap.Nav.Link href="#features">
                Home
              </ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link href="#pricing">
                Registration
              </ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link href="#pricing">
                Exchange Rate
              </ReactBootStrap.Nav.Link>
            </ReactBootStrap.Nav>
            <ReactBootStrap.Nav>
              <ReactBootStrap.Nav.Link href="#deets">
                About Us
              </ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link eventKey={2} href="#memes">
                Contact Us
              </ReactBootStrap.Nav.Link>
            </ReactBootStrap.Nav>
          </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Container>
      </ReactBootStrap.Navbar>
    </>
  );
};

export default Header;
