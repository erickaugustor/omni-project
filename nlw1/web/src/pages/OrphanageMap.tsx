import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanage-map.css'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const OrphanageMap = () => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita.</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>Indaiatuba</span>
        </footer>
      </aside>

      <Map
        center={[-23.0958652,-47.2120816]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
        <Marker
          icon={mapIcon}
          position={[-23.0958652,-47.2120816]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            Test
            <Link to="/orphanages/create">
              <FiArrowRight size={28} color="#FFF" />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="/orphanages/1" className="create-orphanate">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
};

export default OrphanageMap;
