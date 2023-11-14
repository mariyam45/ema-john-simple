import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCard = getShoppingCart();
    const saveCart = [];
    // step 1 : get id of the addedProduct
    for (const id in storedCard) {
      // get product from products state by using id
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        const quantity = storedCard[id];
        addedProduct.quantity = quantity;
        // step 4: add the added product to the save cart
        saveCart.push(addedProduct);
      }
      // console.log("addedProduct", addedProduct);
    }
    // step 5 : set the cart
    setCart(saveCart);
  }, [products]);

  const handleAddToCart = (product) => {
    // console.log(product);
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
