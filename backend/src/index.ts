import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { CourtAvailabilityController } from "./controller/CourtAvailabilityController";

const app = express();
const PORT = process.env.PORT || 3000;

useExpressServer(app, {
  controllers: [CourtAvailabilityController],
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
