import { useEffect, useState } from "react";
import theme from "../context/Theme";

const Ticker = () => {
  const [time, setTime] = useState('');
  const [location, setLocation] = useState({ lat: null, long: null });
  const [error, setError] = useState(null);

  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const isAM = hours < 12;
    const formattedTime = `${now.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })} | ${hours % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} ${isAM ? 'AM' : 'PM'}`;
    setTime(formattedTime);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, long: pos.coords.longitude });
      },
      (err) => {
        setError(err.message);
      }
    );
  };

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    getLocation();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full text-sm overflow-hidden z-50"
    style={{background: theme.colors.primary.DEFAULT, color: theme.colors.primary.contrast}}
    >
      <div className="whitespace-nowrap animate-marquee px-4 py-2 flex gap-8">
        <p>{`📅 ${time}`}</p>
        <p>
          {error
            ? `⚠️ ${error}`
            : location.lat && location.long
            ? `📍 Latitude: ${location.lat.toFixed(3)}, Longitude: ${location.long.toFixed(3)}`
            : '📍 Fetching location...'}
        </p>
      </div>
    </div>
  );
};

export default Ticker;
