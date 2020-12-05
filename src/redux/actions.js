import axios from 'axios'

/* For local debugging set to 1 */
const DEBUG = 1;
const URL_PREFIX = DEBUG ? "http://localhost:80" : "";

//synchronous action creator
const fetchContentsSuccess = posts => ({
    type: 'FETCH_CONTENTS_SUCCESS',
    payload: { posts }
})

const fetchPostSuccess = tripData => ({
    type: 'FETCH_POST_SUCCESS',
    payload: { tripData }
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
            let tripData = await axios.get(URL_PREFIX + "/get_trip/" + tripId).then(res => res.data.trip)
            dispatch(fetchPostSuccess(tripData))
        }
        catch(e){
            console.log(e)
        }
    }
}