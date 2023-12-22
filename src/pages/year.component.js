import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { store } from '../redux/store'
import { fetchContents } from '../redux/actions'
import { useSelector } from 'react-redux'
import { selectLanguage, selectPostsByYear } from '../redux/selectors.js'
import './year.style.scss'

const YearPage = () => {
    let { year } = useParams();
    let data = useSelector((state) => selectPostsByYear(state, year));
    const lang = useSelector(selectLanguage)

    React.useEffect(() => store.dispatch(fetchContents(lang)), [lang]);

    return <div className="gridDisplay">
        {
            data.map(entry =>
                <div className="tripCard">
                    {
                        entry.link ?
                            <Link to={"../" + entry.link}>
                                <img alt={entry.name} src={entry.preview} class="tripImage" />
                                <div class="tripName">{entry.name}</div>
                            </Link>
                            :
                            <>
                                <img alt={entry.name} src={entry.preview} class="tripImage" />
                                <div class="tripNameFuture">{entry.name}</div>
                            </>

                    }
                </div>)
        }
    </div>
}

export default YearPage;