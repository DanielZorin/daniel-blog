import React from 'react'
import { Link, useParams } from 'react-router-dom';

const SearchPage = () => {
    let { query } = useParams();
    const data = [query]
    const shorten = (s) => {
        if (s.length < 300)
            return s;
        let ind = s.indexOf("<b>")
        let new_s = s.slice(Math.max(0, ind-150), Math.min(ind+150, s.length))
        console.log(ind, s, new_s)
        if (ind > 150)
            new_s = "..." + new_s;
        if (ind + 150 < s.length)
            new_s = new_s + "..."
        return new_s
    }

    return data.map(entry => <div>
        <p>
            <Link className="tripLink" to={"../../trip/" + entry.url}>{entry.title}</Link>
        </p>
        <p className="searchResultText" dangerouslySetInnerHTML={{ __html: shorten(entry.string) }}>
        </p>
    </div>)
}

export default SearchPage;