"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import NotificationContainer from "../ui/notifications/NotificationContainer";

type NotificationType = "success" | "error" | "info";

type Notification = {
  id: string;
  message: string;
  type: NotificationType;
};

type NotificationContextType = {
  notify: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
};

const NotificationContext =
  createContext<NotificationContextType | null>(null);

const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const removeNotification = useCallback(
    (id: string) => {
      setNotifications((current) =>
        current.filter(
          (notification) => notification.id !== id,
        ),
      );
    },
    [],
  );

  const addNotification = useCallback(
    (message: string, type: NotificationType) => {
      const id = crypto.randomUUID();

      setNotifications((current) => [
        ...current,
        {
          id,
          message,
          type,
        },
      ]);

      setTimeout(() => {
        removeNotification(id);
      }, 3500);
    },
    [removeNotification],
  );

  const notify = {
    success: (message: string) =>
      addNotification(message, "success"),

    error: (message: string) =>
      addNotification(message, "error"),

    info: (message: string) =>
      addNotification(message, "info"),
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

     <NotificationContainer notifications={notifications} onClose={removeNotification} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider",
    );
  }

  return context;
};

export default NotificationProvider;