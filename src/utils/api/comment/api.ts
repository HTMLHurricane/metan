import { useQuery } from "react-query";
import { IGasStationCommentsResponse } from "./types";
import { getGasStationsComments } from ".";

export const useGetGasStationsComment = (id: string) => {
  return useQuery<
    IGasStationCommentsResponse,
    any,
    IGasStationCommentsResponse["data"]
  >(["comment", id], () => getGasStationsComments(id), {
    select: (data) => data.data,
  });
};
