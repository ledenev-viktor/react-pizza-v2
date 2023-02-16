import './scss/app.scss';
import React from 'react';
import { Header } from './components/header';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import { CartPage } from './pages/Cart';

function App() {
  return (
    <div className="wrapper">
        <div className="content">
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route path="123" element={<h1>123</h1>} />
              <Route path="cart" element={<CartPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
    </div>
  );
}

export default App;
