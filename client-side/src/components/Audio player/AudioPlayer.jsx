// import React, { useEffect, useRef, useState } from "react";
// import { FaPlay } from "react-icons/fa";
// import { IoPlaySkipBack } from "react-icons/io5";
// import { IoPlaySkipForward } from "react-icons/io5";
// import { ImCross } from "react-icons/im";
// import { FaPause } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { playerActions } from "../../store/Player";

// const AudioPlayer = () => {
//   const [isPlaySong, setisPlaySong] = useState(false);
//   const dispatch = useDispatch();
//   const playerDivSstate = useSelector((state) => state.player.isPlayerDiv);
//   const songPath = useSelector((state) => state.player.songPath);
//   const img = useSelector((state) => state.player.img);
//   const audioRef = useRef();
//   const duration = audioRef.current.duration;
//   const closeAudioPlayer = (e) => {
//     e.preventDefault();
//     dispatch(playerActions.closeDiv());
//     dispatch(playerActions.changeImage(``));
//     dispatch(playerActions.changeSong(``));
//     setisPlaySong(false);
//   };
//   const handlePlayPodcast = () => {
//     setisPlaySong(!isPlaySong);
//     if (isPlaySong) {
//       audioRef.current.play();
//     } else {
//       audioRef.current.pause();
//     }
//   };
//   useEffect(() => {
//     handlePlayPodcast();
//   }, [songPath]);
//   return (
//     <div
//       className={`${
//         playerDivSstate ? "fixed" : "hidden"
//       }  bottom-0 left-0  w-[100%] bg-zinc-900 text-zinc-200 px-4 py-5 flex items-center gap-4`}
//     >
//       <div className="hidden md:block w-1/3">
//         <img src={img} className={`size-12 rounded-full object-cover`} alt="" />
//       </div>
//       <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
//         <div className="w-full flex items-center justify-center  gap-4 text-xl">
//           <button>
//             <IoPlaySkipBack />
//           </button>
//           <button onClick={handlePlayPodcast}>
//             {isPlaySong ? <FaPlay /> : <FaPause />}
//           </button>
//           <button>
//             <IoPlaySkipForward />
//           </button>
//         </div>
//         <div className="w-full flex justify-center items-center mt-3 ">
//           <input
//             type="range"
//             min={"0"}
//             max={"100"}
//             className="w-full cursor-pointer"
//           />
//         </div>
//         <div className="w-full flex items-center justify-between text-sm">
//           <span>0:00</span>
//           <span>3:00</span>
//         </div>
//       </div>
//       <div className="w-1/3 flex items-center justify-end">
//         <button>
//           <ImCross onClick={closeAudioPlayer} />
//         </button>
//       </div>
//       <audio ref={audioRef} src={songPath} />
//     </div>
//   );
// };

// export default AudioPlayer;
// import React, { useEffect, useRef, useState } from "react";
// import { FaPlay, FaPause } from "react-icons/fa";
// import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
// import { ImCross } from "react-icons/im";
// import { useDispatch, useSelector } from "react-redux";
// import { playerActions } from "../../store/Player";

// const AudioPlayer = () => {
//   const [isPlaySong, setIsPlaySong] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const dispatch = useDispatch();
//   const playerDivState = useSelector((state) => state.player.isPlayerDiv);
//   const songPath = useSelector((state) => state.player.songPath);
//   const img = useSelector((state) => state.player.img);
//   const audioRef = useRef(null);

//   const closeAudioPlayer = (e) => {
//     e.preventDefault();
//     dispatch(playerActions.closeDiv());
//     dispatch(playerActions.changeImage(""));
//     dispatch(playerActions.changeSong(""));
//     setIsPlaySong(false);
//   };

//   const handlePlayPodcast = () => {
//     setIsPlaySong(!isPlaySong);
//   };

//   useEffect(() => {
//     const audioElement = audioRef.current;

