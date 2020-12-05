import React from 'react';
import { store } from '../redux/store'
import { fetchContents } from '../redux/actions'
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../redux/selectors.js'

const ContentsPage = () => {
    let data = useSelector(selectAllPosts);

    React.useEffect(() => store.dispatch(fetchContents()), []);

    return <div dangerouslySetInnerHTML={{__html: data}}></div>;
} 

export default ContentsPage;