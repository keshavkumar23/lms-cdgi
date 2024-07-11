// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const messageRoutes = require("./routes/Message");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const initializeVideoMeetSocket = require("./socket/videoMeetSocket");
const {initializeChatSocket} = require("./socket/chatSocket");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use(express.static("public"));

// Connecting to cloudinary
cloudinaryConnect();

// Setting up HTTP server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Initializing socket servers
initializeVideoMeetSocket(server);
initializeChatSocket(server);

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/message", messageRoutes)

// Testing the server
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is up and running...",
    });
});
