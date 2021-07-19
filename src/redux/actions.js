import axios from 'axios'

const URL_PREFIX = process.env.REACT_APP_URL_PREFIX ? process.env.REACT_APP_URL_PREFIX : "";

//synchronous action creator
const fetchContentsSuccess = posts => ({
    type: 'FETCH_CONTENTS_SUCCESS',
    payload: { posts }
})

const fetchPostSuccess = tripData => ({
    type: 'FETCH_POST_SUCCESS',
    payload: { tripData }
})

const resetCurrentPost = () => ({
    type: 'RESET_POST',
    payload: { }
})

const fetchCountryListSuccess = countryList => ({
    type: 'FETCH_COUNTRY_LIST_SUCCESS',
    payload: { countryList }
})

const fetchSearchResultsSuccess = data => ({
    type: 'FETCH_SEARCH_RESULTS_SUCCESS',
    payload: { searchResults: data }
})

/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const fetchContents =  () => {
    return async dispatch => {
        try {
            let posts = await axios.get(URL_PREFIX + "/get_index").then(res => res.data.trip)
            dispatch(fetchContentsSuccess(posts))
        }
        catch(e){
            console.log("ERROR IN DISPATCH " + e)
        }
    }
}

export const fetchPost =  (tripId) => {
    return async dispatch => {
        try {
            dispatch(resetCurrentPost())
            let tripData = await axios.get(URL_PREFIX + "/get_trip/" + tripId).then(res => res.data.trip)
            dispatch(fetchPostSuccess(tripData))
        }
        catch(e){
            console.log(e)
        }
    }
}

export const fetchCountryListContents =  () => {
    return async dispatch => {
        try {
            let posts = await axios.get(URL_PREFIX + "/get_country_list").then(res => res.data.trip)
            dispatch(fetchCountryListSuccess(posts))
        }
        catch(e){
            console.log("ERROR IN DISPATCH " + e)
        }
    }
}

export const fetchSearchResults =  (query) => {
    return async dispatch => {
        try {
            let posts = await axios.get(URL_PREFIX + "/search/" + query).then(res => res.data.result)
            dispatch(fetchSearchResultsSuccess(posts))
        }
        catch(e){
            console.log("ERROR IN DISPATCH " + e)
        }
    }
}