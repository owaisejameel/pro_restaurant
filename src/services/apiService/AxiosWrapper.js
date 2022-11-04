import axios from "axios";

export const getAxiosInstance = () => {
  const instance = axios.create({
    headers: {
      "content-type": "application/json",
    },
  });

  return instance;
};
export const getAxiosInstanceMultipart = () => {
  const instance = axios.create({
    headers: {
      "content-type": "multipart/form-data",
    },
  });

  return instance;
};
