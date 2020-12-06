import React from 'react';
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
            <h2><a className="yearLink" href={"year/" + year.toString()}>{year}</a></h2>
            {
                data.filter(entry => entry.year == year).map(entry => <p>
                    <a className="tripLink" href={entry.link}>{entry.name}</a>
                </p>)
            }
        </>)

    }</>
}

export default ContentsPage;