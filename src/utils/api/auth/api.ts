import { useMutation } from "react-query";
import { authDetail, login, verify } from ".";
import {
  IAuthDetailPost,
  IAuthDetailResponseData,
  ILoginCredentials,
  ILoginResponseData,
  IVerifyPost,
  IVerifyResponseData,
} from "./types";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth/slice";

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation<ILoginResponseData, any, ILoginCredentials>(login, {
    onSuccess: () => {
      navigate("/auth_verify");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useVerifyMutation = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  return useMutation<IVerifyResponseData, any, IVerifyPost>(verify, {
    onSuccess: (data) => {
      const { access, refresh } = data.data;
      login({ access, refresh });
      navigate("/auth_detail");
      localStorage.setItem("user_id", data.data.id);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useAuthDetail = () => {
  const navigate = useNavigate();
  return useMutation<IAuthDetailResponseData, any, IAuthDetailPost>(
    authDetail,
    {
      onSuccess: () => {
        navigate("/");
      },
      onError: () => {
        navigate("/");
      },
    }
  );
};
