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
    console.log(response)
    result = {message: response.data.message, ok: true};
  })
  .catch(function (error) {
    console.log(error)
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
