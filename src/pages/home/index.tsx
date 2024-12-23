import { TOKEN } from "@/utils/config/token";
import { Typography, Badge, Skeleton } from "antd";
import { useState, useEffect, memo } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const Home = () => {
  const [gasStations, setGasStations] = useState<GasStation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null); // Одно соединение для всего

  // Функция для вычисления расстояния между двумя точками (в метрах)
  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Радиус Земли в километрах
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Возвращаем расстояние в метрах
  };

  useEffect(() => {
    const token = TOKEN.getAccessToken() ?? "";
    const socketUrl = `wss://gas-station.aralhub.uz/ws/user/gas-stations/?token=${token}`;
    const socket = new WebSocket(socketUrl);

    // Сохранить socket один раз
    setSocket(socket);

    socket.onopen = () => {
      // Получение списка заправок
      const message = {
        action: "list",
      };
      socket.send(JSON.stringify(message));

      // Получаем текущую геолокацию пользователя
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            };

            // Если местоположение отличается от предыдущего на значительное расстояние (например, 10 метров)
            if (
              !userLocation ||
              getDistance(
                userLocation.lat,
                userLocation.lon,
                newLocation.lat,
                newLocation.lon
              ) > 10
            ) {
              setUserLocation(newLocation);

              // Отправляем обновленную геолокацию на сервер
              sendLocation(newLocation);
            }
          },
          (error) => {
            console.error("Ошибка получения геолокации:", error);
          }
        );
      } else {
        console.error("Геолокация не поддерживается этим браузером.");
      }
    };

    socket.onmessage = (event) => {
      const response: GasStationsResponse = JSON.parse(event.data);

      if (response?.data?.gas_stations) {
        setGasStations(response.data.gas_stations);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    socket.onerror = (error) => {
      console.error("Ошибка WebSocket:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket соединение закрыто", event.reason);
    };

    return () => {
      socket.close();
    };
  }, []); // Теперь useEffect запускается только один раз при монтировании компонента

  // Функция для отправки геолокации на сервер через уже открытое соединение
  const sendLocation = (location: { lat: number; lon: number }) => {
    if (socket?.readyState === WebSocket.OPEN) {
      const locationMessage = {
        action: "create",
        data: {
          point: [location.lat, location.lon],
        },
      };
      socket.send(JSON.stringify(locationMessage));
    }
  };

  useEffect(() => {
    // Список заправок обновлен, но логирование удалено
  }, [gasStations]);

  return (
    <div className="p-2 bg-[#181818] min-h-screen">
      <div className="fixed w-full top-0 z-50 left-0 text-center text-4xl font-bold text-slate-100 p-4 bg-[#181818] rounded-md shadow-md">
        Metan Nukus
      </div>
      <div className="pt-20 pb-5 grid gap-5">
        {loading ? (
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                active
                paragraph={{ rows: 2 }}
                className="mb-5"
              />
            ))}
          </div>
        ) : (
          gasStations?.map((item) => (
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
              <div className="flex items-center justify-between text-lg space-x-4">
                <Badge
                  status={item.is_open ? "success" : "error"}
                  text={
                    <span className="text-lg text-slate-300 px-1">
                      {item.is_open ? "Открыто" : "Закрыто"}
                    </span>
                  }
                  className="pl-3"
                />
                <div className="flex items-center text-slate-300 px-3 py-1 bg-slate-700 rounded-lg shadow-md text-[16px] space-x-1">
                  <span className="text-slate-100 font-medium">Очередь:</span>
                  <span className="font-semibold">
                    {item.gas_station_users?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default memo(Home);

interface Point {
  type: "Point";
  coordinates: [number, number];
}

interface GasStationUser {
  user: {
    id: string;
    point: Point;
  };
}

interface GasStation {
  id: string;
  name: string;
  point: Point;
  total: number;
  is_open: boolean;
  is_open_by_admin: boolean;
  comment: string;
  comment_updated_at: string;
  gas_station_users: GasStationUser[];
}

interface GasStationsResponse {
  message: string;
  data: {
    action: string;
    gas_stations: GasStation[];
  };
}
