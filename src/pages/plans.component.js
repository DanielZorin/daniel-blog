import React from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const PlansPage = () => {
    const location = useLocation();
    const lang = new URLSearchParams(location.search).get('lang') || 'ru';

    return <>
        <p>
            {
                lang === "ru" ?
                    <>
                        <br />
                    </>
                    :
                    <>
                        <br />
                    </>
            }
        </p>
    </>
}

export default PlansPage;