import { Alert } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";

export const Notification = (type, message) => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const handleclose = () => {
    dispatch(
      uiActions.showNotification({
        open: false,
        message: "Request error occured",
        type: "error",
      })
    );
  };

  return (
    <div>
      {notification.open && (
        <Alert onClose={handleclose} severity={type}>
          {message}
        </Alert>
      )}
    </div>
  );
};
