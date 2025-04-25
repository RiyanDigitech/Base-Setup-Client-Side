import Cookies from "js-cookie";




const GetTokenToCookie = Cookies.get('auth-token')
export const TokenValue = GetTokenToCookie