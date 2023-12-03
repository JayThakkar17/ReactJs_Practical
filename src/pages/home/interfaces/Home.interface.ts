export interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ActionButtonGroupProps {
  onAddProduct: () => void;
  onDeleteProduct: () => void;
}
