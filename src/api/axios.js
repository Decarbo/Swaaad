import axios from "axios";

export default axios.create({
  baseURL: "https://swaaad-backend.onrender.com/api",
  withCredentials: true,
});
