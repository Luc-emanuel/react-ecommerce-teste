import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { getLocalStorage } from "./utils/functions";
import { getProducts } from "./utils/functions";

const App = () => {
  const [state, setState] = useState(
    getLocalStorage({ page: "home", product: 0 })
  );
  //
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts(setProducts);
  }, []);
  //
  return (
    <Router basename="/react-ecommerce-teste">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              setProducts={setProducts}
              state={state}
              setState={setState}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
