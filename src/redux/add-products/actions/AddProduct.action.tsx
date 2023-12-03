import { ProductData } from '../../../pages/product-form/interfaces/ProductForm.interface';
import {
  ADD_PRODUCTS_REQUEST,
  ADD_PRODUCTS_SUCCESS,
  ADD_PRODUCT_AFTER_DELETE,
  EDIT_PRODUCT,
  GET_SEARCH_PRODUCT,
  SORT_PRODUCT_BY_FIELDNAME,
} from '../constants/AddProduct.constants';

export const addProductRequest = () => {
  return {
    type: ADD_PRODUCTS_REQUEST,
  };
};

export const addProductSuccess = (data: ProductData) => {
  return {
    type: ADD_PRODUCTS_SUCCESS,
    payload: data,
  };
};

export const removeSelectedProduct = (data: ProductData) => {
  return {
    type: ADD_PRODUCT_AFTER_DELETE,
    payload: data,
  };
};

export const getSearchProduct = (data: ProductData) => {
  return {
    type: GET_SEARCH_PRODUCT,
    payload: data,
  };
};

export const editProduct = (data: ProductData) => {
  return {
    type: EDIT_PRODUCT,
    payload: data,
  };
};

export const sortProductByFieldName = (data: ProductData) => {
  return {
    type: SORT_PRODUCT_BY_FIELDNAME,
    payload: data,
  };
};
