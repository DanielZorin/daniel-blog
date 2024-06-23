import React from "react";
import { useParams } from "react-router-dom";
import "./year.style.scss";
import { firebaseFetchPage } from "../redux/firebase.js";
import useLanguage from "../redux/use-language.js";
import { useQuery } from "@tanstack/react-query";
import { LoadingContainer } from "../components/loading-container.js";

const CitiesPage = () => {
  let { countryId } = useParams();
  const { language } = useLanguage();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["cities", language],
    queryFn: () => firebaseFetchPage("cities", language),
    staleTime: Infinity,
  });

  if (isLoading || isFetching) return <LoadingContainer />;

  return (
    <div className="gridDisplay">
      {data
        .filter((post) => post.country === countryId)
        .map((entry, i) => (
          <div className="tripCard" key={i}>
            <a href={"../../trip/" + entry.url}>
              <img className="tripImage" alt={entry.name} src={entry.preview} />
              <div className="tripName">{entry.name}</div>
            </a>
          </div>
        ))}
    </div>
  );
};

export default CitiesPage;