//     if (audioElement) {
//       const handleLoadedMetadata = () => {
//         setDuration(audioElement.duration);
//       };

//       // Add event listener
//       audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

//       // Clean up event listener
//       return () => {
//         audioElement.removeEventListener(
//           "loadedmetadata",
//           handleLoadedMetadata
//         );
//       };
//     }
//   }, [songPath]);

//   useEffect(() => {
//     if (audioRef.current) {
//       if (isPlaySong) {
// //         audioRef.current.play();
// //       } else {
// //         audioRef.current.pause();
// //       }
// //     }
// //   }, [isPlaySong]);

// //   return (
// //     <div
// //       className={`${
// //         playerDivState ? "fixed" : "hidden"
// //       } bottom-0 left-0 w-[100%] bg-zinc-900 text-zinc-200 px-4 py-5 flex items-center gap-4`}
// //     >
// //       <div className="hidden md:block w-1/3">
// //         <img src={img} className="size-12 rounded-full object-cover" alt="" />
// //       </div>
// //       <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
// //         <div className="w-full flex items-center justify-center gap-4 text-xl">
// //           <button>
// //             <IoPlaySkipBack />
// //           </button>
// //           <button onClick={handlePlayPodcast}>
// //             {isPlaySong ? <FaPause /> : <FaPlay />}
// //           </button>
// //           <button>
// //             <IoPlaySkipForward />
// //           </button>
// //         </div>
// //         <div className="w-full flex justify-center items-center mt-3">
// //           <input
// //             type="range"
// //             min="0"
// //             max={duration}
// //             className="w-full cursor-pointer"
// //             // Add onChange handler to update currentTime if needed
// //           />
// //         </div>
// //         <div className="w-full flex items-center justify-between text-sm">
// //           <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
// //           <span>{formatTime(duration)}</span>
// //         </div>
// //       </div>
// //       <div className="w-1/3 flex items-center justify-end">
// //         <button onClick={closeAudioPlayer}>
// //           <ImCross />
// //         </button>
// //       </div>
// //       <audio ref={audioRef} src={songPath} />
// //     </div>
// //   );
// // };

// // // Helper function to format time in mm:ss
// // const formatTime = (time) => {
// //   const minutes = Math.floor(time / 60);
// //   const seconds = Math.floor(time % 60);
// //   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
// // };

// // export default AudioPlayer;
// import React, { useEffect, useRef, useState } from "react";
// import { FaPlay, FaPause } from "react-icons/fa";
// import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
// import { ImCross } from "react-icons/im";
// import { useDispatch, useSelector } from "react-redux";
// import { playerActions } from "../../store/Player";

// const AudioPlayer = () => {
//   const [isPlaySong, setIsPlaySong] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const dispatch = useDispatch();
//   const playerDivState = useSelector((state) => state.player.isPlayerDiv);
//   const songPath = useSelector((state) => state.player.songPath);
//   const img = useSelector((state) => state.player.img);
//   const audioRef = useRef(null);

//   const closeAudioPlayer = (e) => {
//     e.preventDefault();
//     dispatch(playerActions.closeDiv());
//     dispatch(playerActions.changeImage(""));
//     dispatch(playerActions.changeSong(""));
//     setIsPlaySong(false);
//   };

//   const handlePlayPodcast = () => {
//     setIsPlaySong(!isPlaySong);
//   };

//   useEffect(() => {
//     const audioElement = audioRef.current;

//     if (audioElement) {
//       const handleLoadedMetadata = () => {
//         setDuration(audioElement.duration);
//       };

//       const handleTimeUpdate = () => {
//         setCurrentTime(audioElement.currentTime);
//       };

//       audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
//       audioElement.addEventListener("timeupdate", handleTimeUpdate);

//       // Clean up event listeners
//       return () => {
//         audioElement.removeEventListener(
//           "loadedmetadata",
//           handleLoadedMetadata
//         );
//         audioElement.removeEventListener("timeupdate", handleTimeUpdate);
//       };
//     }
//   }, [songPath]);

