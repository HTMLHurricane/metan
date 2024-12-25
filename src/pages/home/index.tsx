import { useGetGasStations } from "@/utils/api/gasStations/api";
import { TOKEN } from "@/utils/config/token";
import { Typography, Badge, Skeleton } from "antd";
import { useState, useEffect, memo } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000;
};

const Home = () => {
  const [gasStations, setGasStations] = useState<GasStationList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: postmanData } = useGetGasStations();
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
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
  const updateTotal = (id: string, newTotal: number) => {
    setGasStations((prevData) => {
      const index = prevData.findIndex((item) => item.id === id);
      if (index === -1) return prevData;
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], total: newTotal };
      return updatedData;
    });
  };
  const sendLocationThrottled = (() => {
    let lastSentTime = 0;
    return (location: { lat: number; lon: number }) => {
      const now = Date.now();
      if (now - lastSentTime > 5000) {
        sendLocation(location);
        lastSentTime = now;
      }
    };
  })();

  useEffect(() => {
    const token = TOKEN.getAccessToken() ?? "";
    const socketUrl = `wss://gas-station.aralhub.uz/ws/user/gas-stations/?token=${token}`;
    let isConnected = false;
    const attemptConnection = () => {
      const socket = new WebSocket(socketUrl);

      socket.onopen = () => {
        console.log("WebSocket соединение установлено");
        isConnected = true;

        const message = { action: "list" };
        socket.send(JSON.stringify(message));

        if (navigator.geolocation) {
          let watchId: number;

          const handlePositionUpdate = (position: GeolocationPosition) => {
            const newLocation = {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            };

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
              sendLocationThrottled(newLocation);
            }
          };

          const handleError = (error: GeolocationPositionError) => {
            console.error("Ошибка получения геолокации:", error);
          };

          watchId = navigator.geolocation.watchPosition(
            handlePositionUpdate,
            handleError,
            {
              enableHighAccuracy: true,
              maximumAge: 60000,
              timeout: 10000,
            }
          );

          return () => {
            if (watchId) {
              navigator.geolocation.clearWatch(watchId);
            }
          };
        } else {
          console.error("Геолокация не поддерживается этим браузером.");
        }
      };

      socket.onmessage = (event) => {
        const response: GasStationsResponse = JSON.parse(event.data);
        const { action, gas_stations } = response?.data || {};
        if (action === "list" && Array.isArray(gas_stations)) {
          setGasStations(gas_stations);
          setLoading(false);
        } else if (
          ["update", "create", "delete"].includes(action) &&
          gas_stations &&
          !Array.isArray(gas_stations)
        ) {
          updateTotal(gas_stations.id, gas_stations.total);
        }
      };

      socket.onerror = (error) => {
        console.error("Ошибка WebSocket:", error);
      };

      socket.onclose = (event) => {
        console.log("WebSocket соединение закрыто", event.reason);
        isConnected = false;
      };

      return socket;
    };
    const intervalId = setInterval(() => {
      if (!isConnected) {
        const socket = attemptConnection();
        if (socket.readyState === WebSocket.OPEN) {
          clearInterval(intervalId);
          setSocket(socket);
        }
      } else {
        clearInterval(intervalId);
      }
    }, 10000);
    return () => {
      clearInterval(intervalId);
      socket?.close();
    };
  }, []);

  const data = postmanData?.map((item1) => {
    const match = gasStations?.find((item2) => item2.id === item1.id);
    return {
      ...item1,
      users: match ? match.gas_station_users?.length : null,
    };
  });

  return (
    <div className="p-2 bg-[#1e1e2e] min-h-screen">
      <div className="fixed w-full top-0 z-50 left-0 text-center text-4xl font-bold text-slate-100 p-4 bg-[#1e1e2e] rounded-md shadow-md">
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
          data?.map((item) => (
            <div
              onClick={() => navigate(`/${item.id}`)}
              key={item.id}
              className={`${
                item.is_active === false
                  ? "border-[#FFD700] "
                  : item.is_active && item.is_open
                  ? "border-[#28a745]"
                  : "border-[#dc3545]"
              } shadow-lg rounded-lg p-3 grid gap-4 border-solid border-[1px] cursor-pointer hover:bg-[#333333] transition duration-200`}
            >
              <div className="flex items-center gap-4">
                <FaLocationDot
                  style={{
                    fontSize: "28px",
                    color:
                      item.is_active === false
                        ? "#FFD700"
                        : item.is_active && item.is_open
                        ? "#28a745"
                        : "#dc3545",
                  }}
                />
                <Text className="text-2xl font-semibold text-slate-100">
                  {item.name}
                </Text>
              </div>
              <div className="flex items-center justify-between text-lg space-x-4">
                <Badge
                  status={
                    item.is_active === false
                      ? "warning"
                      : item.is_active && item.is_open
                      ? "success"
                      : "error"
                  }
                  text={
                    <span className="text-lg text-slate-300 px-1">
                      {item.is_active === false
                        ? "неизвестно"
                        : item.is_active && item.is_open
                        ? "открыто"
                        : "закрыто"}
                    </span>
                  }
                  className="pl-3"
                />
                <div className="flex items-center text-slate-300 px-3 py-1 bg-slate-700 rounded-lg shadow-md text-[16px] space-x-1">
                  <span className="text-slate-100 font-medium">Очередь:</span>
                  <span className="font-semibold">{item.users || 0}</span>
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
  is_open: boolean;
  total: number;
}

interface GasStationList extends GasStation {
  name: string;
  point: Point;
  is_open_by_admin: boolean;
  comment: string;
  comment_updated_at: string;
  gas_station_users: GasStationUser[];
}

interface GasStationsResponse {
  message: string;
  data: {
    action: string;
    gas_stations: GasStationList[] | GasStation | null;
  };
}
