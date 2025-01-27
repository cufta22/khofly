import { useGeneralStore } from "@store/general";
import { useEffect, useState } from "react";
import useToast from "./use-toast";

const useGeolocation = (shouldSubmit: boolean) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const setGeolocation = useGeneralStore((state) => state.setGeolocation);

  const { toast } = useToast();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setGeolocation({ lat: `${latitude}`, lon: `${longitude}` });
          setUserLocation({ latitude, longitude });
        },

        (error) => {
          console.log(error);

          toast.show({
            title: "Error while getting user location",
            message: error.message,
          });
        },

        {
          // enableHighAccuracy: true, // Fine since it'll be cached in localStorage
        }
      );
    } else {
      toast.show({
        title: "Error while getting user location",
        message: "Geolocation is not supported by this browser",
      });
    }
  };

  useEffect(() => {
    if (shouldSubmit) getUserLocation();
  }, [shouldSubmit]);

  return { location: userLocation, getLocation: getUserLocation };
};

export default useGeolocation;
