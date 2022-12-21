import axios from 'axios'
import { firebaseFetchCities, firebaseFetchContents, firebaseFetchCountryList, firebaseFetchPost } from './firebase';

const URL_PREFIX = process.env.REACT_APP_URL_PREFIX ? process.env.REACT_APP_URL_PREFIX : "";

//synchronous action creator
const fetchContentsSuccess = posts => ({
    type: 'FETCH_CONTENTS_SUCCESS',
    payload: { posts }
})

const fetchPostSuccess = (tripId, tripData) => ({
    type: 'FETCH_POST_SUCCESS',
    payload: { tripId, tripData }
})

const fetchCountryListSuccess = countryList => ({
    type: 'FETCH_COUNTRY_LIST_SUCCESS',
    payload: { countryList }
})

const fetchCitiesSuccess = citiesList => ({
    type: 'FETCH_CITIES_SUCCESS',
    payload: { citiesList: citiesList }
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
            let posts = await firebaseFetchContents()
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
            let tripData = await firebaseFetchPost(tripId)
            dispatch(fetchPostSuccess(tripId, tripData))
        }
        catch(e){
            console.log(e)
        }
    }
}

export const fetchCountryListContents =  () => {
    return async dispatch => {
        try {
            let posts = await firebaseFetchCountryList()
            dispatch(fetchCountryListSuccess(posts))
        }
        catch(e){
            console.log("ERROR IN DISPATCH " + e)
        }
    }
}

export const fetchCities =  () => {
    return async dispatch => {
        try {
            let posts = await firebaseFetchCities()
            dispatch(fetchCitiesSuccess(posts))
        }
        catch(e){
            console.log("ERROR IN DISPATCH  " + e)
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