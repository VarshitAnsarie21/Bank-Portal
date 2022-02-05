import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home'
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Home></Home>
      <Footer></Footer>
    </div>
  );
}

export default App;