//   useEffect(() => {
//     if (audioRef.current) {
//       if (isPlaySong) {
//         audioRef.current.play();
//       } else {
//         audioRef.current.pause();
//       }
//     }
//   }, [isPlaySong]);

//   const handleRangeChange = (e) => {
//     const newTime = e.target.value;
//     setCurrentTime(newTime);
//     if (audioRef.current) {
//       audioRef.current.currentTime = newTime;
//     }
//   };

//   return (
//     <div
//       className={`${
//         playerDivState ? "fixed" : "hidden"
//       } bottom-0 left-0 w-[100%] bg-zinc-900 text-zinc-200 px-4 py-5 flex items-center gap-4`}
//     >
//       <div className="hidden md:block w-1/3">
//         <img src={img} className="size-12 rounded-full object-cover" alt="" />
//       </div>
//       <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
//         <div className="w-full flex items-center justify-center gap-4 text-xl">
//           <button>
//             <IoPlaySkipBack />
//           </button>
//           <button onClick={handlePlayPodcast}>
//             {isPlaySong ? <FaPause /> : <FaPlay />}
//           </button>
//           <button>
//             <IoPlaySkipForward />
//           </button>
//         </div>
//         <div className="w-full flex justify-center items-center mt-3">
//           <input
//             type="range"
//             min="0"
//             max={duration || 0}
//             value={currentTime}
//             onChange={handleRangeChange}
//             className="w-full cursor-pointer"
//           />
//         </div>
//         <div className="w-full flex items-center justify-between text-sm">
//           <span>{formatTime(currentTime)}</span>
//           <span>{formatTime(duration)}</span>
//         </div>
//       </div>
//       <div className="w-1/3 flex items-center justify-end">
//         <button onClick={closeAudioPlayer}>
//           <ImCross />
//         </button>
//       </div>
//       <audio ref={audioRef} src={songPath} />
//     </div>
//   );
// };

// // Helper function to format time in mm:ss
// const formatTime = (time) => {
//   const minutes = Math.floor(time / 60);
//   const seconds = Math.floor(time % 60);
//   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
// };

// export default AudioPlayer;
import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/Player";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useDispatch();
  const playerDivState = useSelector((state) => state.player.isPlayerDiv);
  const songPath = useSelector((state) => state.player.songPath);
  const img = useSelector((state) => state.player.img);
  const audioRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const handleLoadedMetadata = () => setDuration(audioElement.duration);
      const handleTimeUpdate = () => setCurrentTime(audioElement.currentTime);

      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [songPath]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const handleRangeChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const closeAudioPlayer = (e) => {
    e.preventDefault();
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeImage(""));
    dispatch(playerActions.changeSong(""));
    setIsPlaying(false);
  };

  return (
    <div
      className={`${
        playerDivState ? "fixed" : "hidden"
      } bottom-0 left-0 w-[100%] bg-zinc-900 text-zinc-200 px-4 py-5 flex items-center gap-4`}
    >
      <div className="hidden md:block w-1/3">
        <img src={img} className="size-12 rounded-full object-cover" alt="" />
      </div>
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center gap-4 text-xl">
          <button onClick={handleBackward}>
            <IoPlaySkipBack />
          </button>
          <button onClick={handlePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handleForward}>
            <IoPlaySkipForward />
          </button>
        </div>
        <div className="w-full flex justify-center items-center mt-3">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleRangeChange}
            className="w-full cursor-pointer"
          />
        </div>
        <div className="w-full flex items-center justify-between text-sm">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="w-1/3 flex items-center justify-end">
        <button onClick={closeAudioPlayer}>
          <ImCross />
        </button>
      </div>
      <audio ref={audioRef} src={songPath} />
    </div>
  );
};

// Helper function to format time in mm:ss
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default AudioPlayer;
