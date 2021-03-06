import axios from "axios";

//method 1
//NODE_ENV is set by the system itself
// use it to change base url from absolute in dev to relative in prod
const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : "http://localhost:5000";

//method 2
//use proxy in frontend package.json

const instance = axios.create({
  baseURL,
});
export default instance;
