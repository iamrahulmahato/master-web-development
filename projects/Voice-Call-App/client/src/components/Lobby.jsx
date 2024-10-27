import { useSocket } from "@/context/SocketProvider";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import VoiceChatIcon from "@mui/icons-material/VoiceChat";

const LobbyScreen = () => {
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const router = useRouter();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { room });
    },
    [room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      router.push(`/room/${room}`);
    },
    [router]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-100 text-black">
      <title>Voice Chat</title>
      <link
        rel="shortcut icon"
        href="../../public/favicon.ico"
        type="image/x-icon"
      />

      {/* App Title */}
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-800">
        <VoiceChatIcon style={{ fontSize: "2.5rem", marginRight: "0.5rem" }} />
        Simple Voice Chat App
      </h1>

      {/* Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmitForm}
        >
          {/* Room Label */}
          <label
            htmlFor="room"
            className="text-lg font-semibold mb-2 text-gray-700"
          >
            Room Number
          </label>

          {/* Room Input */}
          <input
            className="w-full p-3 rounded-md text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
            type="number"
            id="room"
            required
            autoComplete="off"
            value={room}
            placeholder="Enter Room Number"
            onChange={(e) => setRoom(e.target.value)}
          />

          {/* Join Button */}
          <button className="mt-6 w-full p-3 rounded-md bg-purple-600 text-white font-semibold transition duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md">
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default LobbyScreen;
