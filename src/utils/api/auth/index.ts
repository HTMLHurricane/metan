import { axiosInstance } from "@/utils/config/axiosInstance";
import {
  IAuthDetailPost,
  IAuthDetailResponseData,
  ILoginCredentials,
  ILoginResponseData,
  IVerifyPost,
  IVerifyResponseData,
} from "./types";

export async function login(body: ILoginCredentials) {
  try {
    const res = await axiosInstance.post<ILoginResponseData>(
      "user/auth/",
      body
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Произошла ошибка при отправке номера телефона. Попробуйте еще раз"
    );
  }
}

export async function verify(body: IVerifyPost) {
  try {
    const res = await axiosInstance.post<IVerifyResponseData>(
      "user/auth/verify/",
      body
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Произошла ошибка при верификации. Попробуйте еще раз");
  }
}

export async function authDetail(body: IAuthDetailPost) {
  try {
    const res = await axiosInstance.put<IAuthDetailResponseData>(
      "user/auth/details/",
      body
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Произошла ошибка при регистрации. Попробуйте еще раз");
  }
}
