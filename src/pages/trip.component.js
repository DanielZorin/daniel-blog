import React from 'react'
import { useParams } from "react-router-dom";
import { store } from '../redux/store'
import { fetchPost } from '../redux/actions'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { selectCurrentPost, selectCurrentPostId, selectLanguage } from '../redux/selectors.js'
import './contents.style.scss'

const TripPage = () => {
    let { tripId } = useParams();
    const lang = useSelector(selectLanguage)

    let data = useSelector(selectCurrentPost);
    let curId = useSelector(selectCurrentPostId);
    React.useEffect(() => store.dispatch(fetchPost(tripId, lang)), [tripId, lang]);

    if (!data || (tripId !== curId))
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
                data.content.map((e, i) => {
                    switch (e.type) {
                        case "text":
                            return <p key={i} dangerouslySetInnerHTML={{ __html: e.src }}></p>
                        case "image":
                            return <img key={i} alt="" className="trip-photo" src={e.src} />
                        case "section":
                            return <><a name={e.bookmark} id={e.bookmark}></a><h2 key={i}>{e.src}</h2></>
                        case "separator":
                            return <><a name={e.bookmark} id={e.bookmark}></a><center key={i}> * * * </center></>
                        default:
                            return "";
                    }
                }
                )
            }
        </div>
    );
}

export default TripPage;