import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { useExpressServer } from "routing-controllers";
import { CourtAvailabilityController } from "./controller/CourtAvailabilityController";
import { AgentController } from "./controller/AgentController";
import { createServer } from "http";
import { Server } from "socket.io";
import { registerSockets } from "./socket";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5174" }));

useExpressServer(app, {
  controllers: [CourtAvailabilityController, AgentController],
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5174", methods: ["GET", "POST"] },
});

registerSockets(io);

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
