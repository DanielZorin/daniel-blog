import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./year.style.scss";
import useLanguage from "../redux/use-language";
import { useQuery } from "@tanstack/react-query";
import { firebaseFetchContents } from "../redux/firebase";
import { LoadingContainer } from "../components/loading-container";
import { Helmet } from "react-helmet";

const YearPage = () => {
  const { year } = useParams();
  const { language } = useLanguage();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["contents", language],
    queryFn: () => firebaseFetchContents(language),
    staleTime: Infinity,
  });

  if (isLoading || isFetching) return <LoadingContainer />;

  return (
    <>
      <Helmet>
        <title>{year} - Daniel A. Zorin</title>
      </Helmet>
      <div className="gridDisplay">
        {data
          .filter((post) => post.year.toString() === year)
          .map((entry) => (
            <div className="tripCard">
              {entry.link ? (
                <Link to={"../" + entry.link}>
                  <img alt={entry.name} src={entry.preview} class="tripImage" />
                  <div class="tripName">{entry.name}</div>
                </Link>
              ) : (
                <>
                  <img alt={entry.name} src={entry.preview} class="tripImage" />
                  <div class="tripNameFuture">{entry.name}</div>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default YearPage;
