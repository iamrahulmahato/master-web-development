class PeerService {
    constructor() {
        if (typeof window !== 'undefined' && !this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [{
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ]
                }]
            })
        }
    }

    setLocalDescription = async (ans) => {
        if (this.peer) {
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
    }

    getAnswer = async (offer) => {
        if (this.peer) {
            await this.peer.setRemoteDescription(offer);
            const ans = await this.peer.createAnswer();
            await this.peer.setLocalDescription(new RTCSessionDescription(ans));
            return ans;
        }
    }

    getOffer = async () => {
        if (this.peer) {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(new RTCSessionDescription(offer));
            return offer;
        }
    }

    toggleAudio = () => {
        const audioTracks = this.peer.getSenders().find(sender => sender.track.kind === 'audio').track;
        audioTracks.enabled = !audioTracks.enabled;

        // Mute the local audio track
        const localAudioTrack = this.peer.getLocalStreams()[0].getAudioTracks()[0];
        localAudioTrack.enabled = !localAudioTrack.enabled;
    };
}

export default new PeerService();