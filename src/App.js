import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home'
import ContactUs from './pages/ContactUs/ContactUs';
import Footer from './components/Footer/Footer';
import RegistrationForm from './pages/RegistrationForm/RegistrationForm';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Home></Home>
      {/* <ContactUs></ContactUs> */}
      {/* <RegistrationForm></RegistrationForm> */}
      <Footer></Footer>
    </div>
  );
}

export default App;
