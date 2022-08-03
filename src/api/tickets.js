import env from "react-dotenv";
const axios = require('axios').default;

export async function createATicket(body) {
  let result;  
  let config = {
      method: 'post',
      url: `${env.REACT_BASE_URL}tickets/`,
      data: body
  }    
  await axios(config)
  .then(function (response) {
    result = {message: response.data.message, ok: true};
  })
  .catch(function (error) {
    result = {message: error.message, ok: false};
  });
  return result;
}

export async function searchTicket(query) {
  let result;
  let config = {
    method: 'get',
    url: `${env.REACT_BASE_URL}tickets/info?${query}`,
  }

  await axios(config)
    .then((response) => {
      result = {data: response.data, ok: true}
    }).catch((err) => {      
      result = {message: err.response.data.message, ok: false}
    });

  return result;
}

export async function getDetail(id) {
  let result;let config = {
    method: 'get',
    url: `${env.REACT_BASE_URL}tickets/detail/${id}`,
    withCredentials: true,
  }

  await axios(config)
    .then((response) => {
      result = {data: response.data, ok: true}
    }).catch((err) => {      
      result = {message: err.response.data.message, ok: false}
    });

  return result;
}

export async function updateTicket(id, newTicketData) {
  let result;
  let config = {
    method: 'put',
    url: `${env.REACT_BASE_URL}tickets/update/${id}`,
    data: newTicketData,
    withCredentials: true,
  }

  await axios(config)
    .then((response) => {
      result = {message: response.data.message, ok: true}
    }).catch((err) => {      
      result = {message: err.response.data.message, ok: false}
    });

  return result;
}