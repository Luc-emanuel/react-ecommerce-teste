import React, { useState } from "react";
import { ProductFormProps } from "../../utils/interfaces";
import "./index.css";
import {
  getTitleContent,
  defaultItem,
  delProduct,
} from "../../utils/functions";

const ProductForm = (props: ProductFormProps) => {
  const [confirm, setConfirm] = useState({
    status: false,
    index: 0,
  });
  //
  const confirmSet = (indice: number) => {
    setConfirm({ status: true, index: indice });
  };
  //
  const [imagem, setImagem] = useState(0);
  const [product, setProduct] = useState(
    props.type === "add"
      ? defaultItem
      : props.products.find((res) => res.id === props.state.product)
  );
  //
  const changeIndexImage = (ord: number) => {
    if (ord === -1) {
      if (0 < imagem) {
        setImagem(imagem + ord);
      }
    } else {
      if (imagem < product.images.length - 1) {
        setImagem(imagem + ord);
      }
    }
  };
  //
  const handleForm = (e: any) => {
    const numbers: Array<string> = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      ".",
    ];
    //
    if (props.type === "update" || props.type === "add") {
      const name = e.target.name;
      let value = e.target.value;
      //
      if (
        name === "price" ||
        name === "discountPercentage" ||
        name === "rating" ||
        name === "stock"
      ) {
        if (
          numbers.includes(e.nativeEvent.data) ||
          e.nativeEvent.inputType === "deleteContentBackward"
        ) {
          value = value.replace(/^0+/, "");
          setProduct({ ...product, [name]: value });
        }
      } else {
        setProduct({ ...product, [name]: value });
      }
    }
  };
  //
  const [file, setFile] = useState<Array<string>>([]);
  const onImageChange = (e: any) => {
    if (props.type === "update" || props.type === "add") {
      const files = e.target.files;
      const urlsImage: Array<string> = [];
      for (let indice = 0; indice < files.length; indice++) {
        urlsImage.push(URL.createObjectURL(files[indice]));
      }
      setFile([...file, ...urlsImage]);
      setProduct({ ...product, images: [...product.images, ...urlsImage] });
    }
  };
  //
  const removeImage = () => {
    if (props.type === "update" || props.type === "add") {
      const imagensB = [...product.images];
      imagensB.splice(imagem, 1);
      if (imagem === imagensB.length) {
        if (imagem > 0) {
          setImagem(imagem - 1);
        }
      }
      setProduct({ ...product, images: [...imagensB] });
    }
  };
  //
  return (
    <div id="product-form">
      {confirm.status === true ? (
        <div id="pop-up-delete-box">
          <div id="pop-up-delete-box-intern">
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
                        if (props.type === "add") {
                          setConfirm({ status: false, index: 0 });
                          props.setState({
                            ...props.state,
                            page: "home",
                            product: 0,
                          });
                          localStorage.setItem(
                            "state",
                            JSON.stringify({ ...props.state, page: "home" })
                          );
                        } else {
                          delProduct(
                            props.products,
                            props.setProducts,
                            props.state.product
                          );
                          setConfirm({ status: false, index: 0 });
                        }
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
          </div>
        </div>
      ) : (
        <></>
      )}
      <div
        id="button-return"
        onClick={() => {
          props.setState({ ...props.state, page: "home", product: 0 });
          localStorage.setItem(
            "state",
            JSON.stringify({ ...props.state, page: "home" })
          );
        }}
      >
        <span>{"Voltar"}</span>
      </div>
      <div id="product-form-content">
        <div id="content-line1">
          <span>{getTitleContent(props.type)}</span>
        </div>
        <div id="content-line2">
          <div id="side-left">
            {product.images.length > 0 ? (
              <>
                <div id="left-box-buttons">
                  <div onClick={() => changeIndexImage(-1)}>
                    <span>{"anterior"}</span>
                  </div>
                  <div>
                    <span>{`${imagem + 1}/${product.images.length}`}</span>
                  </div>
                  <div onClick={() => changeIndexImage(1)}>
                    <span>{"próxima"}</span>
                  </div>
                </div>
                <div id="left-box-image">
                  {props.type !== "view" ? (
                    <div
                      id="left-box-image-delete"
                      onClick={() => removeImage()}
                    >
                      <span>{"X"}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  <img alt="imagem-base" src={product.images[imagem]} />
                </div>
              </>
            ) : (
              <span id="msg-not-images">
                {"Sem imagens. Selecione no mínimo uma imagem."}
              </span>
            )}
          </div>
          <div id="side-right">
            <div id="right-title">
              <input
                spellCheck={false}
                onChange={(e) => handleForm(e)}
                value={product.title}
                name="title"
                placeholder="Título"
                disabled={
                  props.type === "update" || props.type === "add" ? false : true
                }
              />
            </div>
            <div id="right-description">
              <textarea
                spellCheck={false}
                onChange={(e) => handleForm(e)}
                value={product.description}
                name="description"
                placeholder="Descrição"
                disabled={
                  props.type === "update" || props.type === "add" ? false : true
                }
              ></textarea>
            </div>
            <div id="right-numbers">
              <div>
                <input
                  spellCheck={false}
                  onChange={(e) => handleForm(e)}
                  value={product.price}
                  name="price"
                  placeholder="Preço"
                  disabled={
                    props.type === "update" || props.type === "add"
                      ? false
                      : true
                  }
                />
                <span>{"Preço"}</span>
              </div>
              <div>
                <input
                  spellCheck={false}
                  onChange={(e) => handleForm(e)}
                  value={product.discountPercentage}
                  name="discountPercentage"
                  placeholder="Desconto"
                  disabled={
                    props.type === "update" || props.type === "add"
                      ? false
                      : true
                  }
                />
                <span>{"Desconto"}</span>
              </div>
              <div>
                <input
                  spellCheck={false}
                  onChange={(e) => handleForm(e)}
                  value={product.rating}
                  name="rating"
                  placeholder="Avaliação"
                  disabled={
                    props.type === "update" || props.type === "add"
                      ? false
                      : true
                  }
                />
                <span>{"Avaliação"}</span>
              </div>
              <div>
                <input
                  spellCheck={false}
                  onChange={(e) => handleForm(e)}
                  value={product.stock}
                  name="stock"
                  placeholder="Estoque"
                  disabled={
                    props.type === "update" || props.type === "add"
                      ? false
                      : true
                  }
                />
                <span>{"Estoque"}</span>
              </div>
            </div>
            <div id="right-info">
              <div>
                <input
                  spellCheck={false}
                  onChange={(e) => handleForm(e)}
                  value={product.brand}
                  name="brand"
                  placeholder="Marca"
                  disabled={
                    props.type === "update" || props.type === "add"
                      ? false
                      : true
                  }
                />
                <span>{"Marca"}</span>
              </div>
              <div>
                <input
                  spellCheck={false}
                  onChange={(e) => handleForm(e)}
                  value={product.category}
                  name="category"
                  placeholder="Categoria"
                  disabled={
                    props.type === "update" || props.type === "add"
                      ? false
                      : true
                  }
                />
                <span>{"Categoria"}</span>
              </div>
            </div>
            {props.type !== "view" ? (
              <>
                <div id="right-images">
                  <label id="input-image">
                    {"Selecione uma ou mais imagens"}
                    <input
                      id="input-image"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={onImageChange}
                    />
                  </label>
                </div>
                <div id="right-buttons">
                  <div id="right-buttons-line">
                    <div
                      id="button-alterar"
                      onClick={() => {
                        props.setState({
                          ...props.state,
                          page: "home",
                          product: 0,
                        });
                        localStorage.setItem(
                          "state",
                          JSON.stringify({ ...props.state, page: "home" })
                        );
                      }}
                    >
                      <span>{"Cancelar"}</span>
                    </div>
                    <div
                      id="button-delete"
                      onClick={() => confirmSet(props.state.product)}
                    >
                      <span>{"Excluir"}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div id="right-buttons">
                <div id="right-buttons-line">
                  <div
                    id="button-alterar"
                    onClick={() => {
                      props.setState({ ...props.state, page: "update" });
                    }}
                  >
                    <span>{"Alterar"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
