import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import {Icon} from 'leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css'; 
import MapData from './MapData';
import EntityList from './components/EntityList';

const API_BASE_URL = 'https://akabab.github.io/starwars-api/api/id/';

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = React.useState(MapData);
  const [entitiesData, setEntitiesData] = useState([]);


  const fetchUserEntityData = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${id}.json`);
      return response.data;
    } catch (error) {
      console.error('Error in entity data:', error);
      return null;
    }
  };

  useEffect(() => {
    if (userLocation) {
      const fetchDistanceData = async () => {
        const dataPromises = markers.map(async (item) => {
          const entityData = await fetchUserEntityData(item.id);
          //Calculate distance from userlocation to secret location. 
          if (entityData) {//
            const distance = L.latLng(item.lat, item.long).distanceTo(userLocation);
            return {
              ...entityData,
              distance,
            };
          }
          return null;
        });
        const fetchEntityData = await Promise.all(dataPromises);
        const filterEntityData = fetchEntityData.filter((data) => data !== null);

        setEntitiesData(filterEntityData);
      };

      fetchDistanceData();
    }
  }, [userLocation, markers]);

  const AddMarkerOnClick = () => {
    const map = useMapEvents({
       click(e){    
           const newMarker = {
               id: markers.length + 1,
               lat: e.latlng.lat,
               long: e.latlng.lng
             };
           map.flyTo(e.latlng, map.getZoom())
           setMarkers([...markers, newMarker]);
           setUserLocation(L.latLng(e.latlng.lat, e.latlng.lng));
         },})
       return null;
      };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2875/2875433.png",
    iconSize: [38,38],
  });

  return (
    <div className='main-container'>
      <div className='heading-container'>
    <h3 className='heading'>Map-Based Entity Locator</h3>
    <img  className="earth-icon" src="https://cdn-icons-png.flaticon.com/128/9985/9985721.png" alt="earth"></img>
    </div>
      <MapContainer
        center={[0, 0]}
        zoom={2}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map(marker => (
        <Marker key={marker.id} position={[marker.lat, marker.long]} icon={customIcon}>
          <Popup>
            Marker ID: {marker.id}
            <br />
            Latitude: {marker.lat}
            <br />
            Longitude: {marker.long}
          </Popup>
        </Marker>
      ))}
      <AddMarkerOnClick />
      </MapContainer>
      {userLocation && <EntityList entitiesData={entitiesData} />}
    </div>
  );
}

export default App;
