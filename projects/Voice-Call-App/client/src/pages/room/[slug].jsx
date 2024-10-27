import { useSocket } from "@/context/SocketProvider";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import peer from "@/service/peer";
import CallIcon from "@mui/icons-material/Call";
import VoiceChatIcon from "@mui/icons-material/VoiceChat";
import AudioPlayer from "@/components/AudioPlayer";
import CallHandleButtons from "@/components/CallHandleButtons";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // New icon for connecting
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // New icon for ending call

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isAudioMute, setIsAudioMute] = useState(false);
  const [callButton, setCallButton] = useState(true);
  const [isSendButtonVisible, setIsSendButtonVisible] = useState(true);

  const handleUserJoined = useCallback(({ id }) => {
    setRemoteSocketId(id);
  }, []);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMyStream(stream);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
    setIsSendButtonVisible(false);
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeededIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const handleNegoFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    peer.peer.addEventListener("track", (ev) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeededIncoming);
    socket.on("peer:nego:final", handleNegoFinal);
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeededIncoming);
      socket.off("peer:nego:final", handleNegoFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeededIncoming,
    handleNegoFinal,
  ]);

  useEffect(() => {
    socket.on("call:end", ({ from }) => {
      if (from === remoteSocketId) {
        peer.peer.close();
        if (myStream) {
          myStream.getTracks().forEach((track) => track.stop());
          setMyStream(null);
        }
        setRemoteStream(null);
        setRemoteSocketId(null);
      }
    });
    return () => {
      socket.off("call:end");
    };
  }, [remoteSocketId, myStream, socket]);

  useEffect(() => {
    socket.on("call:initiated", ({ from }) => {
      if (from === remoteSocketId) {
        setCallButton(false);
      }
    });
    return () => {
      socket.off("call:initiated");
    };
  }, [socket, remoteSocketId]);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (isAudioMute) {
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach((track) => (track.enabled = false));
    }
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
    setCallButton(false);
    socket.emit("call:initiated", { to: remoteSocketId });
  }, [remoteSocketId, socket, isAudioMute]);

  const handleToggleAudio = () => {
    peer.toggleAudio();
    setIsAudioMute(!isAudioMute);
  };

  const handleEndCall = useCallback(() => {
    peer.peer.close();
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
      setMyStream(null);
    }
    setRemoteStream(null);
    if (remoteSocketId) {
      socket.emit("call:end", { to: remoteSocketId });
    }
    setRemoteSocketId(null);
  }, [myStream, remoteSocketId, socket]);

  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-100 text-black shadow-md">
      <title>Room No. {slug}</title>
      <h1 className="text-4xl mb-5 mt-5 font-semibold flex items-center gap-2">
        Voice Chat{" "}
        <VoiceChatIcon sx={{ fontSize: 40, color: "rgb(150, 100, 255)" }} />
      </h1>
      <h4 className="font-medium text-lg text-gray-500 mb-5">
        {remoteSocketId
          ? "Connected with Remote User"
          : "Waiting for Others to Join"}
        <PersonAddIcon
          sx={{ fontSize: 20, marginLeft: "10px", color: "rgb(200, 150, 250)" }}
        />
      </h4>
      {remoteStream && remoteSocketId && isSendButtonVisible && (
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
          onClick={sendStreams}
        >
          Send Stream
        </button>
      )}
      {remoteSocketId && callButton && (
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 animate-pulse"
          onClick={handleCallUser}
          style={{ display: !remoteStream ? "block" : "none" }}
        >
          Call <CallIcon fontSize="medium" />
        </button>
      )}
      <div className="flex flex-col w-full items-center">
        {myStream && (
          <AudioPlayer
            stream={myStream}
            name="My Stream"
            isAudioMute={isAudioMute}
          />
        )}
        {remoteStream && (
          <AudioPlayer
            stream={remoteStream}
            name="Remote Stream"
            isAudioMute={isAudioMute}
          />
        )}
      </div>
      {myStream && remoteStream && !isSendButtonVisible && (
        <CallHandleButtons
          isAudioMute={isAudioMute}
          onToggleAudio={handleToggleAudio}
          onEndCall={handleEndCall}
          endIcon={
            <ExitToAppIcon sx={{ fontSize: 20, color: "rgb(255, 100, 100)" }} />
          }
        />
      )}
    </div>
  );
};

export default RoomPage;
