
export interface Constants {
    weatherApiUrl: string;
    longBeachCoordinates: Coordinates;
}

export interface Coordinates {
    lat: string;
    lon: string;
}

export const constants : Constants = {
    weatherApiUrl: 'https://api.openweathermap.org/data/2.5/onecall',
    longBeachCoordinates: { lat: '33.7701', lon: '118.1937'}
};