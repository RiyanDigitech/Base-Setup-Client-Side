import axios from "axios";

export const ThebaseUrl = axios.create({

  baseURL : "https://js-bot.laravel.cloud/api/v1",
  headers: {
      "Content-Type":"application/json",
  }

})

