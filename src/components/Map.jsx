import React, { useState, useEffect } from 'react';
import "../css/mapStyles.css";

const Map = ({ onAddressUpdate }) => {
  const [deliveryLocation, setDeliveryLocation] = useState(); // clientData
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Function to initialize the map
    const initMap = (coords) => {
      console.log(coordinates, coords);
      const map = new google.maps.Map(document.getElementById('map'), {
        center: coords,
        zoom: 13,
        mapTypeControl: false,
      });
      const card = document.getElementById('pac-card');
      const input = document.getElementById('pac-input');
      const options = {
        fields: ['formatted_address', 'geometry', 'name'],
        strictBounds: false,
      };

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

      const autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.bindTo('bounds', map);

      const infowindow = new google.maps.InfoWindow();
      const infowindowContent = document.getElementById('infowindow-content');
      infowindow.setContent(infowindowContent);

      const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29),
      });

      autocomplete.addListener('place_changed', () => {
        infowindow.close();
        marker.setVisible(false);

        const place = autocomplete.getPlace();
        console.log(place);

        if (place.geometry && place.geometry.location) {
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();

          // Now you can use latitude and longitude as needed
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);

          const newCoordinates = {
            lat: latitude,
            lng: longitude,
          };

          // Update coordinates in state and localStorage
          setCoordinates(newCoordinates);
          localStorage.setItem('coordinates', JSON.stringify(newCoordinates));

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }

          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = place.formatted_address;

          const userData = JSON.parse(localStorage.getItem("userData"));
          userData.address = infowindowContent.children['place-address'].textContent;
          localStorage.setItem('userData', JSON.stringify(userData));
          setDeliveryLocation(userData.address);

          // Call the onAddressUpdate function to update the address in the parent component
          onAddressUpdate(userData.address);

          infowindow.open(map, marker);
        } else {
          window.alert(`No details available for input: '${place.name}'`);
        }
      });
    };

    // Load the Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap&libraries=places&v=weekly`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userCoordinates = JSON.parse(localStorage.getItem("coordinates"));
      if (userData && userCoordinates) {
        const { lat, lng } = userCoordinates;
        console.log(userCoordinates);
        const newCoordinates = userCoordinates;
        console.log(newCoordinates);
        setDeliveryLocation(userData.address);
        setCoordinates(newCoordinates);
        initMap(newCoordinates);
      } else {
        const defaultCoordinates = { lat: 50.450001, lng: 30.523333 };
        setCoordinates(defaultCoordinates);
        initMap(defaultCoordinates);
      }
    };

    return () => {
      // Cleanup the script tag when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div className="pac-card" id="pac-card">
        <div>
          <br />
        </div>
        <div id="pac-container">
          <input id="pac-input" type="text" placeholder="Enter a location" value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} />
        </div>
      </div>
      <div id="map" style={{ height: '50vh' }}></div>
      <div id="infowindow-content">
        <span id="place-name" className="title"></span><br />
        <span id="place-address"></span>
      </div>
    </div>
  );
};

export default Map;
