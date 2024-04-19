"use client"

import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { FC } from 'react';


const MAPBOX_TOKEN = "pk.eyJ1IjoibW9pc28iLCJhIjoiY2xwYmt0ZTdrMGVtNzJxbjc1YmJidGhxbyJ9.HmrYzjcQq_cc7twbyewIMg";

const MapComponent: FC = () => {
    const [viewport, setViewport] = useState({
        latitude: 0, // Initial latitude (adjust as needed)
        longitude: 0, // Initial longitude (adjust as needed)
        zoom: 12, // Initial zoom level
    });
    const [markerPosition, setMarkerPosition] = useState({
        latitude: 0, // Initial marker latitude (adjust as needed)
        longitude: 0, // Initial marker longitude (adjust as needed)
    });

    useEffect(() => {
        const success = (position:any) => {
            const { latitude, longitude } = position.coords;
            setViewport({ ...viewport, latitude, longitude });
            setMarkerPosition({ latitude, longitude });
        };

        const error = () => {
            console.error('Error getting geolocation');
            // Handle geolocation error gracefully, e.g., display a message to the user
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.error('Geolocation is not supported by this browser');
            // Provide alternative functionality or inform the user
        }
    }, []); // Empty dependency array to run only once on component mount

    const handleMapClick = (event:any) => {
        setMarkerPosition({
            latitude: event.lngLat.lat,
            longitude: event.lngLat.lng,
        });
    };

    const handleMarkerDrag = (event:any) => {
        setMarkerPosition({
            latitude: event.lngLat.lat,
            longitude: event.lngLat.lng,
        });
    };

    return (
        <div className='w-full h-80 rounded-md'>
            <ReactMapGL
                mapboxAccessToken={MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                initialViewState={viewport}
                onClick={handleMapClick}
                onDragEnd={handleMarkerDrag} // Handle marker drag events
            >
                <Marker
                    latitude={markerPosition.latitude}
                    longitude={markerPosition.longitude}
                    draggable={true} // Allow marker dragging
                >
                    <div style={{ color: 'red', fontSize: '24px' }}></div>
                </Marker>
            </ReactMapGL>
        </div>
    );
};

export default MapComponent;
