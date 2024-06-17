import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LoadingContainer } from "../components/loading-container.js";
import { firebaseFetchContents } from "../redux/firebase.js";
import "./contents.style.scss";
import useLanguage from "../redux/use-language.js";

const ContentsPage = () => {
  const { language } = useLanguage();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["contents", language],
    queryFn: () => firebaseFetchContents(language),
    staleTime: Infinity
  });

  if (isLoading || isFetching) return <LoadingContainer />;

  let years = [];
  if (data) {
    years = data.map((trip) => trip.year);
    years = [...new Set(years)];
    years = years.sort().reverse();
  }

  return years.map((year, j) => (
    <div key={j} className="pl-[50px]">
      <div>
        <Link className="yearLink" to={`/${language}/year/${year.toString()}`}>
          {year}
        </Link>
      </div>
      {data
        .filter((entry) => entry.year === year)
        .map((entry, i) => (
          <div key={i}>
            {entry.link ? (
              <Link className="tripLink" to={`/${language}/${entry.link}`}>
                {entry.name}
              </Link>
            ) : (
              <span className="tripLinkFuture">{entry.name}</span>
            )}
          </div>
        ))}
    </div>
  ));
};

export default ContentsPage;
