import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const isDev = app.settings.env === "development";
const URL = isDev ? "http://localhost:3000/" : "https://scratch-book.vercel.app/"; // Replace with your actual client app URL
app.use(
  cors({
    origin: URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
const port = process.env.PORT || 5000;
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: URL, // Adjust this to your client app's origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("beginPath", (arg) => {
    //emiting to all the connections
    socket.broadcast.emit("beginPath", arg);
  });
  socket.on("drawLine", (arg) => {
    //emiting to all the connections
    socket.broadcast.emit("drawLine", arg);
  });
  socket.on("changeConfig", (arg) => {
    //emiting to all the connections
    socket.broadcast.emit("changeConfig", arg);
  });
  // ...
});

httpServer.listen(port);
