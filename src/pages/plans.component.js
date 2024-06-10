import React from 'react'
import { firebaseFetchPlans } from '../redux/firebase';
import { useQuery } from '@tanstack/react-query';
import useLanguage from '../redux/use-language';
import { LoadingContainer } from '../components/loading-container';

const PlansPage = () => {
    const { language } = useLanguage();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["plans", language],
    queryFn: () => firebaseFetchPlans(language),
    staleTime: Infinity
  });

  if (isLoading || isFetching) return <LoadingContainer />;
    return <>
        <p>
            {
                data.map((entry, i) =>
                    <>
                        {entry}
                        <br />
                    </>)
            }
        </p>
    </>
}

export default PlansPage;