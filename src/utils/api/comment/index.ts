import { ReadFunction } from "@/utils/config/crud";
import { IGasStationCommentsResponse } from "./types";

export async function getGasStationsComments(
  id: string
): Promise<IGasStationCommentsResponse> {
  return ReadFunction<IGasStationCommentsResponse>(
    `comments?gas_station_id=${id}`
  );
}
