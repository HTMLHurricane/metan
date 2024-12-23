export interface IGasStationCommentsResponse {
  data: IGasStationsComments[];
}
export interface IGasStationsComments {
  name: string;
  text: string;
  created_at: string;
}

export interface ICommentPost {
  gas_station_id: string;
  phone: string;
  text: string;
  name: string;
}

export interface IRepliesPost {
  gas_station_id: string;
  phone: string;
  is_open: 1 | 0;
  name: string;
}
