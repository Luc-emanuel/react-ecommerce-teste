//
import { ItemProps, StateProps } from "./interfaces";

export const updateHeight = () => {
  return `${window.innerHeight - 160}px`;
};

export const getElement = (type: string, key: string) => {
  let doc;
  if (type === "id") {
    doc = document.getElementById(key);
    return doc;
  }
  if (type === "class") {
    doc = document.querySelector(key);
  }
  return doc;
};

export const getLocalStorage = (valueDefault: StateProps) => {
  if (localStorage.state) {
    return JSON.parse(localStorage.state);
  } else {
    return valueDefault;
  }
};

export const resetAllData = (state: StateProps, setState: Function) => {
  setState({ ...state, page: "home", product: 0, image: "" });
  localStorage.clear();
  window.location.href = "/ecommerce";
};

export const getProducts = (setProducts: Function) => {
  if (localStorage.products) {
    setProducts(JSON.parse(localStorage.products));
  } else {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        localStorage.setItem("products", JSON.stringify(res.products));
      });
  }
};

export const delProduct = (
  products: Array<any>,
  setProducts: Function,
  id: number
) => {
  fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.isDeleted) {
        products.map((item, index) => {
          if (item.id === id) {
            item["isDeleted"] = true;
          }
          return null;
        });
        setProducts(products);
        localStorage.setItem("products", JSON.stringify(products));
        window.location.reload();
      }
    });
};

export const getTitleContent = (typePage: string) => {
  if (typePage === "view") {
    return "Visualização";
  }
  if (typePage === "update") {
    return "Editar Produto";
  }
  if (typePage === "add") {
    return "Adicionar Produto";
  }
};

export const defaultItem: ItemProps = {
  id: 0,
  title: "",
  description: "",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: "",
  category: "",
  thumbnail: "",
  images: [],
  isDeleted: false,
};
