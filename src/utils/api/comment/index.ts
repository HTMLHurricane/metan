import { ReadFunctionPostman } from "@/utils/config/crud";
import {
  ICommentPost,
  IGasStationCommentsResponse,
  IRepliesPost,
} from "./types";
import { axiosInstancePostman } from "@/utils/config/axiosInstance";

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
  } catch (error) {
    console.error(error);
    throw new Error("Произошла ошибка при отправке. Попробуйте еще раз");
  }
}

export async function createComment(body: ICommentPost) {
  try {
    const res = await axiosInstancePostman.post<unknown>("comments", body);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Произошла ошибка при отправке. Попробуйте еще раз");
  }
}
