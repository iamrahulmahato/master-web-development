"use client";

import { useSocket } from "@/context/SocketContext";
import VideoContainer from "./VideoContainer";
import { useCallback, useEffect, useState } from "react";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";

function VideoCall() {
  const { localStream, peer, onGoingCall, handleHangUp, isCallEnded } =
    useSocket();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVidOn, setIsVidOn] = useState(true);

  useEffect(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      const audioTrack = localStream.getAudioTracks()[0];
      setIsVidOn(videoTrack.enabled);
      setIsMicOn(audioTrack.enabled);
    }
  }, [localStream]);

  const toggleCamera = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVidOn(videoTrack.enabled);
    }
  }, [localStream]);

  const toggleMic = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  }, [localStream]);

  const isOnCall = localStream && peer && onGoingCall ? true : false;

  if (isCallEnded) {
    return <div className="mt-5 text-rose-500 text-center">Call Ended</div>;
  }

  if(!localStream && !peer) return;

  return (
    <div>
      <div className="mt-4 relative max-w-[800px] mx-auto">
        {localStream && (
          <VideoContainer
            stream={localStream}
            isLocalStream={true}
            isOnCall={isOnCall}
          />
        )}

        {peer && peer.stream && (
          <VideoContainer
            stream={peer.stream}
            isLocalStream={false}
            isOnCall={isOnCall}
          />
        )}
      </div>
      <div className="mt-8 flex items-center justify-center">
        <button onClick={toggleMic}>
          {isMicOn && <MdMicOff size={28} />}
          {!isMicOn && <MdMic size={28} />}
        </button>
        <button
          className="px-4 py-2 bg-rose-500 text-white rounded mx-4"
          onClick={() =>
            handleHangUp({
              onGoingCall: onGoingCall ? onGoingCall : undefined,
              isEmitHangup: true,
            })
          }
        >
          End Call
        </button>
        <button onClick={toggleCamera}>
          {isVidOn && <MdVideocam size={28} />}
          {!isVidOn && <MdVideocamOff size={28} />}
        </button>
      </div>
    </div>
  );
}

export default VideoCall;
