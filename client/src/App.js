import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Dashboard from "./pages/admin/Dashboard";
import Category from "./pages/admin/category/Category";
import AdminProduct from "./pages/admin/product/AdminProduct";
import AdminAddProduct from "./pages/admin/product/AdminAddProduct";
import AdminEditProduct from "./pages/admin/product/AdminEditProduct";
import Private from './PrivateRoute/Private';
import Users from "./pages/admin/users/Users";
import AdminUserDetails from "./pages/admin/users/AdminUserDetails";
import Profile from "./pages/Profile";
import AdminSlider from './pages/admin/slider/AdminSlider';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/profile" element={<Profile />}></Route>



        {/* admin route */}
        <Route path='/admin' element={<Private />}>
          <Route path="users" element={<Users />} />
          <Route path="users/userdetails/:id" element={<AdminUserDetails />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="slider" element={<AdminSlider />} />
          <Route path="product" element={<AdminProduct />} />
          <Route path="addproduct" element={<AdminAddProduct />} />
          <Route path="editproduct/:id" element={<AdminEditProduct />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
