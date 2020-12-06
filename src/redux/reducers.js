const INITIAL_STATE = {posts: [], tripData: undefined, countryList: []};

const postsReducer = (state = INITIAL_STATE , action) => {

    switch(action.type) {
        case 'FETCH_CONTENTS_SUCCESS':
            return {...state, posts: action.payload.posts}
        case 'FETCH_POST_SUCCESS':
            return {...state, tripData: action.payload.tripData}
        case 'FETCH_COUNTRY_LIST_SUCCESS':
            return {...state, countryList: action.payload.countryList}
        default:
            return state
    }
}

export default postsReducer;