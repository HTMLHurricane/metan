import { useMutation, useQuery } from "react-query";
import {
  ICommentPost,
  IGasStationCommentsResponse,
  IRepliesPost,
} from "./types";
import { createComment, createReplies, getGasStationsComments } from ".";
import { message } from "antd";

export const useGetGasStationsComment = (id?: string) => {
  return useQuery<
    IGasStationCommentsResponse,
    any,
    IGasStationCommentsResponse["data"]
  >(["comment", id], () => getGasStationsComments(id!), {
    enabled: !!id,
    select: (data) => data.data,
  });
};

export const useCreateReplies = () => {
  return useMutation<unknown, any, IRepliesPost>(createReplies, {
    onSuccess: () => {
      message.success("Ваш голос успешно отправлен");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useCreateComment = () => {
  return useMutation<unknown, any, ICommentPost>(createComment, {
    onSuccess: () => {
      message.success("Ваше сообщение успешно отправлен");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
