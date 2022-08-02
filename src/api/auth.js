import env from "react-dotenv";
const axios = require("axios").default;

export async function login(body) {
  let result;
  let config = {
    method: "post",
    url: `${env.REACT_BASE_URL}auth/login`,
    data: body,
    withCredentials: true,
  };
  await axios(config)
    .then(function (response) {
      console.log(response);
      result = { message: response.data.message, ok: true };
    })
    .catch(function (error) {
      console.log(error);
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
      console.log(response);
      result = { message: response.data.message, ok: true };
    })
    .catch(function (err) {
      console.log(err);
      result = { message: err.response.data.message, ok: false };
    });
  return result;
}
