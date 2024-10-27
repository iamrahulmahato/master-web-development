"use client";

import Avatar from "./Avatar";
import { MdCall, MdCallEnd } from "react-icons/md";
import { useSocket } from "@/context/SocketContext";

function CallNotification() {
  const { onGoingCall, handleJoinCall, handleHangUp } = useSocket();

  if (!onGoingCall?.isRinging) return null;

  return (
    <div className="absolute bg-slate-500 bg-opacity-70 w-screen h-screen top-0 bottom-0 flex items-center justify-center text-black">
      <div className="bg-white min-w-[300px] min-h-[100px] flex flex-col items-center justify-center rounded p-4">
        <div className="flex flex-col items-center">
          <Avatar src={onGoingCall.participants.profile.imageUrl} />
          <h3>{onGoingCall.participants.profile.fullName?.split(" ")[0]}</h3>
        </div>
        <p className="text-sm mb-2">Incoming Call</p>
        <div className="flex gap-8">
          <button
            onClick={() => handleJoinCall(onGoingCall)}
            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"
          >
            <MdCall size={24} />
          </button>
          <button
            onClick={() =>
              handleHangUp({
                onGoingCall: onGoingCall ? onGoingCall : undefined,
                isEmitHangup: true,
              })
            }
            className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white"
          >
            <MdCallEnd size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CallNotification;
