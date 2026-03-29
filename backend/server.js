import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import server from "./app.js";

dotenv.config();

const app = http.createServer(server);

const io = new Server(app, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_user", (userId) => {
    socket.join(userId);
  });

  socket.on("join_admin", () => {
    socket.join("admin");
  });

  socket.on("client_send_message", (data) => {
    io.to("admin").emit("admin_recieve_message", data);
  });

  socket.on("admin_send_message", (data) => {
    io.to(data.userId).emit("client_recieve_message", data);
  });
});

mongoose
  .connect(process.env.MONGODB_URL)

  .then(() => console.log("DB connected"))
  .catch(() => console.log("DB error"));

app.listen(process.env.PORT, () => {
  console.log("server running");
});
