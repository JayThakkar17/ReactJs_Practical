import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import ProductForm from '../pages/product-form/ProductForm';

const Template = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-product' element={<ProductForm />} />
        <Route path='/edit-product' element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Template;
