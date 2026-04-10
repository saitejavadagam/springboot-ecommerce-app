import { lazy, Suspense, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer';
import { useCartStore } from './store/useCartStore';
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from './store/useAuthStore';

import Loader from './components/Loader';
import Profile from './pages/Profile';

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Contact = lazy(() => import("./pages/Contact"));
const Products = lazy(() => import("./pages/Products"));
const ProductView = lazy(() => import("./pages/ProductView"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Orders = lazy(() => import("./pages/Orders"));

const App = () => {

  const fetchCart = useCartStore(state => state.fetchCart);
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    if (token) fetchCart();
  }, [token, fetchCart]);


  return (
    <div>

      <Navbar />

      <Routes>

        <Route path="/" element={
          <Suspense fallback={<Loader message="Loading home page" />}>
            <Home />
          </Suspense>
        } />

        <Route path='/login' element={
          <Suspense fallback={<Loader message="Loading login page" />}>
            <Login />
          </Suspense>
        } />

        <Route path='/signup' element={
          <Suspense fallback={<Loader message="Loading signup page" />}>
            <Signup />
          </Suspense>
        } />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={
            <Suspense fallback={<Loader message="Loading cart page" />}>
              <Cart />
            </Suspense>
          } />
          <Route path="/profile" element={
            <Suspense fallback={<Loader message="Loading contact us page" />}>
              <Profile />
            </Suspense>
          } />
          <Route path="/products" element={
            <Suspense fallback={<Loader message="Loading products page" />}>
              <Products />
            </Suspense>
          } />
          <Route path="/products/:id" element={
            <Suspense fallback={<Loader message="Loading products page" />}>
              <ProductView />
            </Suspense>
          } />
          <Route path="/orders" element={
            <Suspense fallback={<Loader message="Loading contact us page" />}>
              <Orders />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<Loader message="Loading contact us page" />}>
              <Contact />
            </Suspense>
          } />
        </Route>

      </Routes>

      <Footer />
    </div>
  )
}

export default App