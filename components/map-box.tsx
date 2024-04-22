"use client"
import { useState, useEffect, useRef, SetStateAction } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibW9pc28iLCJhIjoiY2xwYmt0ZTdrMGVtNzJxbjc1YmJidGhxbyJ9.HmrYzjcQq_cc7twbyewIMg';

interface MapProps {
    setCoords: React.Dispatch<SetStateAction<{ lat: number; lng: number; }>>;
}

const MapComponent: React.FC<MapProps> = ({ setCoords }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markerRef = useRef(null); // Referencia al marcador
    const [lng, setLng] = useState<number>();
    const [lat, setLat] = useState<number>();
    const [zoom, setZoom] = useState(14);
    const [markerLng, setMarkerLng] = useState<number>(); // Coordenadas del marcador
    const [markerLat, setMarkerLat] = useState<number>(); // Coordenadas del marcador

    const currentPositiionUser = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;
                setLng(longitude)
                setLat(latitude)
                setMarkerLng(longitude)
                setMarkerLat(latitude)
                console.log("Coordenadas actuales:");
                console.log("Latitud:", latitude);
                console.log("Longitud:", longitude);
                setIsLoading(false);
            }, (error) => {
                // Manejo de errores
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.error("El usuario denegó la solicitud de geolocalización.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error("La información de la posición no está disponible.");
                        break;
                    case error.TIMEOUT:
                        console.error("Se agotó el tiempo para obtener la posición.");
                        break;
                    default:
                        console.error("Ocurrió un error desconocido.");
                        break;
                }
            });
        } else {
            console.error("La geolocalización no es compatible en este navegador.");
        }
    }

    useEffect(() => {
        currentPositiionUser();
    }, []);


    useEffect(() => {
        if (!mapContainer.current) return;

        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current as string,
            style: 'mapbox://styles/mapbox/streets-v8',
            center: [lng as never, lat as never],
            zoom: zoom
        });

        markerRef.current = new mapboxgl.Marker({ color: 'green', draggable: true, anchor: "bottom" })
            .setLngLat([markerLng as never, markerLat as never])
            .addTo(map.current as never);


        markerRef.current.on('dragend', () => {
            const lngLat = markerRef.current.getLngLat();
            console.log('::::::::::::::::::::::::', lngLat)
            setMarkerLng(lngLat.lng);
            setMarkerLat(lngLat.lat);
            setCoords({ lng: lngLat.lng, lat: lngLat.lat })
        });


    }, [lat, lng, zoom, markerLng, markerLat]); // Dependencias vacías porque las variables no cambian

    if (isLoading) {
        return <h1>Cargando ...</h1>
    }

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}

export default MapComponent;
