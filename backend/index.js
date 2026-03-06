import express from "express";
import productRouter from "./routes/productsRoutes.js";
import namesRouter from "./routes/namesRoutes.js";
import voituresRouter from "./routes/voitureRoutes.js";
//import mongoose
import mongoose from "mongoose"; // ODM driver lel database
import authRouter from "./routes/authRoutes.js";
import salesRouter from "./routes/salesRoutes.js";
import odersRoutes from "./routes/orderRoutes.js";
import http from "http";
//path ==> chemin , tri9
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let server = express();
server.use(cors());
dotenv.config();
server.use(express.json());
// partie configuration de socket io -----

let app = http.createServer(server);
const io = new Server(app, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  //client joint room mte3ou
  socket.on("join_user", (userId) => {
    socket.join(userId);
    console.log("client connecté", userId);
  });
  //admin joint admin room
  socket.on("join_admin", () => {
    socket.join("admin");
  });
  // client yab3eth msg lel admin
  socket.on("client_send_message", (data) => {
    console.log(data);
    io.to("admin").emit("admin_recieve_message", data);
  });
  //admin yjaweb client
  socket.on("admin_send_message", (data) => {
    io.to(data.userId).emit("client_recieve_message", data);
    console.log(data);
  });
  socket.on("disconnected", () => {
    console.log("disconnected");
  });
});

//////////////////////////////////////////

server.use("/products", productRouter); // ajout de prefix
server.use("/sales", salesRouter); // ajout de prefix
server.use("/orders", odersRoutes);
server.use("/names", namesRouter);
server.use("/voitures", voituresRouter);
server.use("/auth", authRouter);
//connection a la base de donnees

server.use("/uploads", express.static(path.join(__dirname, "uploads")));
//localhost:8000/uploads/couscous.jpg
mongoose
  .connect(process.env.MONGODB_URL) //mongodb://localhost:27017/ ==> addresse du serveur base de donees
  .then(() => {
    console.log("base de donnees connecté avec succes !");
  })
  .catch(() => {
    console.log("une erreur est survenue");
  });

app.listen(process.env.PORT, () => {
  console.log("serveur en marche !");
});

// localhost:8000 ==+> 1-/fruits 2/ names / voitures
