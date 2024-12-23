import { ReadFunctionPostman } from "@/utils/config/crud";
import {
  ICommentPost,
  IGasStationCommentsResponse,
  IRepliesPost,
} from "./types";
import { axiosInstancePostman } from "@/utils/config/axiosInstance";
import { message } from "antd";

export async function getGasStationsComments(
  id: string
): Promise<IGasStationCommentsResponse> {
  return ReadFunctionPostman<IGasStationCommentsResponse>(
    `comments?gas_station_id=${id}`
  );
}

export async function createReplies(body: IRepliesPost) {
  try {
    const res = await axiosInstancePostman.post<unknown>("replies", body);
    return res.data;
  } catch (error: any) {
    if (error?.response?.status) {
      const status = error.response.status;
      if (status === 422) {
        message.error("Вы можете отправить 1 сообщение в час");
      }
    }
  }
}

export async function createComment(body: ICommentPost) {
  try {
    const res = await axiosInstancePostman.post<unknown>("comments", body);
    return res.data;
  } catch (error: any) {
    if (error?.response?.status) {
      const status = error.response.status;
      if (status === 422) {
        message.error("Вы можете отправить 1 сообщение в час");
      }
    }
  }
}
