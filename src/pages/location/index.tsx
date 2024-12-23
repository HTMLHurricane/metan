import React, { useEffect, useState } from "react";

const GeolocationComponent: React.FC = () => {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError("Не удалось получить геолокацию: " + err.message);
        }
      );
    } else {
      setError("Геолокация не поддерживается этим браузером.");
    }
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : location.latitude && location.longitude ? (
        <p>
          Ваши координаты: Широта: {location.latitude}, Долгота:{" "}
          {location.longitude}
        </p>
      ) : (
        <p>Загрузка координат...</p>
      )}
    </div>
  );
};

export default GeolocationComponent;
