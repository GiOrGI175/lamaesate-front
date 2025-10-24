import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './map.scss';
import Pin from '../pin/Pin';

const Map = ({ items }) => {
  const position = [51.505, -0.09];

  console.log(items, 'map');

  return (
    <MapContainer
      center={
        items.length === 1 ? [items[0].latitude, items[0].longitude] : position
      }
      zoom={7}
      scrollWheelZoom={false}
      className='map'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {items.map((item) => (
        <Pin key={item.id} item={item} />
      ))}
    </MapContainer>
  );
};

export default Map;
