import React from 'react'
import { Link } from 'react-router-dom'
import { firebaseFetchPage } from '../redux/firebase';
import useLanguage from '../redux/use-language';
import { useQuery } from '@tanstack/react-query';
import { LoadingContainer } from '../components/loading-container';

const CountryListPage = () => {
    const { language } = useLanguage();
    const { data, isLoading, isFetching } = useQuery({
      queryKey: ["country-list", language],
      queryFn: () => firebaseFetchPage("country_list", language),
      staleTime: Infinity
    });
  
    if (isLoading || isFetching) return <LoadingContainer />;
    return (
        <div>
            <ol>
                {
                    data.map((entry, i) =>
                        <li key={i}>
                            <b><Link to={`/${language}/country/${entry.eng_name}`} className="tripLink">{entry.rus_name}</Link></b>
                            {
                            entry.cities === "" ? null : 
                            <>
                            <span>: </span>
                            <span>
                                {entry.cities.join(", ")}
                            </span>
                            </>
                            }
                        </li>
                    )
                }
            </ol>
        </div>)
}

export default CountryListPage;