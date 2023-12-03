import { GET_SELECTED_PRODUCT_ID } from '../constants/RemoveProduct.constant';

const initialState = {
  loading: false,
  productIds: [],
};

const RemoveProductReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SELECTED_PRODUCT_ID:
      return {
        ...state,
        productIds: action.payload,
      };
    default:
      return state;
  }
};

export default RemoveProductReducer;
