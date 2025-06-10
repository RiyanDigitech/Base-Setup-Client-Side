import Cookies from "js-cookie"



const GetTokenToCookie = Cookies.get('token')

export const TokenValue = GetTokenToCookie