import React from "react";
import Header from "./Header";
import Products from "./Products";
import { useSelector } from "react-redux";
import "./Layout.css";
import CartItems from "./CartItems";

const Layout = () => {
  const total = useSelector((state) => state.cart.totalAmount);
  const showCart = useSelector((state) => state.cart.showCart);

  return (
    <React.Fragment>
      <div className="layout">
        <Header />
        <Products />
        <div className="total-price">
          <h3>Total: ${total}</h3>
          <button className="orderBtn">Place Order</button>
        </div>
        {showCart && <CartItems />}
      </div>
    </React.Fragment>
  );
};

export default Layout;
