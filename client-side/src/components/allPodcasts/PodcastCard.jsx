// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { playerActions } from "../../store/Player";

// const PodcastCard = ({ item }) => {
//   console.log("item: ", item.frontImage, item.audioFile);
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const handlePlay = (e) => {
//     if (isLoggedIn) {
//       e.preventDefault();
//       dispatch(playerActions.setDiv());
//       dispatch(
//         playerActions.changeImage(
//           `http://localhost:2000/${item.frontImage}`
//         )
//       );
//       dispatch(
//         playerActions.changeSong(
//           `http://localhost:2000/${item.audioFile}`
//         )
//       );
//     }
//   };
//   return (
//     <div>
//       <Link
//         to={`/description/${item._id}`}
//         className="border p-1 rounded flex flex-col shadow-lg transition-all duration-200 hover:shadow-xl"
//       >
//         <div>
//           <img
//             src={`http://localhost:2000/${item.frontImage}`}
//             className="object-contain rounded-xl"
//             alt="thumbnail"
//           />
//         </div>
//         <div className="mt-4 text-xl font-bold">
//           {item.title.slice(0, 20)}...
//         </div>
//         <div className="mt-2 leading-5 text-slate-500">
//           {item.description.slice(0, 50)}...
//         </div>
//         <div className="mt-2 bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center">
//           {item.category.categoryName}
//         </div>
//         <div className="mt-2">
//           <Link
//             to={isLoggedIn ? "#" : "/login"}
//             className="bg-green-900 text-white px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-green-800 transition-all duration-300"
//             onClick={handlePlay}
//           >
//             Play Now
//           </Link>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default PodcastCard;
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../../store/Player";

// Utility function to format the path
const formatPath = (path) => path.replace(/\\/g, "/");

const PodcastCard = ({ item }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Format the paths
  const formattedImagePath = formatPath(item.frontImage);
  const formattedAudioPath = formatPath(item.audioFile);
console.log("formattedImagePath:", formattedImagePath);
console.log("formattedAudioPath: ", formattedAudioPath);
  const handlePlay = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      dispatch(playerActions.setDiv());
      dispatch(
        playerActions.changeImage(
          `http://localhost:2000/${formattedImagePath}`
        )
      );
      dispatch(
        playerActions.changeSong(`http://localhost:2000/${formattedAudioPath}`)
      );
    }
  };

  return (
    <div>
      <Link
        to={`/description/${item._id}`}
        className="border p-1 rounded flex flex-col shadow-lg transition-all duration-200 hover:shadow-xl"
      >
        <div>
          <img
            src={`http://localhost:2000/${formattedImagePath}`}
            className="object-contain rounded-xl"
            alt="thumbnail"
          />
        </div>
        <div className="mt-4 text-xl font-bold">
          {item.title.slice(0, 20)}...
        </div>
        <div className="mt-2 leading-5 text-slate-500">
          {item.description.slice(0, 50)}...
        </div>
        <div className="mt-2 bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center">
          {item.category.categoryName}
        </div>
        <div className="mt-2">
          <Link
            to={isLoggedIn ? "#" : "/login"}
            className="bg-green-900 text-white px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-green-800 transition-all duration-300"
            onClick={handlePlay}
          >
            Play Now
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default PodcastCard;
