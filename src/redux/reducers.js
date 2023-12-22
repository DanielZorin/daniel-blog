const INITIAL_STATE = { language: "ru", posts: [], tripData: undefined, tripId: undefined, countryList: [], citiesList: {}, searchResults: [] };

const postsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'FETCH_CONTENTS_SUCCESS':
            return { ...state, posts: action.payload.posts }
        case 'FETCH_POST_SUCCESS':
            return { ...state, tripData: action.payload.tripData, tripId: action.payload.tripId }
        case 'FETCH_COUNTRY_LIST_SUCCESS':
            return { ...state, countryList: action.payload.countryList }
        case 'FETCH_CITIES_SUCCESS':
            return { ...state, citiesList: action.payload.citiesList }
        case 'FETCH_SEARCH_RESULTS_SUCCESS':
            return { ...state, searchResults: action.payload.searchResults }
        case 'SET_LANGUAGE':
            return { ...state, language: action.payload };
        default:
            return state
    }
}

export default postsReducer;