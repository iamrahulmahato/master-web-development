import ReactPlayer from 'react-player';

const AudioPlayer = ({ stream, isAudioMute, name }) => {
    const myStream = name === "My Stream" ? true : false;
    return (
        <div>
            <div className={`${name === "My Stream" ? "flex flex-col items-center justify-center absolute top-2 right-3 z-10" : "px-2"}`}>
                <h1 className={`text-sm font-poppins font-semibold md:text-xl mb-1 text-center ${myStream ? "mt-1" : "mt-4"}`}>
                    {name}
                </h1>
                <div className={`relative rounded-[30px] overflow-hidden
                 ${myStream ? " mxs:w-[80px] mxs:h-[120px] msm:w-[100px] msm:rounded-md msm:h-[140px] mmd:w-[140px] md:w-[200px] lg:w-[280px]"
                        : "mxs:h-[450px] mss:h-[500px] mmd:h-[600px] md:w-[800px] md:h-[500px]"}`}
                >
                    <ReactPlayer
                        url={stream}
                        playing
                        muted={isAudioMute}
                        height="100%"
                        width="100%"
                        style={{ transform: 'scaleX(-1)' }}
                    />
                </div>
            </div>
        </div>
    )
};

export default AudioPlayer;