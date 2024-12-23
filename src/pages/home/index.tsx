import { useGetGasStations } from "@/utils/api/gasStations/api";
import { Typography, Badge } from "antd";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const Home = () => {
  const { data } = useGetGasStations();
  const navigate = useNavigate();

  return (
    <div className="p-2 bg-[#181818] min-h-screen">
      <div className="fixed w-full top-0 z-50 left-0 text-center text-4xl font-bold text-slate-100 p-4 bg-[#181818] rounded-md shadow-md">
        Metan Nukus
      </div>
      <div className="pt-20 pb-5 grid gap-5">
        {data?.map((item) => (
          <div
            onClick={() => navigate(`/${item.id}`)}
            key={item.id}
            className={`${
              item.is_open ? "border-[#28a745]" : "border-[#dc3545]"
            } shadow-lg rounded-lg p-3 grid gap-4 border-solid border-[1px] cursor-pointer hover:bg-[#333333] transition duration-200`}
          >
            <div className="flex items-center gap-4">
              <FaLocationDot
                style={{
                  fontSize: "28px",
                  color: item.is_open ? "#28a745" : "#dc3545",
                }}
              />
              <Text className="text-2xl font-semibold text-slate-100">
                {item.name}
              </Text>
            </div>
            <div className="flex text-lg justify-between">
              <Badge
                status={item.is_open ? "success" : "error"}
                text={
                  <span className="text-lg text-slate-300 px-1">
                    {item.is_open ? "Открыто" : "Закрыто"}
                  </span>
                }
                className="pl-3"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
