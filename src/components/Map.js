import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const ProtectedAreasViewer = () => {
  const [locations, setLocations] = useState([]);
  const [view, setView] = useState(null);

  useEffect(() => {
    const loadArcGIS = () => {
      window.require([
        'esri/WebMap',
        'esri/views/MapView',
        'esri/widgets/BasemapToggle',
        'esri/widgets/BasemapGallery',
        'esri/widgets/Measurement',
        'esri/widgets/Search',
        'esri/Graphic',
        'esri/geometry/geometryEngine'
      ], function(
        WebMap,
        MapView,
        BasemapToggle,
        BasemapGallery,
        Measurement,
        Search,
        Graphic,
        geometryEngine
      ) {
        const webmap = new WebMap({
          portalItem: {
            id: 'da4d9919e00041b1a5ab416329d5c1a9'
          }
        });

        const mapView = new MapView({
          container: 'viewDiv',
          map: webmap,
          zoom: 7,
          center: [25.0, 46.0], // Centrat aproximativ pe România
        });

        // Adăugăm widget-ul de schimbare basemap
        const basemapToggle = new BasemapToggle({
          view: mapView,
          nextBasemap: 'satellite',
        });

        mapView.ui.add(basemapToggle, 'bottom-right');

        // Adăugăm galeria de basemaps
        const basemapGallery = new BasemapGallery({
          view: mapView,
        });

        mapView.ui.add(basemapGallery, 'top-right');

        // Widget-ul de măsurare
        const measurementWidget = new Measurement({
          view: mapView,
          activeTool: 'distance',
        });

        mapView.ui.add(measurementWidget, 'top-left');

        // Widget-ul de căutare
        const searchWidget = new Search({
          view: mapView,
          popupEnabled: false, // Dezactivăm popup-urile implicite
        });

        mapView.ui.add(searchWidget, 'top-left'); // Adăugăm widget-ul de căutare

        // Gestionăm rezultatele căutării
        searchWidget.on('search-complete', (event) => {
          if (event.results.length > 0 && event.results[0].results.length > 0) {
            const result = event.results[0].results[0];

            // Creăm un marker pentru locația găsită
            const highlightGraphic = new Graphic({
              geometry: result.feature.geometry,
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: 'red',
                size: '12px',
                outline: {
                  color: 'white',
                  width: 2,
                },
              },
            });

            // Adăugăm marker-ul pe hartă
            mapView.graphics.removeAll();
            mapView.graphics.add(highlightGraphic);

            // Facem zoom la locația găsită
            mapView.goTo({
              target: result.feature.geometry,
              zoom: 14,
            });
          }
        });

        // Gestionăm evenimentele widget-ului de măsurare
        measurementWidget.on('measure-complete', (event) => {
          console.log('Distanță măsurată:', event.result.distance, event.result.unit);
        });

        measurementWidget.on('area-complete', (event) => {
          console.log('Zona măsurată:', event.result.area, event.result.unit);
        });

        setView(mapView);
      });
    };

    // Încarcă scriptul ArcGIS
    const script = document.createElement('script');
    script.src = 'https://js.arcgis.com/4.27/';
    script.onload = loadArcGIS;
    document.head.appendChild(script);

    // Încarcă datele din CSV
    fetch('/locatii_coordonate.csv')
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            const validLocations = results.data.filter(loc => 
              loc.Latitude && 
              loc.Longitude && 
              !isNaN(parseFloat(loc.Latitude)) && 
              !isNaN(parseFloat(loc.Longitude))
            ).sort((a, b) => a['Zona Protejata'].localeCompare(b['Zona Protejata']));
            
            setLocations(validLocations);
          }
        });
      });
  }, []);

  const handleLocationClick = (location) => {
    if (view) {
      view.goTo({
        center: [parseFloat(location.Longitude), parseFloat(location.Latitude)],
        zoom: 12
      });
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
      <div id="viewDiv" style={{ width: '70%', height: '100%' }}></div>
      <div style={{ width: '30%', height: '100%', overflowY: 'auto', padding: '1rem', backgroundColor: '#f3f4f6' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Zone Protejate</h2>
        <div>
          {locations.map((location, index) => (
            <button
              key={index}
              onClick={() => handleLocationClick(location)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              {location['Zona Protejata']}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProtectedAreasViewer;
