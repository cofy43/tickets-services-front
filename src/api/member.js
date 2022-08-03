import env from "react-dotenv";
const axios = require("axios").default;

export async function pendingTickets() {
  let result;
  let config = {
    method: "get",
    url: `${env.REACT_BASE_URL}tickets/todo`,
    withCredentials: true,
  };
  await axios(config)
    .then(function (response) {
      result = { data: response.data, ok: true };
    })
    .catch(function (error) {
      result = { message: error.message, ok: false };
    });
  return result;
}

export async function completedTickets() {
  let result;
  let config = {
    method: "get",
    url: `${env.REACT_BASE_URL}tickets/completed`,
    withCredentials: true,
  };
  await axios(config)
    .then(function (response) {
      result = { data: response.data, ok: true };
    })
    .catch(function (error) {
      result = { message: error.message, ok: false };
    });
  return result;
}

export async function getInfo() {
  let result;
  let config = {
    method: "get",
    url: `${env.REACT_BASE_URL}member/`,
    withCredentials: true,
  };
  await axios(config)
    .then(function (response) {
      result = { data: response.data, ok: true };
    })
    .catch(function (error) {
      result = { message: error.message, ok: false };
    });
  return result;
}
