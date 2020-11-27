import React from 'react';
import axios from 'axios';

/* For local debugging set to 1 */
const DEBUG = 1;

/* Debug variables.*/
const PREFIX = DEBUG ? "http://localhost:80" : "";

const ContentsPage = () => {
    const [data, setData] = React.useState(null)
    
    React.useEffect(() => axios.get(PREFIX + "/get_index").then(res => {setData(res.data.trip)}), []);
    console.log(data);
    return <div dangerouslySetInnerHTML={{__html: data}}></div>;
} 

export default ContentsPage;