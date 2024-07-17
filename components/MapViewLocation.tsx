import { View, Text } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import MapView, { Marker, Region, Callout } from "react-native-maps";

// Coordenadas iniciales para centrar en Alemania
const initialRegion = {
  latitude: 51.1657,
  longitude: 10.4515,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

interface MapViewLocationProps {
  location: string;
  eventInfo: string; // Información del evento
}

const MapViewLocation = ({ location, eventInfo }: MapViewLocationProps) => {
  const [coords, setCoords] = useState<Region>(initialRegion);
  const [markCoords, setMarkCoords] = useState<any>(null);
  const mapViewRef = useRef<MapView>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const locationCoords = await getCoordinatesFromAddress(location);
        setCoords({
          ...locationCoords,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        });

        //Set Mark
        setMarkCoords({
          ...locationCoords,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        });

        if (mapViewRef.current) {
          mapViewRef.current.animateToRegion(
            {
              ...locationCoords,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            },
            1000
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoordinates();
  }, [location]);

  const getCoordinatesFromAddress = async (
    address: string
  ): Promise<{ latitude: number; longitude: number }> => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const results = await response.json();
      if (results.length > 0) {
        const { lat, lon } = results[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <View className="px-4">
      <MapView
        ref={mapViewRef}
        initialRegion={coords}
        className="w-full h-[200px]"
        // mapType="satellite"
      >
        {markCoords !== null && (
          <Marker
            coordinate={{
              latitude: markCoords.latitude,
              longitude: markCoords.longitude,
            }}
            title="Evento"
            description={eventInfo}
          >
            <Callout>
              <View>
                <Text>{eventInfo}</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

export default MapViewLocation;
