"use client"

import { useEffect, useState } from "react";
import moment from "moment-timezone";

export function UserLocation() {
  const [location, setLocation] = useState<{ city: string, country: string } | null>(null);
  const [localTime, setLocalTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();

          const city = data.address.city || data.address.town || data.address.village;
          const country = data.address.country;

          setLocation({ city, country });

          const timezoneResponse = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=2fe02b196aca450298a6b048b6eb7f46&lat=${latitude}&long=${longitude}`);
          const timezoneData = await timezoneResponse.json();
          const timezone = timezoneData.timezone;

          const currentTime = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
          setLocalTime(currentTime);

          const intervalId = setInterval(() => {
            const updatedTime = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
            setLocalTime(updatedTime);
          }, 1000);

          return () => clearInterval(intervalId);
        } catch (error) {
          console.error("Error fetching location or time:", error);
          setError("Failed to fetch location or time. Please try again later.");
        }
      }, (err) => {
        console.error("Geolocation error:", err);
        setError("Failed to get your location. Please ensure location services are enabled.");
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="w-full p-4">
      {error && <p className="text-red-500">{error}</p>}
      {location && localTime ? (
        <div className="text-right">
          <p className="font-bold text-lg">{location.city}, {location.country}</p>
          <p className="text-sm">{localTime}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
