import {constants, Coordinates} from './constants';
import axios from 'axios';

export interface WeatherData {
    description: string
}

export interface DailyData {
    weather: WeatherData[],
    dt: Date
}

export interface ResponseData {
    daily: DailyData[];
  }
  

export const getWeatherData = async (coordinates: Coordinates) => {
    const response = await axios.get<ResponseData>(constants.weatherApiUrl, 
        { params: {
            lat: coordinates.lat,
            lon: coordinates.lon,
            exclude: 'current,minutely,hourly,alerts',
            appid: ''
        }})
    response.data.daily.forEach(element => {
        element.dt = new Date(1000 * (element.dt as any));
    });
    return response;
};