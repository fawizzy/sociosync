import { schedule } from "node-cron";

export const scheduler = (name: string) => {
  console.log("scheduling");
  schedule("* * * * *", () => {
    console.log(
      "running a task every minute",
      name + " " + new Date().toLocaleTimeString()
    );
  });
};
