const INITIAL_STATE = { posts: [], tripData: undefined, countryList: [], searchResults: [] };

const postsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'FETCH_CONTENTS_SUCCESS':
            return { ...state, posts: action.payload.posts }
        case 'FETCH_POST_SUCCESS':
            return { ...state, tripData: action.payload.tripData }
        case 'RESET_POST':
            return { ...state, tripData: undefined }
        case 'FETCH_COUNTRY_LIST_SUCCESS':
            return { ...state, countryList: action.payload.countryList }
        case 'FETCH_SEARCH_RESULTS_SUCCESS':
            return { ...state, searchResults: action.payload.searchResults }
        default:
            return state
    }
}

export default postsReducer;