import axios from "axios";
import { API_PATH, USER_AUTH_TOKEN } from "@/lib/constants";
import { UserAccount } from "@/lib/types/main";

const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signUpApi = (userAccount: UserAccount) => {
  return authInstance.post(API_PATH.SIGN_UP, userAccount);
};

export const signInApi = (userAccount: UserAccount) => {
  return authInstance.post(API_PATH.SIGN_IN, userAccount);
};

export const signOutApi = () => {
  localStorage.removeItem(USER_AUTH_TOKEN);
};
