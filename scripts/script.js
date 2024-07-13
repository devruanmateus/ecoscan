import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import esriConfig from "@arcgis/core/config.js";

esriConfig.apiKey = "YOUR_API_KEY";  // Substitua "YOUR_API_KEY" pela sua chave da API do ArcGIS

const map = new Map({
    basemap: "topo-vector"  // Mapa base
});

const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.805, 34.027],  // Coordenadas de centro (longitude, latitude)
    zoom: 13
});