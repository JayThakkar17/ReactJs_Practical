import { combineReducers } from 'redux';
import AddProductReducer from './add-products/reducer/AddProduct.reducer';
import store from './store';
import RemoveProductReducer from './remove-product/reducer/RemoveProduct.reducer';

const rootReducer = combineReducers({
  addProduct: AddProductReducer,
  removeProduct: RemoveProductReducer
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
