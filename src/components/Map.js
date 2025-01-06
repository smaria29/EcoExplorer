import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const ProtectedAreasViewer = () => {
  const [locations, setLocations] = useState({
    mountains: [],
    lakes: [],
    gorges: [],
  });
  const [view, setView] = useState(null);
  const [arcgisModules, setArcgisModules] = useState(null); // Stocăm modulele ArcGIS

  useEffect(() => {
    const loadArcGIS = () => {
      window.require(
        [
          'esri/Graphic',
          'esri/WebMap',
          'esri/views/MapView',
          'esri/widgets/BasemapToggle',
          'esri/widgets/BasemapGallery',
          'esri/widgets/Measurement',
          'esri/widgets/Search',
        ],
        function (
          Graphic,
          WebMap,
          MapView,
          BasemapToggle,
          BasemapGallery,
          Measurement,
          Search
        ) {
          // Stocăm modulele în state
          setArcgisModules({ Graphic });

          const webmap = new WebMap({
            portalItem: {
              id: 'da4d9919e00041b1a5ab416329d5c1a9',
            },
          });

          const mapView = new MapView({
            container: 'viewDiv',
            map: webmap,
            zoom: 7,
            center: [25.0, 46.0], // Centrat aproximativ pe România
          });

          setView(mapView);

          // Adăugăm widget-uri la interfață
          const basemapToggle = new BasemapToggle({
            view: mapView,
            nextBasemap: 'satellite',
          });
          mapView.ui.add(basemapToggle, 'bottom-right');

          const basemapGallery = new BasemapGallery({
            view: mapView,
          });
          mapView.ui.add(basemapGallery, 'top-right');

          const measurementWidget = new Measurement({
            view: mapView,
            activeTool: 'distance',
          });
          mapView.ui.add(measurementWidget, 'top-left');

          const searchWidget = new Search({
            view: mapView,
            popupEnabled: false,
          });
          mapView.ui.add(searchWidget, 'top-left');
        }
      );
    };

    const script = document.createElement('script');
    script.src = 'https://js.arcgis.com/4.27/';
    script.onload = loadArcGIS;
    document.head.appendChild(script);

    // Încarcă datele din CSV
    fetch('/locatii_coordonate.csv')
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            const validLocations = results.data.filter(
              (loc) =>
                loc.Latitude &&
                loc.Longitude &&
                !isNaN(parseFloat(loc.Latitude)) &&
                !isNaN(parseFloat(loc.Longitude))
            );

            const mountains = validLocations.filter((loc) =>
              loc['Zona Protejata'].startsWith('M')
            );
            const lakes = validLocations.filter((loc) =>
              loc['Zona Protejata'].startsWith('B')
            );
            const gorges = validLocations.filter((loc) =>
              loc['Zona Protejata'].startsWith('C')
            );

            setLocations({
              mountains,
              lakes,
              gorges,
            });
          },
        });
      });
  }, []);

  const handleLocationClick = (location) => {
    if (view && arcgisModules) {
      const { Graphic } = arcgisModules;
      const { Longitude, Latitude, 'Zona Protejata': zonaProtejata } = location;

      let fillColor;
      if (zonaProtejata.startsWith('M')) {
        fillColor = [0, 0, 255, 0.4]; // Albastru pentru munți
      } else if (zonaProtejata.startsWith('B')) {
        fillColor = [128, 0, 128, 0.4]; // Mov pentru bălți
      } else if (zonaProtejata.startsWith('C')) {
        fillColor = [255, 255, 0, 0.4]; // Galben pentru chei
      }

      const point = {
        type: 'point',
        longitude: parseFloat(Longitude),
        latitude: parseFloat(Latitude),
      };

      const simpleMarkerSymbol = {
        type: 'simple-marker',
        color: fillColor,
        size: 100,
        outline: {
          color: [255, 255, 255], // Alb pentru contur
          width: 1,
        },
      };

      const graphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol,
      });

      view.graphics.removeAll();
      view.graphics.add(graphic);

      view.goTo({
        center: [parseFloat(Longitude), parseFloat(Latitude)],
        zoom: 12,
      });
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
      <div id="viewDiv" style={{ width: '70%', height: '100%' }}></div>
      <div
        style={{
          width: '30%',
          height: '100%',
          overflowY: 'auto',
          padding: '1rem',
          backgroundColor: '#f3f4f6',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Zone Protejate
        </h2>
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
                cursor: 'pointer',
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
                backgroundColor: 'rgba(128, 0, 128, 0.2)', // Mov
                border: '1px solid rgba(128, 0, 128, 0.5)',
                borderRadius: '0.25rem',
                cursor: 'pointer',
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
                backgroundColor: 'rgba(255, 255, 0, 0.2)', // Galben
                border: '1px solid rgba(255, 255, 0, 0.5)',
                borderRadius: '0.25rem',
                cursor: 'pointer',
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
