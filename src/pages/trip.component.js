import React from 'react'
import { useParams } from "react-router-dom";
import { store } from '../redux/store'
import { fetchPost } from '../redux/actions'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { selectCurrentPost } from '../redux/selectors.js'
import './contents.style.scss'

const TripPage = () => {
    let { tripId } = useParams();
    let data = useSelector(selectCurrentPost);
    React.useEffect(() => store.dispatch(fetchPost(tripId)), [tripId]);

    if (!data)
        return <div></div>

    return (
        <div>
            <Helmet>
                <title>{data.title} - Daniel A. Zorin</title>
                <meta name="description" content="Blog post" />
            </Helmet>

            <h1>{data.title}</h1>
            <i>{data.dates}</i>
            {
                data.content.map((e) => {
                    switch (e.type) {
                        case "text":
                            return <p dangerouslySetInnerHTML={{ __html: e.src }}></p>
                        case "image":
                            return <img className="trip-photo" src={e.src} />
                        case "section":
                            return <h2>{e.src}</h2>
                        case "separator":
                            return <center> * * * </center>
                    }
                    return "";
                }
                )
            }
        </div>
    );
}

export default TripPage;