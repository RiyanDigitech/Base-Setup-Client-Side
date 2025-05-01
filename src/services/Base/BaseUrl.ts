import axios from "axios";

export const ThebaseUrl = axios.create({
  // baseURL : "https://js-bot.laravel.cloud/api/v1",  // Old Base URL
  baseURL : "https://js.cybersecure11.com/api/v1/",//  NEW Base URL
  headers: {
      "Content-Type":"application/json",
  }

})

