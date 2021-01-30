import * as React from "react";
import GetWeatherButton from './GetWeatherButton';
import * as api from '../api';
import { constants, Coordinates } from "../constants";
import {fillValuesToSelectedRange} from '../excel';
import { DailyData } from "../api";

export interface GetWeatherForecastProps {
  daysToForecast?: number;
  showToday?: boolean;
  location?: Coordinates;
}

const GetWeatherForecast : React.FC<GetWeatherForecastProps> = ({
  daysToForecast = 7,
  showToday = false,
  location = constants.longBeachCoordinates
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const dailyDataToArray = (dailyData: DailyData) => {
      return [dailyData.dt.toLocaleDateString(), dailyData.weather.map(w => w.description).join(', ')];
  }

  const click = async () => {
    setIsLoading(true);
    try {
      const weatherData = await api.getWeatherData(location);
      const startIndex = showToday ? 0 : 1;
      await fillValuesToSelectedRange(weatherData.data.daily.splice(startIndex, startIndex + daysToForecast).map(dailyDataToArray));
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  function render() {
    return (
      <GetWeatherButton
        isLoading={isLoading}
        onClick={click}
      />
    );
  }

  return render();
}

export default GetWeatherForecast;