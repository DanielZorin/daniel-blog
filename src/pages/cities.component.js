import React from 'react'
import { useParams } from "react-router-dom";
import { store } from '../redux/store'
import { fetchCities } from '../redux/actions'
import { useSelector } from 'react-redux'
import { selectCities } from '../redux/selectors.js'
import './year.style.scss'

const CitiesPage = () => {
    let { countryId } = useParams();
    let data = useSelector((state) => selectCities(state, countryId));

    React.useEffect(() => store.dispatch(fetchCities()), []);

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