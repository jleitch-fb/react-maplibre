import {useEffect, useRef, useState} from 'react';
import maplibregl from 'maplibre-gl';

function Map(props) {
  const [counter, setCounter] = useState(0);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: props.styleUrl,
      center: [-105.00306017642826, 39.75298694807765],
      zoom: 12,
    });

    mapRef.current.on('load', function() {
      var geojsonData = {
        'type': 'FeatureCollection',
        'features': []
      };
      const factor = props.direction ? [0.01, 0.00] : [0.00, 0.01];
      for (let featureID = 0; featureID < 1000; featureID++) {
        geojsonData.features[featureID] = {
          'type': 'Feature',
          "properties": {
            "id": featureID,
            "name": "HH " + featureID
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-105.00306017642826 + (factor[0] * featureID), 39.74298694807765 + (factor[1] * featureID)]
          }
        };
      }

      // Add a single point to the map
      mapRef.current.addSource('myPoints', {
        'type': 'geojson',
        'data': geojsonData,
        'promoteId': 'id'   // Promote the property.id (GW ID) to the object's ID
      });

      mapRef.current.addLayer({
        'id': 'myPoints',
        'type': 'circle',
        'source': 'myPoints',
        'paint': {
          'circle-radius': 10,
          'circle-color': '#00FF00'
        }
      });
    });

    return () => {
      mapRef.current.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>
        {`Counter: ${counter}`}
      </button>
      <div ref={mapContainerRef} style={{height: "500px"}} />
    </div>
  );
}

export default Map;
