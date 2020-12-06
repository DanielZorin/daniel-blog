import React from 'react'
import { useParams } from "react-router-dom";
import { store } from '../redux/store'
import { fetchContents } from '../redux/actions'
import { useSelector } from 'react-redux'
import { selectPostsByCountry } from '../redux/selectors.js'
import './year.style.scss'

const CountryPage = () => {
    let { countryId } = useParams();
    let data = useSelector((state) => selectPostsByCountry(state, countryId));

    React.useEffect(() => store.dispatch(fetchContents()), []);

    return <div className="gridDisplay">
        {
        data.map(entry => 
            <div className="tripCard">
                <a href={"../" + entry.link}>
                    <img src={entry.preview} width="200px"/>
                    <div class="tripName">{entry.name}</div>
                </a>
            </div>)
        }
        </div>
}

export default CountryPage;