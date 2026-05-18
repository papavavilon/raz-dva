import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import { ToastContainer } from 'react-toastify';
import Catalog from './pages/Catalog/Catalog.tsx';
import Product from './pages/Product/Product.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import GlobalErrorFallback from './pages/ErrorFallback/ErrorFallback.tsx';
import SignIn from './pages/SignIn/SignIn.tsx';
import Layout from './layout/Layout.tsx';
import ScrollManager from './components/ScrollManager.tsx';
import CatalogLayout from './layout/CatalogLayout/CatalogLayout.tsx';
import Checkout from './pages/Checkout/Checkout.tsx';
import Profile from './pages/Profile/Profile.tsx';

function App() {
  return (
    <BrowserRouter basename={'/raz-dva'}>
      <ScrollManager />
      <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
        <ToastContainer />
        <Routes>
          <Route element={<Layout />}>
            <Route element={<CatalogLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:slug" element={<Product />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
