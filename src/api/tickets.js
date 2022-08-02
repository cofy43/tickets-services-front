import env from "react-dotenv";
const axios = require('axios').default;

export async function createATicket(body) {
  console.log(env)
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