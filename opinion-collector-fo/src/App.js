import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AllProducts from './pages/AllProducts';
import Nav from './common/layouts/components/Nav/Nav';
import LogIn from './pages/LogIn';
import SingleProduct from './pages/SingleProduct';
import SignUp from './pages/SignUp/SignUp';
import { ProductDetails } from './pages/ProductDetails';
import { CategoriesPage } from './pages/CategoriesPage';
import { AddCategory } from './pages/AddCategory';
import { EditCategory } from './pages/EditCategory';
import { ClientsPanel } from './modules/clients/ClientsPanel';
import { ClientPanel } from './modules/clients/ClientPanel';
import { AllSuggestions } from './modules/suggestions/AllSuggestions';
import { MySuggestions } from './modules/suggestions/MySuggestions';
import { AddOpinion } from './pages/AddOpinion';
import { EditOpinion } from './pages/EditOpinion';
import { AddSuggestion } from './modules/suggestions/AddSuggestion';
import { EditProductDetails } from './pages/EditProductDetails';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/products/add" element={<ProductDetails />} />
        <Route path="/products/edit/:id" element={<EditProductDetails />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/clients" element={<ClientsPanel />} />
        <Route path="/clients/self" element={<ClientPanel />} />
        <Route path="/suggestions/add/:id" element={<AddSuggestion />} />
        <Route path="/all_suggestions" element={<AllSuggestions />} />
        <Route path="/my_suggestions" element={<MySuggestions />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/add" element={<AddCategory />} />
        <Route path="/categories/edit/:id" element={<EditCategory />} />
        <Route path="/opinions/add/:id" element={<AddOpinion />} />
        <Route path="/opinions/edit/:opinionId/:id" element={<EditOpinion />} />
      </Routes>
    </Router>
  );
}

export default App;
