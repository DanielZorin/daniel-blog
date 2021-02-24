import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { store } from '../redux/store'
import { fetchContents } from '../redux/actions'
import { useSelector } from 'react-redux'
import { selectPostsByYear } from '../redux/selectors.js'
import './year.style.scss'

const YearPage = () => {
    let { year } = useParams();
    let data = useSelector((state) => selectPostsByYear(state, year));

    React.useEffect(() => store.dispatch(fetchContents()), []);

    return <div className="gridDisplay">
        {
        data.map(entry => 
            <div className="tripCard">
                <Link to={"../" + entry.link}>
                    <img src={entry.preview} class="tripImage" />
                    <div class="tripName">{entry.name}</div>
                </Link>
            </div>)
        }
        </div>
}

export default YearPage;