import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import Footer from "./components/Footer/Footer";
import RegistrationForm from "./pages/RegistrationForm/RegistrationForm";
import AboutUs from "./pages/AboutUs/AboutUs";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ExchangeRate from "./pages/ExchangeRate/ExchangeRate";
import AfterCustomerLoginPage from "./pages/AfterLogin/AfterCustomerLoginPage";
import AfterAdminLoginPage from "./pages/AfterLogin/AfterAdminLoginPage";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}  />
          <Route path="/exchange-rate" component={ExchangeRate} />
          <Route path="/registration" component={RegistrationForm} />
          <Route path="/after-customer-login" component={AfterCustomerLoginPage} />
          <Route path="/after-admin-login" component={AfterAdminLoginPage} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contact-us" component={ContactUs} />
        </Switch>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
