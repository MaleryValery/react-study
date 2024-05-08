import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
import Product from '../pages/Product';
import Pricing from '../pages/Pricing';
import AppLayout from '../pages/AppLayout';

import CityList from './CityList';
import CountryList from './CountryList';
import City from './City';
import Form from './Form';
import CitiesProvider from '../contexts/CitiesProvider';
import AuthProvider from '../contexts/AuthProvider';
import ProtectedRoute from '../pages/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route
              path="app"
              element={
                <ProtectedRoute redirectPath="/login" element={<AppLayout />} />
              }
            >
              <Route index element={<p>list countries</p>} />
              <Route path="countries" element={<CountryList />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
