import axios from "axios";

export const quickAxios = () => {
  return axios.create({
    baseURL: "http://localhost:5000/api/"
  });
};
