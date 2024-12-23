import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  ICommentPost,
  IGasStationCommentsResponse,
  IRepliesPost,
} from "./types";
import { createComment, createReplies, getGasStationsComments } from ".";

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
  return useMutation<unknown, any, IRepliesPost>(createReplies);
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, any, ICommentPost>(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comment");
    },
  });
};
