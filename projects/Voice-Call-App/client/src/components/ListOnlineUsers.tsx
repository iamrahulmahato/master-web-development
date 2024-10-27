"use client";

import { useSocket } from "@/context/SocketContext";
import { useUser } from "@clerk/nextjs";
import Avatar from "./Avatar";


function ListOnlineUsers() {
  const { user } = useUser();
  const { onlineUsers, handleCall } = useSocket();

  return (
    <div className="flex border-b border-b-primary/10 w-full items-center pb-2">
      {onlineUsers &&
        onlineUsers.map((onlineUsers) => {
          if (onlineUsers.profile.id === user?.id) return null;

          return (
            <div
              key={onlineUsers.userId}
              onClick={() => handleCall(onlineUsers)}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <Avatar src={onlineUsers.profile.imageUrl} />
              <div className="text-sm">
                {onlineUsers.profile.fullName?.split(" ")[0]}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ListOnlineUsers;