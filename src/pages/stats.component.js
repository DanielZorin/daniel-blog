import React from "react";
import mapworld from "../assets/map-world.png";
import mapregions from "../assets/divisions-me.png";
import maproutes from "../assets/routes-generated.png";
import useLanguage from "../redux/use-language";

const StatsPage = () => {
  const { language } = useLanguage();
  return (
    <>
      <div align="center" className="p-3">
        {language == "ru" ? "Страны, в которых я был:" : "Countries I visited:"}
        <img src={mapworld} alt="Карта мира" width="100%" />
      </div>
      <div align="center" className="p-3">
        {language == "ru" ? "Регионы, где я был:" : "Regions I visited:"}
        <a href={mapregions} target="_blank" rel="noopener noreferrer">
          <img src={mapregions} alt="Карта мира" width="100%" />
        </a>
      </div>
      <div align="center" className="p-3">
        <div>
          {language == "ru" ? "Карта моих перемещений" : "My travel routes"}
        </div>
        <div>
          {language == "ru"
            ? "Красный = поезд; синий = автобус; зеленый = корабль; черный = автомобиль/автостоп; желтый = самолет."
            : "Red = train; blue = bus; green = ship; black = car/hitchhiking; yellow = plane"}
        </div>
        <a href={maproutes} target="_blank" rel="noopener noreferrer">
          <img src={maproutes} alt="Карта мира" width="100%" />
        </a>
      </div>
    </>
  );
};

export default StatsPage;
