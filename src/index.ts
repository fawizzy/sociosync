import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { twitterAuthRoute } from "./routes/twitterAuthRoute";
import { userRoute } from "./routes/userRoute";
import { errorHandler } from "./utils/errorHandler";
import "reflect-metadata";
import { scheduler } from "./utils/scheduler";
import { scheduleTweetRoute } from "./routes/scheduleTweetRoute";

const app = express();
const port = 5000;

app.use(express.json());
AppDataSource.initialize()
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(errorHandler);

app.use("/v1", twitterAuthRoute);
app.use("/v1", userRoute);
app.use("/v1", scheduleTweetRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(new Date().toLocaleTimeString());
});
