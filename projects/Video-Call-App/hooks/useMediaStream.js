import {useState, useEffect, useRef} from 'react'


const useMediaStream = () => {
    const [state, setState] = useState(null)
    const isStreamSet = useRef(false)

    useEffect(() => {
        if (isStreamSet.current) return;
        isStreamSet.current = true;
        (async function initStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true
                })
                console.log("setting your stream")
                setState(stream)
            } catch (e) {
                console.log("Error in media navigator", e)
            }
        })()
    }, [])

    return {
        stream: state
    }
}

export default useMediaStream