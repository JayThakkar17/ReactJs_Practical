import React from 'react';
import ProductListing from '../product-listing/ProductListing';
import styles from './Home.module.css';
import HomeHeader from '../../components/home/header/HomeHeader';

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <HomeHeader />
        <ProductListing />
      </div>
    </>
  );
};

export default Home;
