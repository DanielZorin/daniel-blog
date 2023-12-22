import React from 'react';
import { Link } from 'react-router-dom'
import { store } from '../redux/store'
import { fetchContents } from '../redux/actions'
import { useSelector } from 'react-redux'
import { selectAllPosts, selectLanguage } from '../redux/selectors.js'
import './contents.style.scss'

const ContentsPage = () => {
    //const lang = new URLSearchParams(location.search).get('lang') || 'ru';
    const lang = useSelector(selectLanguage)

    let data = useSelector(selectAllPosts);
    React.useEffect(() => store.dispatch(fetchContents(lang)), [lang]);

    let years = []
    if (data) {
        years = data.map(trip => trip.year);
        years = [...new Set(years)];
        years = years.sort().reverse();
    }

    return years.map((year, j) => <div key={j}>
        <h2>
            <Link className="yearLink" to={"year/" + year.toString()}>{year}</Link>
        </h2>
        {
            data.filter(entry => entry.year === year).map((entry, i) =>
                <p key={i}>
                    {
                        entry.link ?
                            <Link className="tripLink" to={entry.link}>{entry.name}</Link>
                            : <span className="tripLinkFuture">{entry.name}</span>
                    }
                </p>)
        }
    </div>)
}

export default ContentsPage;