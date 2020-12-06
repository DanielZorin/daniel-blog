import React from 'react';
import { Link } from 'react-router-dom'
import { store } from '../redux/store'
import { fetchContents } from '../redux/actions'
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../redux/selectors.js'
import './contents.style.scss'

const ContentsPage = () => {
    let data = useSelector(selectAllPosts);

    React.useEffect(() => store.dispatch(fetchContents()), []);

    let years = []
    if (data) {
        years =  data.map(trip => trip.year);
        years = [...new Set(years)];
        years = years.sort().reverse();
    }

    return <>{
        years.map(year => <>
            <h2><Link className="yearLink" to={"year/" + year.toString()}>{year}</Link></h2>
            {
                data.filter(entry => entry.year == year).map(entry => <p>
                    <Link className="tripLink" to={entry.link}>{entry.name}</Link>
                </p>)
            }
        </>)

    }</>
}

export default ContentsPage;