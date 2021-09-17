const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// NPM
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// ROUTER
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

// APP.USE
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

// CONNECT DB
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.sntxr.mongodb.net/mern-learnit?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Mongodb connected`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
