import express from "express";
import routes from "./api/v1/index.js";
import config from "./config/index.js";
import vars from "./config/vars.js";

const startServer = async () => {
  const app = express();
  await config(app);
  app.use(vars.api.prefix, routes());
  app.listen(vars.port, () => console.log(`Listening on port ${vars.port}`));
};
startServer();
