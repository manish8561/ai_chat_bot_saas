import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("auth/login", { email, password });

  if (res.status !== 200) {
    throw new Error("Unable to login");
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
    throw new Error("Unable to register");
  }
  return res.data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("auth/auth-status");

  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  return res.data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("chats", { message });
  if (res.status !== 201) {
    throw new Error("Unable to send chat");
  }
  return await res.data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  return await res.data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chats");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  return await res.data;
};

export const logoutUser = async () => {
  const res = await axios.get("auth/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};
