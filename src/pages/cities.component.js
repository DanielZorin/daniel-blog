import React from 'react'
import { useParams } from "react-router-dom";
import { store } from '../redux/store'
import { fetchCities } from '../redux/actions'
import { useSelector } from 'react-redux'
import { selectCities, selectLanguage } from '../redux/selectors.js'
import './year.style.scss'

const CitiesPage = () => {
    let { countryId } = useParams();
    let data = useSelector((state) => selectCities(state, countryId));
    const lang = useSelector(selectLanguage)

    React.useEffect(() => store.dispatch(fetchCities(lang)), [lang]);

    if (!data)
        return <></>;

    return <div className="gridDisplay">
        {
            data.map((entry, i) =>
                <div className="tripCard" key={i}>
                        <a href={"../../trip/" + entry.url}>
                            <img className="tripImage" alt={entry.name} src={entry.preview} />
                            <div className="tripName">{entry.name}</div>
                        </a>
                </div>)
        }
    </div>
}

export default CitiesPage;