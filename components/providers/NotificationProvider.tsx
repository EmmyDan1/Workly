"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import NotificationContainer from "../ui/notifications/NotificationContainer";
import { io, Socket } from "socket.io-client";

type NotificationType = "success" | "error" | "info";

type Notification = {
  id: string;
  message: string;
  type: NotificationType;
};

type PersistentNotification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
};

type NotificationContextType = {
  notify: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
  notifications: PersistentNotification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [persistentNotifications, setPersistentNotifications] = useState<
    PersistentNotification[]
  >([]);

  const unreadCount = persistentNotifications.filter(
    (notification) => !notification.read,
  ).length;

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:5000/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();

        const formattedNotifications: PersistentNotification[] = data.map(
          (notification: any) => ({
            id: notification.id,
            title: notification.title,
            message: notification.message,
            type: notification.type,
            read: notification.read,
            createdAt: notification.created_at,
          }),
        );

        setPersistentNotifications(formattedNotifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Socket token exists:", !!token);

    if (!token) return;

    const socket = io("http://localhost:5000", {
      auth: {
        token,
      },
    });

    socket.on("connect", () => {
      console.log("Connected to notification server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from notification server");
    });

    socket.on("notification", (notification: PersistentNotification) => {
      console.log("REAL-TIME NOTIFICATION RECEIVED:", notification);
      setPersistentNotifications((current) => [notification, ...current]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  }, []);

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

  const markAsRead = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      setPersistentNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/notifications/read-all",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to mark all notifications as read");
      }

      setPersistentNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          read: true,
        })),
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const notify = {
    success: (message: string) => addNotification(message, "success"),

    error: (message: string) => addNotification(message, "error"),

    info: (message: string) => addNotification(message, "info"),
  };

  return (
    <NotificationContext.Provider
      value={{
        notify,
        notifications: persistentNotifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}

      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }

  return context;
};

export default NotificationProvider;
