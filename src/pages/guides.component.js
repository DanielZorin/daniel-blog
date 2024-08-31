import React from "react";
import useLanguage from "../redux/use-language";
import { useQuery } from "@tanstack/react-query";
import { LoadingContainer } from "../components/loading-container";
import { firebaseFetchPage } from "../redux/firebase";

const fetchLocalFile = async (language) => {
  const response = await fetch(`/guides-${language}.json`);
  if (!response.ok) {
    throw new Error("Failed to load local file");
  }
  let result = await response.json();
  return result;
};

const CountryLink = ({ country }) => (
  <div>
    ●&nbsp;
    <a href={country.link} className="underline">
      {country.name}
    </a>
    {
      country.additional_info ? `: ${country.additional_info }` : null
    }
  </div>
);

const GuidesPage = () => {
  const { language } = useLanguage();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["guides", language],
    queryFn: () => {
      if (false && process.env.NODE_ENV === "development") {
        return fetchLocalFile(language);
      } else {
        return firebaseFetchPage("guides", language);
      }
    },
    staleTime: Infinity,
  });

  if (isLoading || isFetching) return <LoadingContainer />;

  return (
    <>
      <div className="container mx-auto p-8">
        {data.regions.map((region, index) => (
          <div className="mb-8" key={index}>
            <div className="flex flex-wrap items-center">
              <div
                className={`w-full md:w-1/2 px-8 ${
                  index % 2 !== 0 ? "order-last" : ""
                }`}
              >
                <img
                  src={region.image}
                  alt={region.name}
                  className="w-full h-auto"
                />
              </div>
              <div className="w-full md:w-1/2 px-8">
                <h2 className="text-2xl font-bold">{region.name}</h2>
                <div
                  className={`grid ${
                    region.countries.length > 10 ? "grid-cols-2" : ""
                  } mt-2`}
                >
                  {region.countries.length > 10 ? (
                    <>
                      <div>
                        {region.countries
                          .slice(0, Math.ceil(region.countries.length / 2))
                          .map((country, countryIndex) => (
                            <CountryLink
                              key={countryIndex}
                              country={country}
                            />
                          ))}
                      </div>
                      <div>
                        {region.countries
                          .slice(Math.ceil(region.countries.length / 2))
                          .map((country, countryIndex) => (
                            <CountryLink
                              key={countryIndex}
                              country={country}
                            />
                          ))}
                      </div>
                    </>
                  ) : (
                    region.countries.map((country, countryIndex) => (
                      <CountryLink
                        key={countryIndex}
                        country={country}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GuidesPage;
