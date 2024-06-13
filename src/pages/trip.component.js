import React from "react";
import { useParams } from "react-router-dom";
import "./contents.style.scss";
import useLanguage from "../redux/use-language.js";
import { useQuery } from "@tanstack/react-query";
import { LoadingContainer } from "../components/loading-container.js";
import { firebaseFetchPost } from "../redux/firebase.js";

const TripPage = () => {
  let { tripId } = useParams();
  const { language } = useLanguage();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["trip", tripId, language],
    queryFn: () => firebaseFetchPost(tripId, language),
    staleTime: Infinity
  });

  if (isLoading || isFetching) return <LoadingContainer />;

  return (
    <div>
      <h1>{data.title}</h1>
      <i>{data.dates}</i>
      {data.content.map((e, i) => {
        switch (e.type) {
          case "text":
            return <p key={`text-${i}`} dangerouslySetInnerHTML={{ __html: e.src }}></p>;
          case "image":
            return <img key={`img-${i}`} alt="" className="trip-photo" src={e.src} />;
          case "section":
            return (
              <>
                <a name={e.bookmark} id={e.bookmark}></a>
                <h2 key={i}>{e.src}</h2>
              </>
            );
          case "separator":
            return (
              <>
                <a name={e.bookmark} id={e.bookmark}></a>
                <center key={i}> * * * </center>
              </>
            );
          default:
            return "";
        }
      })}
    </div>
  );
};

export default TripPage;
