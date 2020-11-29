import React from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

/* For local debugging set to 1 */
const DEBUG = 1;

/* Debug variables.*/
const PREFIX = DEBUG ? "http://localhost:80" : "";

const TripPage = () => {
    let { tripId } = useParams();
    console.log(tripId)
    const [data, setData] = React.useState(null)
    let URL = PREFIX + "/get_trip/" + tripId;
    React.useEffect(() => axios.get(URL).then(res => { setData(res.data.trip) }), [URL]);
    if (data)
        console.log(data.content)
    if (!data)
        return <div></div>
    return (
        <div>
            <h1>{data.title}</h1>
            <i>{data.dates}</i>
            {

                data.content.map((e) => {
                    switch (e.type) {
                        case "text":
                            return <p dangerouslySetInnerHTML={{ __html: e.src }}></p>
                        case "image":
                            return <img src={e.src} />
                        case "section":
                            return <h2>{e.src}</h2>
                    }
                }
                )
            }
        </div>
    );
}

export default TripPage;