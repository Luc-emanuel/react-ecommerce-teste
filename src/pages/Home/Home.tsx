import React from "react";
import "./index.css";
import Base from "../../components/Base/Base";
import ProductCard from "../../components/ProductCard/ProductCard";
import { PageProps } from "../../utils/interfaces";
import ProductForm from "../../components/ProductForm/ProductForm";

const Home = (props: PageProps) => {
  return (
    <Base state={props.state} setState={props.setState}>
      {props.state.page === "home" ? (
        <ProductCard
          products={props.products}
          state={props.state}
          setState={props.setState}
          setProducts={props.setProducts}
        />
      ) : (
        <ProductForm
          type={props.state.page}
          products={props.products}
          state={props.state}
          setState={props.setState}
          setProducts={props.setProducts}
        />
      )}
    </Base>
  );
};

export default Home;
