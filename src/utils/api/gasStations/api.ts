import { useQuery } from "react-query";
import { getGasStations } from ".";
import { IGasStationsResponse, IGasStation } from "./types";

export const useGetGasStations = () => {
  return useQuery<IGasStationsResponse, any, IGasStation[]>(
    "gasStations",
    getGasStations,
    {
      select: (response) => response.data,
    }
  );
};
