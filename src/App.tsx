import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../styles/styles.scss';
import { Form } from '../Components';
import logo from '../assets/swedbank-logo.svg';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <div className="LogoSection">
          <Link to="/">
            <img className='swedbank-logo' src={logo} alt="Swedbank Home loan" />
          </Link>
        </div>
        <main className="section">
          <Form />
        </main>
      </div>
    </Router>
  );
}

export default App;
