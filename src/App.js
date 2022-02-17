import React from "react";
import "./App.css";
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
import Withdraw from "./pages/Withdraw/Withdraw";
import TransferMoney from "./pages/TransferMoney/TransferMoney";
import Deposit from "./pages/Deposit/Deposit";

function App() {
  return (
    <div className="App">
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
          <Route path="/withdraw" component={Withdraw} />
          <Route path="/transfer-money" component={TransferMoney} />
          <Route path="/deposit" component={Deposit} />
        </Switch>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
