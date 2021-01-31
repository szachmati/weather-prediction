import React, { useEffect, useState } from "react";
import InfoAlert from "./Info";
import { useSelector } from "react-redux";
import { selectApiNotification } from "../../store/app.store.selector";
import { useDispatch } from "react-redux";
import { hideNotification } from "../../store/app.store.action";

export function NotificationMessageHandler() {
  const [message, setMessage] = useState<string>("");
  const notification = useSelector(selectApiNotification);
  const dispatch = useDispatch();

  useEffect(() => {
    setMessage(notification.message);
  }, [notification]);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return notification?.show ? (
    <InfoAlert
      onClose={handleClose}
      severity={notification.severity}
      message={message}
    />
  ) : null;
}
