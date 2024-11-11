import React from "react";
import { useParams } from "react-router-dom";
import useLanguage from "../redux/use-language.js";
import { useQuery } from "@tanstack/react-query";
import { LoadingContainer } from "../components/loading-container.js";
import { firebaseFetchPost } from "../redux/firebase.js";
import { Helmet } from "react-helmet";

const TripPage = () => {
  let { tripId } = useParams();
  const { language } = useLanguage();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["trip", tripId, language],
    queryFn: () => firebaseFetchPost(tripId, language),
    staleTime: Infinity,
  });

  if (isLoading || isFetching) return <LoadingContainer />;

  if (data.post_type !== "trip") {
    return (
      <>
        <Helmet>
          <title>{data.title} - Daniel A. Zorin</title>
        </Helmet>
        <div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: data.content.replace(/\n/g, "<br/>"),
            }}
          ></div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>{data.title} - Daniel A. Zorin</title>
        </Helmet>
        <div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <div className="italic py-2">{data.dates}</div>
          {data.content.map((e, i) => {
            switch (e.type) {
              case "text":
                return (
                  <p
                    key={`text-${i}`}
                    className="py-1"
                    dangerouslySetInnerHTML={{ __html: e.src }}
                  ></p>
                );
              case "image":
                return (
                  <img
                    key={`img-${i}`}
                    alt=""
                    className="trip-photo"
                    src={e.src}
                  />
                );
              case "section":
                return (
                  <>
                    <a name={e.bookmark} id={e.bookmark}></a>
                    <h2 key={i} className="text-2xl font-bold">
                      {e.src}
                    </h2>
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
      </>
    );
  }
};

export default TripPage;
