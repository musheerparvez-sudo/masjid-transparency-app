'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface MapProps {
  latitude: number;
  longitude: number;
  name: string;
  address?: string;
}

function MapComponent({ latitude, longitude, name, address }: MapProps) {
  /* eslint-disable @typescript-eslint/no-require-imports */
  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');
  const L = require('leaflet');
  require('leaflet/dist/leaflet.css');

  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });

  const position: [number, number] = [latitude, longitude];

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: '300px', width: '100%' }}
      className="rounded-xl z-0 relative"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <div className="font-semibold">{name}</div>
          {address && <div className="text-sm text-gray-600 mt-1">{address}</div>}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export const MosqueMap = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => (
    <div className="bg-emerald-50 rounded-xl p-8 text-center border-2 border-dashed border-emerald-200 h-[300px] flex items-center justify-center">
      <p className="text-emerald-600">🗺️ Loading Map...</p>
    </div>
  ),
});
