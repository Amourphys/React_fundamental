import React from 'react';
import './styles/App.css';
import Navbar from './components/UI/navbar/Navbar';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;
