import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(
  cors({
    origin: "http://localhost:3000/", // Replace with your actual client app URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
const port = process.env.PORT || 5000;
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Adjust this to your client app's origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("server connected");
  // ...
});

httpServer.listen(port);
