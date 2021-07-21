import React from 'react'
import { Link } from 'react-router-dom'
import { fetchCountryListContents } from '../redux/actions';
import { selectCountryList } from '../redux/selectors';
import { useSelector } from 'react-redux'
import { store } from '../redux/store'

const CountryListPage = () => {
    let data = useSelector(selectCountryList);

    React.useEffect(() => store.dispatch(fetchCountryListContents()), []);

    return (
        <div>
            <ol>
                {
                    data.map(entry =>
                        <li>
                            <b><Link to={"../country/" + entry.eng_name} className="tripLink">{entry.rus_name}</Link></b>
                            {
                            entry.cities === "" ? null : 
                            <>
                            <span>: </span>
                            <span>
                                {entry.cities.join(", ")}
                            </span>
                            </>
                            }
                        </li>
                    )
                }
            </ol>
        </div>)
}

export default CountryListPage;