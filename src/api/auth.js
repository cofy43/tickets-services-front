import env from "react-dotenv";
const axios = require("axios").default;

export async function login(body) {
  let result;
  let config = {
    url: `${env.REACT_BASE_URL}auth/login`,
    method: "post",    
    data: body,
    withCredentials: true,    
  };
  await axios(config)
    .then(function (response) {
      result = { message: response.data.message, ok: true };
    })
    .catch(function (error) {
      result = { message: error.response.data.message, ok: false };
    });
  return result;
}

export async function logout() {
  let result;
  let config = {
    method: "get",
    url: `${env.REACT_BASE_URL}auth/logout`,
    withCredentials: true,
  };
  await axios(config)
    .then(function (response) {
      result = { message: response.data.message, ok: true };
    })
    .catch(function (err) {
      result = { message: err.response.data.message, ok: false };
    });
  return result;
}
