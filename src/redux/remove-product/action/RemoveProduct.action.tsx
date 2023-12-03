import { GET_SELECTED_PRODUCT_ID } from '../constants/RemoveProduct.constant';

export const getSelectedProductId = (productIdsArray: number[]) => {
  return {
    type: GET_SELECTED_PRODUCT_ID,
    payload: productIdsArray,
  };
};
