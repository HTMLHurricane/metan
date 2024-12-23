// import { useGetGasStations } from "@/utils/api/gasStations/api";
// import { Typography, Badge } from "antd";
// import { FaLocationDot } from 'react-icons/fa6'
// import { useNavigate } from "react-router-dom";

import WebSocketComponent from "../websocket";

// const { Text } = Typography;

const Home = () => {
  // const { data } = useGetGasStations();
  // const navigate = useNavigate();
  return (
    <WebSocketComponent />
    // <div className="grid gap-4 p-2">
    //   {data?.map((item) => (
    //     <div
    //       onClick={() => navigate(`/${item.id}`)}
    //       key={item.id}
    //       className={`shadow-sm rounded-lg p-5 grid gap-4 border-solid border-[1px] border-slate-300 cursor-pointer`}
    //     >
    //       <div className="flex items-center gap-4">
    //         <FaLocationDot
    //           style={{
    //             fontSize: "28px",
    //             color: item.is_open ? "green" : "red",
    //           }}
    //         />
    //         <Text className="text-xl font-medium">{item.name}</Text>
    //       </div>
    //       <div className="flex text-lg justify-between">
    //         <Badge
    //           status={item.is_open ? "success" : "error"}
    //           text={
    //             <span className="text-lg">
    //               {item.is_open ? "Открыто" : "Закрыто"}
    //             </span>
    //           }
    //           className="pl-3"
    //         />
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Home;
