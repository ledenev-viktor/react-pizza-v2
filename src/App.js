import './scss/app.scss';
import React from 'react';
import { Header } from './components/header';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import { CartPage } from './pages/Cart';

export const SearchContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
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
      </SearchContext.Provider>
    </div>
  );
}

export default App;
