import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/images/back-icon.svg';
import Button from '../../components/button/Button';
import Loader from '../../components/loader/Loader';
import {
  addProductSuccess,
  editProduct
} from '../../redux/add-products/actions/AddProduct.action';
import { AppDispatch, IRootState } from '../../redux/rootReducer';
import styles from './ProductForm.module.css';
import { LocationState, ProductData } from './interfaces/ProductForm.interface';

const ProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { type, product } = (useLocation().state as LocationState) || '';

  const { data, loading } = useSelector(
    (state: IRootState) => state.addProduct
  );

  const inputObj: ProductData = {
    id: 0,
    name: '',
    description: '',
    category: '',
    expiryDate: '',
    costPrice: '',
    discount: '',
    discountedSellPrice: '',
    finalPrice: '',
    sellPrice: '',
  };

  const categories = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Phones' },
    { id: 3, name: 'Clothing' },
    { id: 4, name: 'Dairy' },
    { id: 5, name: 'Shampoo' },
  ];

  const [productObj, setProductObj] = useState<ProductData>(inputObj);
  const [validationMessages, setValidationMessages] =
    useState<Record<keyof ProductData, string | number>>(inputObj);

  useEffect(() => {
    if (product && Object.keys(product)) {
      setProductObj(product);
    }
  }, [product]);

  useEffect(() => {
    const { sellPrice, discount, costPrice } = productObj;
    if (sellPrice && discount) {
      const discountedPrice =
        +sellPrice - (Number(discount) * Number(sellPrice)) / 100;

      const temp = Number(costPrice) + discountedPrice;

      setProductObj({
        ...productObj,
        discountedSellPrice: String(discountedPrice),
        finalPrice: String(temp),
      });
    }
  }, [productObj.sellPrice, productObj.discount]);

  const generateValidationMessage = (
    fieldName: keyof ProductData,
    value: string
  ): string => {
    return value.trim() === ''
      ? `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
      : '';
  };

  const isValueValid = (value: string | number): boolean =>
    typeof value === 'string' && value.trim() !== '';

  const onChangeHandler = ({
    target: { value, name },
  }: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    setProductObj({
      ...productObj,
      [name]: value,
    });

    setValidationMessages({
      ...validationMessages,
      [name]: generateValidationMessage(name as keyof ProductData, value),
    });
  };

  const validateForm = (): boolean => {
    const newValidationMessages: Record<keyof ProductData, string | number> = {
      ...inputObj,
    };
    let formIsValid = true;

    Object.keys(newValidationMessages).forEach((field) => {
      const fieldName = field as keyof ProductData;
      const value = productObj[fieldName];

      if (fieldName !== 'id' && !isValueValid(value)) {
        newValidationMessages[fieldName] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`;
        formIsValid = false;
      } else {
        newValidationMessages[fieldName] = '';
      }
    });

    setValidationMessages(newValidationMessages);

    return formIsValid;
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      productObj.id = data.length + 1;
      dispatch(addProductSuccess(productObj));
      navigate('/');
    } else {
      console.log('Form validation failed');
    }
  };

  const editProductHandler = () => {
    const obj: any = [...data];

    obj[product.id - 1] = productObj;

    dispatch(editProduct(obj));
    navigate('/');
  };

  const backNavigationHandler = () => navigate('/');

  const errorInputClass = (fieldName: keyof ProductData) =>
    validationMessages[fieldName] ? styles.errorInput : styles.fieldWrapper;

  return (
    <>
      {loading && <Loader />}
      <div className={styles.container}>
        <div className={styles.addProductHeader}>
          <div className={styles.title}>
            <div onClick={backNavigationHandler} className={styles.backIcon}>
              <img src={backIcon} alt='back-icon' />
            </div>
            <h1>{`${type === 'edit' ? 'Edit' : 'Add'}`} Product</h1>
          </div>

          <div className={styles.submitBtnWrapper}>
            <Button
              text={`${type === 'edit' ? 'Edit' : 'Submit'}`}
              onClick={type === 'edit' ? editProductHandler : submitHandler}
            />
          </div>
        </div>

        <div>
          <form className={styles.productForm}>
            <div
              className={`${
                validationMessages.description
                  ? styles.errorInputFull
                  : styles.fieldWrapper
              } ${styles.fieldWrapperFull}`}
            >
              <label>Description</label>
              <textarea
                value={productObj.description}
                onChange={onChangeHandler}
                name='description'
                placeholder='Add Description'
              />
              {validationMessages.description && (
                <p className={styles.validationMessage}>
                  {validationMessages.description}
                </p>
              )}
            </div>

            <div className={styles.fieldRow}>
              <div className={errorInputClass('name')}>
                <label>Name</label>
                <input
                  value={productObj.name}
                  onChange={onChangeHandler}
                  type='text'
                  name='name'
                  placeholder='Add Name'
                />
                {validationMessages.name && (
                  <p className={styles.validationMessage}>
                    {validationMessages.name}
                  </p>
                )}
              </div>

              <div className={errorInputClass('category')}>
                <label>Category</label>
                <select
                  value={productObj.category}
                  onChange={onChangeHandler}
                  name='category'
                  className={styles.categoryDropdown}
                >
                  <option value='' disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {validationMessages.category && (
                  <p className={styles.validationMessage}>
                    {validationMessages.category}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={errorInputClass('expiryDate')}>
                <label>Expiry Date</label>
                <input
                  value={productObj.expiryDate}
                  onChange={onChangeHandler}
                  type='date'
                  name='expiryDate'
                />
                {validationMessages.expiryDate && (
                  <p className={styles.validationMessage}>
                    {validationMessages.expiryDate}
                  </p>
                )}
              </div>

              <div className={errorInputClass('costPrice')}>
                <label>Cost Price</label>
                <input
                  value={productObj.costPrice}
                  onChange={onChangeHandler}
                  type='text'
                  name='costPrice'
                />
                {validationMessages.costPrice && (
                  <p className={styles.validationMessage}>
                    {validationMessages.costPrice}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={errorInputClass('discount')}>
                <label>Discount (%)</label>
                <input
                  type='text'
                  name='discount'
                  value={productObj.discount}
                  onChange={onChangeHandler}
                />
                {validationMessages.discount && (
                  <p className={styles.validationMessage}>
                    {validationMessages.discount}
                  </p>
                )}
              </div>

              <div className={errorInputClass('sellPrice')}>
                <label>Sell Price</label>
                <input
                  type='text'
                  name='sellPrice'
                  value={productObj.sellPrice}
                  onChange={onChangeHandler}
                />
                {validationMessages.sellPrice && (
                  <p className={styles.validationMessage}>
                    {validationMessages.sellPrice}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.fieldWrapper}>
                <label>Discounted Sell Price</label>
                <input
                  value={productObj.discountedSellPrice}
                  type='text'
                  disabled
                />
              </div>

              <div className={styles.fieldWrapper}>
                <label>Final Price</label>
                <input value={productObj.finalPrice} type='text' disabled />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
