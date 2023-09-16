import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Notification } from "./components/Notification";
import { uiActions } from "./store/ui-slice";

let firstRender = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if(firstRender){
      firstRender = false
      return
    }
    sendRequest();
    sendRequest().catch((err) => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Request error occured",
          type: "error",
        })
      );
    });
  }, [cart]);

  const sendRequest = async () => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending the request",
        type: "warning",
      })
    );
    const res = await fetch(
      "https://redux-shopping-3af00-default-rtdb.firebaseio.com/cartItems.json",
      {
        method: "PUT",
        body: JSON.stringify(cart),
      }
    );
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Request Sent to Database Successfully",
        type: "success",
      })
    );    
    console.log(notification)
    const data = await res.json();
  };

  return (
    <div className="App">
      {notification && <Notification type={notification?.type} message={notification?.message} />}
      {isLoggedIn ? <Layout /> : <Auth />}
    </div>
  );
}

export default App;
