import React, { useState } from 'react';
import styles from './ProductListing.module.css';
import editIcon from '../../assets/images/edit-icon.svg';
import { useSelector } from 'react-redux';
import { AppDispatch, IRootState } from '../../redux/rootReducer';
import { useDispatch } from 'react-redux';
import { getSelectedProductId } from '../../redux/remove-product/action/RemoveProduct.action';
import { useNavigate } from 'react-router-dom';
import iconSearch from '../../assets/images/icon-sort.svg';
import { sortProductByFieldName } from '../../redux/add-products/actions/AddProduct.action';
import { ProductData } from '../product-form/interfaces/ProductForm.interface';

const ProductListing = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data } = useSelector((state: IRootState) => state.addProduct);

  const [selectedProdcutIds, setSelectedProdcutIds] = useState<number[]>([]);

  const selectProductHandler = (productId: number) => {
    const temp: number[] = [...selectedProdcutIds];
    const index = temp.indexOf(productId);

    index !== -1 ? temp.splice(index, 1) : temp.push(productId);

    setSelectedProdcutIds(temp);
    dispatch(getSelectedProductId(temp));
  };

  const selectAllProductHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target as HTMLInputElement;
    const allProductIds = data.map((product: { id: number }) => product.id);
    if (checked) {
      setSelectedProdcutIds(allProductIds);
      dispatch(getSelectedProductId(allProductIds));
    } else {
      setSelectedProdcutIds([]);
    }
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const sortFieldHandler = (field: keyof ProductData) => {
    const sortedData = [...data].sort((a, b) => {
      if (field === 'name' || field === 'finalPrice') {
        return a[field].localeCompare(b[field]);
      } else if (field === 'expiryDate') {
        const formattedA = formatDate(a[field]);
        const formattedB = formatDate(b[field]);
        return formattedA.localeCompare(formattedB);
      } else {
        return parseFloat(a[field]) - parseFloat(b[field]);
      }
    });

    const sortedByFieldName: any = sortedData.map((item) => ({
      ...item,
      expiryDate: formatDate(item.expiryDate),
    }));

    dispatch(sortProductByFieldName(sortedByFieldName));
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles['responsive-table']}>
        <thead>
          <tr>
            <th>
              <input onChange={selectAllProductHandler} type='checkbox' />
            </th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>
              Expiry Date
              <img
                onClick={() => sortFieldHandler('expiryDate')}
                src={iconSearch}
                alt='sort-icon'
              />
            </th>
            <th>Cost Price</th>
            <th>Final Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!data.length && (
            <tr>
              <td className={styles.noData} colSpan={8}>
                No appointment data found
              </td>
            </tr>
          )}
          {data.map((item: ProductData) => (
            <tr key={item.id}>
              <td>
                <input
                  type='checkbox'
                  value={item.id}
                  onChange={() => selectProductHandler(item.id)}
                  checked={selectedProdcutIds.includes(item.id)}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>{item.expiryDate}</td>
              <td>{item.costPrice}</td>
              <td>{item.finalPrice}</td>
              <td>
                <img
                  onClick={() =>
                    navigate('/edit-product', {
                      state: { type: 'edit', product: item },
                    })
                  }
                  src={editIcon}
                  alt='edit-icon'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListing;
