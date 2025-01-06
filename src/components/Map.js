import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const ProtectedAreasViewer = () => {
  const [locations, setLocations] = useState({
    mountains: [],
    lakes: [],
    gorges: []
  });
  const [view, setView] = useState(null);

  useEffect(() => {
    const loadArcGIS = () => {
      window.require([
        'esri/Graphic',  // Adăugăm aici Graphic pentru a-l accesa din require
        'esri/WebMap',
        'esri/views/MapView',
        'esri/widgets/BasemapToggle',
        'esri/widgets/BasemapGallery',
        'esri/widgets/Measurement',
        'esri/widgets/Search',
        'esri/geometry/Point',
        'esri/symbols/SimpleFillSymbol',
        'esri/geometry/Polygon'
      ], function (
        Graphic, WebMap, MapView, BasemapToggle, BasemapGallery, Measurement, Search, Point, SimpleFillSymbol, Polygon
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

        setView(mapView);

        // Widget de schimbare basemap
        const basemapToggle = new BasemapToggle({
          view: mapView,
          nextBasemap: 'satellite',
        });
        mapView.ui.add(basemapToggle, 'bottom-right');

        // Galeria de basemaps
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
          popupEnabled: false,
        });
        mapView.ui.add(searchWidget, 'top-left'); 

        searchWidget.on('search-complete', (event) => {
          if (event.results.length > 0 && event.results[0].results.length > 0) {
            const result = event.results[0].results[0];
            const geometry = result.feature.geometry;

            // Verifică categoria și setează culoarea în funcție de aceasta
            const category = result.feature.attributes['Zona Protejata']; 
            let fillColor;
            if (category && category.startsWith('M')) {
              fillColor = [0, 0, 255, 0.4]; // Albastru pentru munți
            } else if (category && category.startsWith('B')) {
              fillColor = [128, 0, 128, 0.4]; // Mov pentru balti
            } else if (category && category.startsWith('C')) {
              fillColor = [255, 255, 0, 0.4]; // Galben pentru chei
            }

            // Creăm simbolul pentru colorarea regiunii
            const fillSymbol = new SimpleFillSymbol({
              color: fillColor,
              outline: {
                color: [255, 255, 255],
                width: 2
              }
            });

            // Creăm un graphic pentru zona găsită
            const graphic = new Graphic({
              geometry: geometry,
              symbol: fillSymbol
            });

            mapView.graphics.removeAll();
            mapView.graphics.add(graphic);

            // Facem zoom la zona selectată
            mapView.goTo({
              target: geometry,
              zoom: 14
            });
          }
        });
      });
    };

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
            );
            
            // Filtrăm datele pe categorii
            const mountains = validLocations.filter(loc => loc['Zona Protejata'].startsWith('M'));
            const lakes = validLocations.filter(loc => loc['Zona Protejata'].startsWith('B'));
            const gorges = validLocations.filter(loc => loc['Zona Protejata'].startsWith('C'));

            setLocations({
              mountains,
              lakes,
              gorges
            });
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
          <h3>Munți</h3>
          {locations.mountains.map((location, index) => (
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
          <h3>Balti</h3>
          {locations.lakes.map((location, index) => (
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
          <h3>Chei</h3>
          {locations.gorges.map((location, index) => (
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
