import React from "react";
import useLanguage from "../redux/use-language";
import { useQuery } from "@tanstack/react-query";
import { LoadingContainer } from "../components/loading-container";
import { firebaseFetchPage } from "../redux/firebase";

const GuidesPage = () => {
  const { language } = useLanguage();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["guides", language],
    queryFn: () => firebaseFetchPage("guides", language),
    staleTime: Infinity,
  });

  if (isLoading || isFetching) return <LoadingContainer />;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
    </>
  );
};

export default GuidesPage;
