import {
  ADD_PRODUCTS_REQUEST,
  ADD_PRODUCTS_SUCCESS,
  ADD_PRODUCT_AFTER_DELETE,
  GET_SEARCH_PRODUCT,
  EDIT_PRODUCT,
  SORT_PRODUCT_BY_FIELDNAME,
} from '../constants/AddProduct.constants';

interface State {
  loading: boolean;
  data: string[];
}

const initialState: State = {
  loading: false,
  data: [],
};

const AddProductReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    case ADD_PRODUCT_AFTER_DELETE:
      return {
        ...state,
        data: action.payload,
      };
    case GET_SEARCH_PRODUCT:
      return {
        ...state,
        data: action.payload,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        data: action.payload,
      };
    case SORT_PRODUCT_BY_FIELDNAME:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default AddProductReducer;
