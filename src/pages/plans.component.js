import React from "react";
import { firebaseFetchPlans } from "../redux/firebase";
import { useQuery } from "@tanstack/react-query";
import useLanguage from "../redux/use-language";
import { LoadingContainer } from "../components/loading-container";

const Plans = () => {
  const { language } = useLanguage();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["plans", language],
    queryFn: () => firebaseFetchPlans(language),
    staleTime: Infinity,
  });

  if (isLoading || isFetching) return <LoadingContainer />;
  return (
    <>
      <div>
        {language === "ru" ? "Планы" : "Plans"}
        {data.map((entry, i) => (
          <div key={`plan-${i}`}>
            {entry}
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default Plans;
