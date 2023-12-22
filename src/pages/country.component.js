import React from 'react'
import { useParams } from "react-router-dom";
import { store } from '../redux/store'
import { fetchContents } from '../redux/actions'
import { useSelector } from 'react-redux'
import { selectAllPosts, selectLanguage, selectPostsByCountry } from '../redux/selectors.js'
import './year.style.scss'

const CountryPage = () => {
    let { countryId } = useParams();
    let data = useSelector((state) => selectPostsByCountry(state, countryId));
    console.log(countryId, data)

    let data2 = useSelector(selectAllPosts);
    console.log(data2)

    const lang = useSelector(selectLanguage)

    React.useEffect(() => store.dispatch(fetchContents(lang)), [lang]);

    return <div className="gridDisplay">
        {
            data.map(entry =>
                <div className="tripCard">
                    {
                        entry.link ?
                            <a href={"../" + entry.link}>
                                <img src={entry.preview} width="200px" />
                                <div class="tripName">{entry.name}</div>
                            </a>
                            :
                            <>
                                <img src={entry.preview} width="200px" />
                                <div class="tripNameFuture">{entry.name}</div>
                            </>
                    }
                </div>)
        }
    </div>
}

export default CountryPage;