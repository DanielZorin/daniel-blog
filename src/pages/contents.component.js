import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useQuery } from "@tanstack/react-query";
import { LoadingContainer } from "../components/loading-container.js";
import "./contents.style.scss";
import { firebaseFetchContents } from "../redux/firebase.js";

const ContentsPage = () => {
  //const lang = new URLSearchParams(location.search).get('lang') || 'ru';
  //const lang = useSelector(selectLanguage);
    const lang = "ru"
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["contents", lang],
    queryFn: () => firebaseFetchContents(lang),
  });

  if (isLoading || isFetching) return <LoadingContainer />;

  let years = [];
  if (data) {
    years = data.map((trip) => trip.year);
    years = [...new Set(years)];
    years = years.sort().reverse();
  }

  return years.map((year, j) => (
    <div key={j}>
      <h2>
        <Link className="yearLink" to={"year/" + year.toString()}>
          {year}
        </Link>
      </h2>
      {data
        .filter((entry) => entry.year === year)
        .map((entry, i) => (
          <p key={i}>
            {entry.link ? (
              <Link className="tripLink" to={entry.link}>
                {entry.name}
              </Link>
            ) : (
              <span className="tripLinkFuture">{entry.name}</span>
            )}
          </p>
        ))}
    </div>
  ));
};

export default ContentsPage;
