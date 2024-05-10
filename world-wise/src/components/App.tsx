import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import CityList from './CityList';
import CountryList from './CountryList';
import City from './City';
import Form from './Form';
import CitiesProvider from '../contexts/CitiesProvider';
import AuthProvider from '../contexts/AuthProvider';
import ProtectedRoute from '../pages/ProtectedRoute';
import SpinnerFullPage from './SpinnerFullPage';

const Homepage = lazy(() => import('../pages/Homepage'));
const Product = lazy(() => import('../pages/Product'));
const Pricing = lazy(() => import('../pages/Pricing'));
const Login = lazy(() => import('../pages/Login'));
const AppLayout = lazy(() => import('../pages/AppLayout'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="login" element={<Login />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute
                    redirectPath="/login"
                    element={<AppLayout />}
                  />
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
