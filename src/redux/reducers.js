const INITIAL_STATE = {posts: [], tripData: undefined};

const postsReducer = (state = INITIAL_STATE , action) => {

    switch(action.type) {
        case 'FETCH_CONTENTS_SUCCESS':
            return {...state, posts: action.payload.posts}
        case 'FETCH_POST_SUCCESS':
            return {...state, tripData: action.payload.tripData}
        default:
            return state
    }
}

export default postsReducer;