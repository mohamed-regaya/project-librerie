import express from "express";
import productRouter from "./routes/productsRoutes.js";
import namesRouter from "./routes/namesRoutes.js";
import voituresRouter from "./routes/voitureRoutes.js";
import authRouter from "./routes/authRoutes.js";
import salesRouter from "./routes/salesRoutes.js";
import odersRoutes from "./routes/orderRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const server = express();
server.use("/uploads", express.static("uploads"));
server.use(cors());
server.use(express.json());

server.use("/products", productRouter);
server.use("/sales", salesRouter);
server.use("/orders", odersRoutes);
server.use("/names", namesRouter);
server.use("/voitures", voituresRouter);
server.use("/auth", authRouter);

server.use("/uploads", express.static(path.join(__dirname, "uploads")));

export default server;
