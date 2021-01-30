import * as React from "react";
import { Button, ButtonType, Spinner } from "office-ui-fabric-react";

export interface HeaderProps {
  onClick: Function;
  isLoading: boolean;
}

const GetWeatherButton : React.FC<HeaderProps> = ({onClick, isLoading}) => {
  function render() {

    return (
      <div>
        <Button
          className="ms-welcome__action"
          disabled={isLoading}
          buttonType={ButtonType.hero}
          iconProps={{ iconName: "ChevronRight" }}
          onClick={() => onClick()}
        >
          {isLoading ? <Spinner /> : null}
          Get Weather
        </Button>
      </div>
    );
  }

  return render();
}

export default GetWeatherButton;