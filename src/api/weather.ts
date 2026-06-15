import { client } from './client';

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export async function fetchByCoords(lat: number, lon: number) {
    const endpoint  = `/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

    const response = await client.get(endpoint);
    return response.data;
}

export async function fetchByCity(cityName: string) {
    const url = `/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const response = await client.get(url);
    return response.data;
}