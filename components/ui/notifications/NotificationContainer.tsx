"use client";

import NotificationToast from "./NotificationToast";

type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

type NotificationContainerProps = {
  notifications: Notification[];
  onClose: (id: string) => void;
};

const NotificationContainer = ({
  notifications,
  onClose,
}: NotificationContainerProps) => {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[11000] flex flex-col gap-2">
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => onClose(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;