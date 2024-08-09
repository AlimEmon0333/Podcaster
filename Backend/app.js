const cors = require("cors")
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userApi = require("./routes/user.js"); 
const catApi = require("./routes/categories.js"); 
const podcastApi = require("./routes/podcasts.js"); 

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
require("dotenv").config();
require("./connection/mongo_connection.js");
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/v1", userApi);
app.use("/api/v1", catApi);
app.use("/api/v1", podcastApi);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});
