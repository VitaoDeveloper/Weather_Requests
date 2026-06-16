import i18n from '../locales/i18n';
import type { ApiResponse } from '../types/ApiResponse';
import { client } from './client';

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export async function fetchByCoords(lat: number, lon: number): Promise<ApiResponse> {
    const response = await client.get(`/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${i18n.language}`);
    return response.data;
}

export async function fetchByCity(cityName: string): Promise<ApiResponse> {
    const response = await client.get(`/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=${i18n.language}`);
    return response.data;
}