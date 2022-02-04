import React from "react";
import { Row, Col, Input, Button, Typography } from "antd";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
import "./Home.css";
import Admin from "../images/admin-logo.jpg";
import Customer from "../images/customer-logo.png";

const { Text } = Typography;

const Home = () => {
  return (
    <div className="home-page">
      <Row justify="center" className="home-page-inner-container">
        <Col span={12} className="admin-col">
          <Card variant="outlined" className="home-page-admin-card">
            <CardMedia
              component="img"
              height="140"
              image={Admin}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Admin Login
              </Typography>
              <Input placeholder="Enter your Email ID" className="home-page-input"/>
              <br/>
              <Input placeholder="Enter your PassWord" className="home-page-input"/>
              <br />
              <Button type="primary" className="home-page-login-button">Login</Button>
              <br />
              <Text className="home-page-text">Not a Registered Admin?</Text>{' '}
              <a className="home-page-hyperlink">Sign Up</a>
              <hr/>
              <Text className="home-page-text">Reset Your PassWord!</Text>{' '}
              <a className="home-page-hyperlink">Here</a>
            </CardContent>
          </Card>
        </Col>
        <Col span={12} className="customer-col">
          <Card variant="outlined" className="home-page-customer-card">
            <CardMedia
              component="img"
              height="140"
              image={Customer}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Customer Login
              </Typography>
              <Input placeholder="Enter your Email ID" className="home-page-input"/>
              <br />
              <Input placeholder="Enter your PassWord" className="home-page-input"/>
              <br />
              <Button type="primary" className="home-page-login-button">Login</Button>
              <br/>
              <Text className="home-page-text">Not a Registered Customer?</Text>{' '}
              <a className="home-page-hyperlink">Sign Up</a>
              <hr/>
              <Text className="home-page-text">Reset Your PassWord!</Text>{' '}
              <a className="home-page-hyperlink">Here</a>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
