export interface IGasStationsResponse {
    data: IGasStation[];
  }
  export interface IGasStation {
    id: string;
    name: string;
    open_time: string;
    close_time: string;
    lat: number;
    long: number;
    is_open: boolean;
  }
  