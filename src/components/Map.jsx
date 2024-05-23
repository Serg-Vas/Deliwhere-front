import React, { useEffect } from 'react';
import "D:\\work\\Food shop\\front4 copy\\src\\css\\mapStyles.css"

const Map = () => {

  useEffect(() => {
    // Load the Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDctR8IHU0NNLIA_i0Hu5O9VVk0NislPzA&callback=initMap&libraries=places&v=weekly`;
    script.defer = true;
    document.head.appendChild(script);

    // script.onload = () => {
      // Initialize the map
      window.initMap = () => {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 40.749933, lng: -73.98633 },
          zoom: 13,
          mapTypeControl: false,
        });
        const card = document.getElementById('pac-card');
        const input = document.getElementById('pac-input');
        const biasInputElement = document.getElementById('use-location-bias');
        const strictBoundsInputElement = document.getElementById('use-strict-bounds');
        const options = {
          fields: ['formatted_address', 'geometry', 'name'],
          strictBounds: false,
        };

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

        const autocomplete = new google.maps.places.Autocomplete(input, options);

        // Bind the map's bounds (viewport) property to the autocomplete object,
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

          if (!place.geometry || !place.geometry.location) {
            window.alert(`No details available for input: '${place.name}'`);
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }

          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          infowindowContent.children['place-name'].textContent = place.name;
          console.log(infowindowContent.children['place-address'].textContent = place.formatted_address);
          infowindow.open(map, marker);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, types) {
          const radioButton = document.getElementById(id);

          radioButton.addEventListener('click', () => {
            autocomplete.setTypes(types);
            input.value = '';
          });
        }

        setupClickListener('changetype-all', []);
        setupClickListener('changetype-address', ['address']);
        setupClickListener('changetype-establishment', ['establishment']);
        setupClickListener('changetype-geocode', ['geocode']);
        setupClickListener('changetype-cities', ['(cities)']);
        setupClickListener('changetype-regions', ['(regions)']);
        biasInputElement.addEventListener('change', () => {
          if (biasInputElement.checked) {
            autocomplete.bindTo('bounds', map);
          } else {
            // User wants to turn off location bias, so three things need to happen:
            // 1. Unbind from map
            // 2. Reset the bounds to whole world
            // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
            autocomplete.unbind('bounds');
            autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
            strictBoundsInputElement.checked = biasInputElement.checked;
          }

          input.value = '';
        });
        strictBoundsInputElement.addEventListener('change', () => {
          autocomplete.setOptions({
            strictBounds: strictBoundsInputElement.checked,
          });
          if (strictBoundsInputElement.checked) {
            biasInputElement.checked = strictBoundsInputElement.checked;
            autocomplete.bindTo('bounds', map);
          }

          input.value = '';
        });
      };

      // Initialize the map after the script is loaded
      if (window.google) {
        window.initMap();
      }
    // };

    return () => {
      // Cleanup the script tag when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div className="pac-card" id="pac-card">
        <div>
          <div id="title">Autocomplete search</div>
          <div id="type-selector" className="pac-controls">
            <input type="radio" name="type" id="changetype-all" defaultChecked />
            <label htmlFor="changetype-all">All</label>

            <input type="radio" name="type" id="changetype-establishment" />
            <label htmlFor="changetype-establishment">establishment</label>

            <input type="radio" name="type" id="changetype-address" />
            <label htmlFor="changetype-address">address</label>

            <input type="radio" name="type" id="changetype-geocode" />
            <label htmlFor="changetype-geocode">geocode</label>

            <input type="radio" name="type" id="changetype-cities" />
            <label htmlFor="changetype-cities">(cities)</label>

            <input type="radio" name="type" id="changetype-regions" />
            <label htmlFor="changetype-regions">(regions)</label>
          </div>
          <br />
          <div id="strict-bounds-selector" className="pac-controls">
            <input type="checkbox" id="use-location-bias" defaultChecked />
            <label htmlFor="use-location-bias">Bias to map viewport</label>

            <input type="checkbox" id="use-strict-bounds" />
            <label htmlFor="use-strict-bounds">Strict bounds</label>
          </div>
        </div>
        <div id="pac-container">
          <input id="pac-input" type="text" placeholder="Enter a location" />
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
