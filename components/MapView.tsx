import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState, useRef } from "react";
import MapView, { Marker, MapPressEvent, Region } from "react-native-maps";

interface MarkerData {
  id: string; 
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description?: string; 
}

// Coordenadas iniciales para centrar en Alemania
const initialRegion = {
  latitude: 51.1657,
  longitude: 10.4515,
  latitudeDelta: 10, // Ajuste del zoom inicial
  longitudeDelta: 10,
};

const Members = () => {
  const [addressInput, setAddressInput] = useState<string>("");
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const mapViewRef = useRef<MapView>(null);

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

  const handleCreateEvent = async () => {
    try {
      const coordinates = await getCoordinatesFromAddress(addressInput);
      console.log("Coordinates:", coordinates);
      if (coordinates) {
        const newMarker: MarkerData = {
          id: `${Date.now()}`,
          coordinate: coordinates,
          title: addressInput,
        };
        setMarkers([...markers, newMarker]);
        setSelectedMarkerId(newMarker.id);
        zoomToMarker(newMarker.id);
      }
    } catch (error) {
      console.error("Error obteniendo coordenadas:", error);
    }
  };

  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    const newMarker: MarkerData = {
      id: `${Date.now()}`,
      coordinate: coordinate,
      title: "New Marker",
    };
    setMarkers([...markers, newMarker]);
    setSelectedMarkerId(newMarker.id);
    zoomToMarker(newMarker.id);
  };

  const zoomToMarker = (markerId: string) => {
    const marker = markers.find((m) => m.id === markerId);
    if (marker && mapViewRef.current) {
      const region: Region = {
        latitude: marker.coordinate.latitude,
        longitude: marker.coordinate.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      mapViewRef.current.animateToRegion(region);
    }
  };

  const handleMarkerPress = (markerId: string) => {
    setSelectedMarkerId(markerId);
    zoomToMarker(markerId);
  };

  const handleTitleChange = (markerId: string, newTitle: string) => {
    const updatedMarkers = markers.map((marker) =>
      marker.id === markerId ? { ...marker, title: newTitle } : marker
    );
    setMarkers(updatedMarkers);
  };

  const handleDescriptionChange = (
    markerId: string,
    newDescription: string
  ) => {
    const updatedMarkers = markers.map((marker) =>
      marker.id === markerId
        ? { ...marker, description: newDescription }
        : marker
    );
    setMarkers(updatedMarkers);
  };

  const handleDeleteMarker = (markerId: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this marker?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const filteredMarkers = markers.filter(
              (marker) => marker.id !== markerId
            );
            setMarkers(filteredMarkers);
            setSelectedMarkerId(null);
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const markersOrderedByCreation = [...markers].reverse(); // Orden inverso para mostrar los últimos añadidos primero

  return (
    <View className="flex-1 p-4">
      <View className="mb-4">
        <TextInput
          value={addressInput}
          onChangeText={setAddressInput}
          placeholder="Enter address"
          className="border p-2 mb-2 rounded"
        />
        <Button title="Create Event" onPress={handleCreateEvent} />
      </View>
      <View className="flex-1">
        <MapView
          ref={mapViewRef}
          style={{ flex: 1 }}
          initialRegion={initialRegion}
          onPress={handleMapPress}
          className="w-full h-full"
        >
          {markersOrderedByCreation.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              onPress={() => handleMarkerPress(marker.id)}
            />
          ))}
        </MapView>
      </View>
      {selectedMarkerId && (
        <View>
          <TextInput
            value={markers.find((m) => m.id === selectedMarkerId)?.title || ""}
            onChangeText={(newTitle) =>
              handleTitleChange(selectedMarkerId, newTitle)
            }
            placeholder="Title"
            className="border p-2 mb-2 rounded"
          />
          <TextInput
            value={
              markers.find((m) => m.id === selectedMarkerId)?.description || ""
            }
            onChangeText={(newDesc) =>
              handleDescriptionChange(selectedMarkerId, newDesc)
            }
            placeholder="Description"
            className="border p-2 mb-2 rounded"
          />
          <Button
            title="Delete Marker"
            onPress={() => handleDeleteMarker(selectedMarkerId)}
          />
        </View>
      )}
    </View>
  );
};

export default Members;
