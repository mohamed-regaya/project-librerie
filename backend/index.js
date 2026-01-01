import express from "express";
import fruitRouter from "./routes/fruitsRoutes.js";
import namesRouter from "./routes/namesRoutes.js";
import voituresRouter from "./routes/voitureRoutes.js";
//import mongoose
import mongoose from "mongoose"; // ODM driver lel database
import authRouter from "./routes/authRoutes.js";
//path ==> chemin , tri9
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let server = express();
dotenv.config();
server.use(express.json());

server.use("/fruits", fruitRouter); // ajout de prefix
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

server.listen(process.env.PORT, () => {
  console.log("serveur en marche !");
});

// localhost:8000 ==+> 1-/fruits 2/ names / voitures
