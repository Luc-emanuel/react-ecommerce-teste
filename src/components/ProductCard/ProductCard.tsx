import React, { useState } from "react";
import { delProduct } from "../../utils/functions";
import { PageProps, ItemProps } from "../../utils/interfaces";
import "./index.css";

const ProductCard = (props: PageProps) => {
  const { products } = props;
  const [confirm, setConfirm] = useState({
    status: false,
    index: 0,
  });
  const selectProduct = (id: number, page: string) => {
    props.setState({ page: page, product: id });
  };
  //
  const confirmSet = (indice: number) => {
    setConfirm({ status: true, index: indice });
  };
  //
  return (
    <div id="product">
      {products.map((item: ItemProps, index: number) => {
        if (!item.isDeleted) {
          return (
            <div key={`${index}-product`} id="product-card">
              {confirm.status === true && confirm.index === index ? (
                <div id="pop-up-delete-card">
                  <div
                    id="button-close"
                    onClick={() => {
                      setConfirm({ ...confirm, status: false });
                    }}
                  >
                    X
                  </div>
                  <div id="card-content">
                    <div id="card-text">
                      <div id="card-text-title">
                        <span>{`Tem certeza que quer excluir?`}</span>
                      </div>
                      <div id="card-text-desc">
                        <span>{`Após a exclusão não há como recuperar, caso esteja certo disto, confirme abaixo.`}</span>
                      </div>
                    </div>
                    <div id="card-buttons">
                      <div id="buttons-line">
                        <div
                          id="button-yes"
                          onClick={() => {
                            delProduct(
                              props.products,
                              props.setProducts,
                              item.id
                            );
                            setConfirm({ status: false, index: 0 });
                          }}
                        >
                          <span>{"Sim"}</span>
                        </div>
                        <div
                          id="button-not"
                          onClick={() => {
                            setConfirm({ ...confirm, status: false });
                          }}
                        >
                          <span>{"Não"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div id="product-card-img">
                    <img
                      draggable="false"
                      alt={"imagem-product"}
                      src={
                        item.images.length > 1 ? item.images[1] : item.images[0]
                      }
                    />
                  </div>
                  <div id="product-card-actions">
                    <div id="product-card-title">
                      <span>{item.title}</span>
                    </div>
                    <div id="product-card-buttons-line">
                      <div id="product-card-buttons">
                        <div
                          id="button"
                          onClick={() => selectProduct(item.id, "view")}
                        >
                          <span>{"ver dados"}</span>
                        </div>
                        <div
                          id="button"
                          onClick={() => selectProduct(item.id, "update")}
                        >
                          <span>{"alterar"}</span>
                        </div>
                        <div id="button-del" onClick={() => confirmSet(index)}>
                          <span>{"excluir"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default ProductCard;
