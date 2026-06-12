import { client } from './client';

const apiKey = import.meta.env.OPEN_WEATHER_API_KEY;

export async function current(lat: number, lon: number) {
    const baseUrl = `https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await client.get(baseUrl);
    return response.data;
}