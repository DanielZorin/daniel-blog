import React from "react";
import { useParams } from "react-router-dom";
import "./year.style.scss";
import useLanguage from "../redux/use-language.js";
import { useQuery } from "@tanstack/react-query";
import { firebaseFetchContents } from "../redux/firebase.js";
import { LoadingContainer } from "../components/loading-container.js";
import { Helmet } from "react-helmet";

const CountryPage = () => {
  let { countryId } = useParams();
  const { language } = useLanguage();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["contents", language],
    queryFn: () => firebaseFetchContents(language),
    staleTime: Infinity,
  });

  if (isLoading || isFetching) return <LoadingContainer />;

  const countryName = data.filter((post) => post.country_eng === countryId)[0]
    .country_rus;
  return (
    <>
      <Helmet>
        <title>{countryName} - Daniel A. Zorin</title>
      </Helmet>
      <div className="gridDisplay">
        {data
          .filter((post) => post.country_eng === countryId)
          .map((entry) => (
            <div className="tripCard">
              {entry.link ? (
                <a href={"../" + entry.link}>
                  <img src={entry.preview} width="200px" alt="" />
                  <div class="tripName">{entry.name}</div>
                </a>
              ) : (
                <>
                  <img src={entry.preview} width="200px" alt="" />
                  <div class="tripNameFuture">{entry.name}</div>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default CountryPage;
