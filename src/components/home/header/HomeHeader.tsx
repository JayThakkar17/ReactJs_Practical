import React, { useState } from 'react';
import styles from './Home.module.css';
import Button from '../../button/Button';
import { useNavigate } from 'react-router-dom';
import { ProductData } from '../../../pages/product-form/interfaces/ProductForm.interface';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from '../../../redux/rootReducer';
import {
  getSearchProduct,
  removeSelectedProduct,
} from '../../../redux/add-products/actions/AddProduct.action';
import searchIcon from '../../../assets/images/icon-search.svg';

const HomeHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { data } = useSelector((state: IRootState) => state.addProduct);
  const { productIds } = useSelector(
    (state: IRootState) => state.removeProduct
  );

  const [searchProduct, setSearchProduct] = useState('');

  let timer: null | ReturnType<typeof setTimeout>;

  const addProductHandler = () => navigate('/add-product');

  const deleteProductHandler = () => {
    const result: ProductData = data.filter(
      (product: { id: number }) => !productIds.includes(product.id)
    );
    dispatch(removeSelectedProduct(result));
  };

  const searchProductHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;

    if (value) {
      const filteredData = data.filter((product: ProductData) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        dispatch(getSearchProduct(filteredData));
      }, 1000);
    } else {
      dispatch(getSearchProduct(data));
    }

    setSearchProduct(value);
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerSection}>
        <div className={styles.searchProductInput}>
          <input
            value={searchProduct}
            onChange={searchProductHandler}
            type='text'
            placeholder='Search for Product'
          />
          <img src={searchIcon} alt='search-icon' />
        </div>
      </div>
      <div className={styles.btnGroup}>
        <Button onClick={addProductHandler} text='+ Add Product' />
        <Button onClick={deleteProductHandler} text='Delete' />
      </div>
    </div>
  );
};

export default HomeHeader;
