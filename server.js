const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/user");
const uploadPhoto = require("./routes/upload");

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//routes
// readdirSnc("./routes").map((r) => app.use("/", require("./routes/" + r)));
app.use("/api/users", userRoute);
// app.use("/api/post", uploadPost);
app.use("/api/photoupload", uploadPhoto);
// app.use("/api/react", postReact);

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
