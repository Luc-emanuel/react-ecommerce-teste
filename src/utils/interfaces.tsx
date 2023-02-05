export interface StateProps {
  page: string;
  product: number;
}

export interface PageProps {
  products: Array<any>;
  setProducts: Function;
  state: StateProps;
  setState: Function;
}

export interface ItemProps {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
  isDeleted: boolean;
}

export interface ProductFormProps {
  type: string;
  products: Array<any>;
  state: StateProps;
  setState: Function;
  setProducts: Function;
}
