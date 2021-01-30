import * as React from "react";
import GetWeatherForecast from './GetWeatherForecast';
import Progress from "./Progress";
// images references in the manifest
import "../../../assets/icon-16.png";
import "../../../assets/icon-32.png";
import "../../../assets/icon-80.png";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

const App : React.FC<AppProps> = ({title, isOfficeInitialized}) => {
  function render() {
    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    return (
      <div className="ms-welcome">
        <GetWeatherForecast />
      </div>
    );
  }

  return render();
}

export default App;