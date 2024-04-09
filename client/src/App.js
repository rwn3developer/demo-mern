import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>

          <Route path="/" element={<Home/>}></Route>
          <Route path="/product" element={<Product/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          


        </Routes>
    </BrowserRouter>
  );
}

export default App;
