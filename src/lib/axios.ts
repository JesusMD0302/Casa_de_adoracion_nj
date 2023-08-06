import axios from "axios";

const URL = process.env.URL;

export default axios.create({
  baseURL: `${URL}/api`,
  timeout: 5000,
});
