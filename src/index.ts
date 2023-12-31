import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { twitterAuthRoute } from "./routes/twitter/twitterAuthRoute";
import { userRoute } from "./routes/userRoute";
import { errorHandler } from "./utils/errorHandler";
import "reflect-metadata";
import { scheduler } from "./utils/scheduler";
import { scheduleTweetRoute } from "./routes/twitter/TweetRoute";
import { decrypt, encrypt } from "./utils/encryption";
import { authRoute } from "./routes/authRoute";
import { accessTokenFromDb } from "./services/twitter/twitterRequestToken";
import { linkedinAuthRoute } from "./routes/linkedin/linkedinAuthRoute";
import { linkedinUserRoute } from "./routes/linkedin/getLnUserInfo";

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

app.use(twitterAuthRoute);
app.use("/v1", userRoute);
app.use("/v1", scheduleTweetRoute);
app.use("/v1", authRoute);
app.use(linkedinAuthRoute);
app.use(linkedinUserRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(new Date().toLocaleTimeString());
});
