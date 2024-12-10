import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    loadModules(['esri/views/MapView', 'esri/WebMap'], { 
      css: true,
      apiKey: 'YOUR_API_KEY' // Asigură-te că ai introdus un API Key valid
    })
      .then(([MapView, WebMap]) => {
        const webMap = new WebMap({
          portalItem: {
            id: '53e25fa2dce74e64861243ac67995a22', // ID-ul hărții
          },
        });

        const view = new MapView({
          container: mapRef.current,
          map: webMap,
          center: [24.9668, 45.9432], // Coordonatele centrului României
          zoom: 7, // Setează zoom-ul pentru a fi potrivit României
          constraints: {
            // Limitează panning-ul pentru a nu ieși din România
            minZoom: 7,  // Zoom minim
            maxZoom: 10, // Zoom maxim
            geometry: {
              type: "extent",
              xmin: 20.8, // Coordonatele stângi pentru România
              ymin: 44.2, // Coordonatele sudice pentru România
              xmax: 30.0, // Coordonatele drepte pentru România
              ymax: 48.3  // Coordonatele nordice pentru România
            }
          }
        });

        return () => {
          if (view) {
            view.destroy();
          }
        };
      })
      .catch((err) => console.error(err));
  }, []);

  return <div style={{ height: '100vh', width: '100%' }} ref={mapRef}></div>;
};

export default Map;
