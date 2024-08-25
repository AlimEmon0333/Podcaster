// import { createSlice } from "@reduxjs/toolkit";
// // Utility function to format the path
// const formatPath = (path) => path.replace(/\\/g, "/");
// const playeSilce = createSlice({
//   name: "player",
//   initialState: { isPlayerDiv: false, songPath: "", img: "" },
//   reducers: {
//     setDiv(state) {
//       state.isPlayerDiv = true;
//       console.log("setDiv Action: ", state.isPlayerDiv);
//     },
//     closeDiv(state) {
//       state.isPlayerDiv = false;
//       console.log("closeDiv Action: ", state.isPlayerDiv);
//     },
//     changeSong(state, action) {
//       const pathOfSong = formatPath(action.payload);
//       state.songPath = pathOfSong;
//     },
//     changeImage(state, action) {
//       const imgOfSong = formatPath(action.payload);
//       state.img = imgOfSong;
//     }
//   }
// });
// export const playerActions = playeSilce.actions;
// export default playeSilce.reducer;
import { createSlice } from "@reduxjs/toolkit";

const playeSilce = createSlice({
  name: "player",
  initialState: { isPlayerDiv: false, songPath: "", img: "" },
  reducers: {
    setDiv(state) {
      state.isPlayerDiv = true;
      console.log("setDiv Action: ", state.isPlayerDiv);
    },
    closeDiv(state) {
      state.isPlayerDiv = false;
      console.log("closeDiv Action: ", state.isPlayerDiv);
    },
    changeSong(state, action) {
      state.songPath = action.payload; // No need for formatPath here
    },
    changeImage(state, action) {
      state.img = action.payload; // No need for formatPath here
    }
  }
});

export const playerActions = playeSilce.actions;
export default playeSilce.reducer;
