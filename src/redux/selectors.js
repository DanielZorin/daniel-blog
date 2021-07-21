export const selectAllPosts = state => state.posts

export const selectPostsByYear = (state, year) => state.posts.filter(
    entry => entry.year.toString() === year)

export const selectPostsByCountry = (state, country) => state.posts.filter(
    entry => entry.country_eng === country)

export const selectCurrentPost = state => state.tripData

export const selectCurrentPostId = state => state.tripId

export const selectCountryList = state => state.countryList

export const selectSearchResults = state => state.searchResults