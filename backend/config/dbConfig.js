import mongoose from "mongoose";
import vars from "./vars.js";
const { connect } = mongoose;

const dbConfig = async () => {
  await connect(vars.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
  });
  console.log("Connected to DB");
};
export default dbConfig;
