import { View, Text } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'

const Members = () => {
  const [eventData, seteventData] = useState()
  return (
    <View>
      <Text>Members: list, add, invited etc..</Text>
      <View>

        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          className='w-full h-full'
        >
          <Marker
            key={"01"}
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            title={"Titulo del tesing mapa"}
            description={"Testeando mapa, descripcion del mapa"}
          />
        </MapView>
      </View>
    </View>
  )
}

export default Members