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
import Private from "./PrivateRoute/Private";
import Users from "./pages/admin/users/Users";
import AdminUserDetails from "./pages/admin/users/AdminUserDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>



        {/* admin route */}

        <Route element={<Private/>}>
            <Route path="admin/users" element={<Users/>}/>
            <Route path="admin/users/userdetails/:id" element={<AdminUserDetails/>}/>
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/category" element={<Category />} />
            <Route path="admin/product" element={<AdminProduct />} />
            <Route path="admin/addproduct" element={<AdminAddProduct />} />
            <Route path="admin/editproduct/:id" element={<AdminEditProduct />} />
        </Route>








      </Routes>
    </BrowserRouter>
  );
}

export default App;
