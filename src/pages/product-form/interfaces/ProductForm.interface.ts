export interface LocationState {
  type: string;
  product: ProductData;
}

export interface ProductData {
  id: number;
  name: string;
  description: string;
  category: string;
  expiryDate: string;
  costPrice: string;
  discount: string;
  discountedSellPrice: string;
  finalPrice: string;
  sellPrice: string;
}

export interface ProductFormProps {
  type: string;
  product: ProductData;
  productObj: ProductData;
  validationMessages: Record<keyof ProductData, string | number>;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  validateForm: () => boolean;
  submitHandler: (event: React.FormEvent) => void;
  editProductHandler: () => void;
  backNavigationHandler: () => void;
  errorInputClass: (fieldName: keyof ProductData) => string;
}
