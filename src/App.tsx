import React from 'react';
import '../styles/styles.scss';
import { Form } from '../Components';
import logo from '../assets/swedbank-logo.svg';

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <div className="LogoSection">
          <img className='swedbank-logo' src={logo} alt="Swedbank Home loan" />
        </div>
        <main className="section">
          <Form />
        </main>
      </div>
    </>
  );
}

export default App;
