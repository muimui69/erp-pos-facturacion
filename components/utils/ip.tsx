"use client"

import { useEffect, useState } from 'react';

export const WithIP = () => {
    const [ip, setIp] = useState(null);

    useEffect(() => {
        fetch('https://api.ipify.org/?format=json')
            .then(response => response.json())
            .then(data => setIp(data.ip))
            .catch(error => console.error('Error al obtener la dirección IP:', error));
    }, []);

    return {
        ip
    }
}

