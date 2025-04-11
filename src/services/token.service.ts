import Cookies from "js-cookie";
import {
  cookieAuth,
  cookieData,
  cookieRefresh,
  tokenRetries,
} from "@/lib/cookies";
import { UserType } from "@/lib/types/user";
import { jwtDecode } from "jwt-decode";
import { userDataType } from "@/lib/types/auth";
class TokenService {
  getLocalAccessToken = () => {
    return Cookies.get(cookieAuth);
  };
  saveLocalAccessToken = (token: string) => {
    Cookies.set(cookieAuth, token, { sameSite: "strict" });
  };
  getLocalRefreshToken = () => {
    return Cookies.get(cookieRefresh);
  };
  saveLocalRefreshToken = (token: string) => {
    Cookies.set(cookieRefresh, token);
  };
  getUser = (): null | string => {
    return JSON.parse(localStorage.getItem(cookieData)!);
  };
  setUser = (user: string) => {
    localStorage.setItem(cookieData, JSON.stringify(user));
  };
  updateUser = <T extends keyof UserType>(key: T, value: UserType[T]) => {
    const userObject = this.getUser();
    if (userObject) {
      userObject[key] = value;
      this.setUser(userObject);
    } else {
      throw new Error("Error");
    }
  };
  setTokenRetries = (retries: number) => {
    localStorage.setItem(tokenRetries, retries.toString());
  };
  getTokenRetries = () => {
    return parseInt(localStorage.getItem(tokenRetries)!);
  };
  getUserRoleFromCookie = (): string | null => {
    // Cookie se 'session-admin' token ko retrieve kare
    const token = Cookies.get(cookieAuth);

    if (!token) {
      console.error("Token not found in cookies.");
      return null;
    }

    try {
      // Token ko decode kare aur role extract kare
      const decodedToken = jwtDecode<{ role: string }>(token);
      return decodedToken.role || "Role not found";
    } catch (error: unknown) {
      // Catch block handle karte hain
      if (error instanceof Error) {
        console.error("Invalid token:", error.message);
      } else {
        console.error("An unknown error occurred.");
      }
      return null;
    }
  };
  setLastUserData = (userObject: userDataType) => {
    localStorage.setItem("lastPersonData", JSON.stringify(userObject));
  };
  getLastUserData = () => {
    const storedUser = localStorage.getItem("lastPersonData");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };
  clearStorage = () => {
    localStorage.clear();
    Cookies.remove(cookieAuth);
    Cookies.remove(cookieData);
  };
}
export default new TokenService();
