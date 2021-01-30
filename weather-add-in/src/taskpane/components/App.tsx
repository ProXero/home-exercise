import * as React from "react";
import GetWeatherButton from './GetWeatherButton';
import Progress from "./Progress";
// images references in the manifest
import "../../../assets/icon-16.png";
import "../../../assets/icon-32.png";
import "../../../assets/icon-80.png";
import * as api from '../api';
import { constants } from "../constants";
import {fillValuesToSelectedRange} from '../excel';
import { DailyData } from "../api";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppContext {
  isLoading: boolean;
}

const App : React.FC<AppProps> = ({title, isOfficeInitialized}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const dailyDataToArray = (dailyData: DailyData) => {
      return [dailyData.dt.toLocaleDateString(), dailyData.weather.map(w => w.description).join(', ')];
  }

  const click = async () => {
    setIsLoading(true);
    try {
      const weatherData = await api.getWeatherData(constants.longBeachCoordinates);
      await fillValuesToSelectedRange(weatherData.data.daily.splice(1, 8).map(dailyDataToArray));
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  function render() {
    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    return (
      <div className="ms-welcome">
        <GetWeatherButton
          isLoading={isLoading}
          onClick={click}
        />
      </div>
    );
  }

  return render();
}

export default App;