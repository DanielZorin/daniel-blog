export const selectAllPosts = state => state.posts

export const selectPostsByYear = (state, year) => state.posts.filter(entry => entry.year.toString() === year)

export const selectCurrentPost = state => state.tripData