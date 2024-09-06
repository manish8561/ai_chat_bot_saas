import axios from "axios";
import {
  UNABLE_TO_GET_USER_STATUS,
  UNABLE_TO_LOGIN,
  UNABLE_TO_REGISTER,
  UNABLE_TO_SEND_CHAT,
  UNABLE_TO_GET_CHAT,
  UNABLE_TO_DELETE_CHAT,
  UNABLE_TO_LOGOUT_USER,
} from "../constant";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("auth/login", { email, password });

  if (res.status !== 200) {
    throw new Error(UNABLE_TO_LOGIN);
  }
  return res.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("auth/register", { name, email, password });

  if (res.status !== 201) {
    throw new Error(UNABLE_TO_REGISTER);
  }
  return res.data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("auth/auth-status");

  if (res.status !== 200) {
    throw new Error(UNABLE_TO_GET_USER_STATUS);
  }
  return res.data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("chats", { message });
  if (res.status !== 201) {
    throw new Error(UNABLE_TO_SEND_CHAT);
  }
  return await res.data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chats");
  if (res.status !== 200) {
    throw new Error(UNABLE_TO_GET_CHAT);
  }
  return await res.data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chats");
  if (res.status !== 200) {
    throw new Error(UNABLE_TO_DELETE_CHAT);
  }
  return await res.data;
};

export const logoutUser = async () => {
  const res = await axios.get("auth/logout");
  if (res.status !== 200) {
    throw new Error(UNABLE_TO_LOGOUT_USER);
  }
  const data = await res.data;
  return data;
};
