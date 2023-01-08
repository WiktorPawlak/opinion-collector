import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AllProducts from "./pages/AllProducts";
import Nav from "./common/layouts/components/Nav/Nav";
import LogIn from "./pages/LogIn";
import SingleProduct from "./pages/SingleProduct";
import SignUp from "./pages/SignUp/SignUp";
import { ClientPanel } from "./pages/ClientPanel";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/clients/self" element={<ClientPanel />} />
        <Route path="/products-view/:id" element={<SingleProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
