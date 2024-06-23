import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LoadingContainer } from "../components/loading-container.js";
import { firebaseFetchContents } from "../redux/firebase.js";
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
      <div className="py-1">
        <Link className="text-2xl font-bold text-black hover:text-red-500" to={`/${language}/year/${year.toString()}`}>
          {year}
        </Link>
      </div>
      {data
        .filter((entry) => entry.year === year)
        .map((entry, i) => (
          <div key={i} className="py-1">
            {entry.link ? (
              <Link className="text-black hover:text-red-500" to={`/${language}/${entry.link}`}>
                {entry.name}
              </Link>
            ) : (
              <span className="text-gray-600">{entry.name}</span>
            )}
          </div>
        ))}
    </div>
  ));
};

export default ContentsPage;
