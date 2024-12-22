export interface IGasStationCommentsResponse {
  data: IGasStationsComments[];
}
export interface IGasStationsComments {
  name: string;
  text: string;
  created_at: string;
}
