//importing the dependencies
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDB");

// configuration of env file
dotenv.config();

//importing all the routes
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//connection to mongodb database
connectDb();

//creating the rest object
const app = express();

//adding middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//adding routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blogs", blogRoutes);

const PORT = process.env.PORT || 8080;
//listening to the port
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
