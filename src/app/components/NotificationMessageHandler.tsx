import React, { useEffect, useState } from "react";
import InfoAlert from "./alert/Info";
import { useSelector } from "react-redux";
import { selectApiMessage } from "../store/app.store.selector";

enum Severity {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

export interface NotificationMessage {
  severity: Severity;
  message: string;
}

export function NotificationMessageHandler() {
  const [notificationMsg, setNotificationMsg] = useState<NotificationMessage>(
    null
  );
  const apiMessage = useSelector(selectApiMessage);

  useEffect(() => {
    setNotificationMsg(apiMessage);
  }, [apiMessage]);

  return (
    notificationMsg?.message !== "" && (
      <InfoAlert
        severity={notificationMsg?.severity}
        message={notificationMsg?.message}
      />
    )
  );
}
