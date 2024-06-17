import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, orderByChild, equalTo, query, startAt, limitToFirst, limitToLast, endBefore } from "firebase/database";
import { limit } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqVSNU7tRoZvQ5sHaUIeO4ASCFShBLIdk",
  authDomain: "homepage-d40ae.firebaseapp.com",
  databaseURL: "https://homepage-d40ae.firebaseio.com",
  projectId: "homepage-d40ae",
  storageBucket: "homepage-d40ae.appspot.com",
  messagingSenderId: "134761004772",
  appId: "1:134761004772:web:83c33e80218c509a6936f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const firebaseFetchContents = async (lang = "ru") => {
  const dbRef = ref(database);
  const path = `${lang}/contents`;
  return get(child(dbRef, path)).then((snapshot) => snapshot.val());
};

export const firebaseFetchPostFeed = async (lang, page, per_page = 10) => {
  const dbRef = ref(database);
  const totalPosts = await get(child(dbRef, `${lang}/post-count`)).then((snapshot) => snapshot.val());
  const totalPages = Math.ceil(totalPosts / per_page);
  const postsRef = ref(database, `${lang}/posts`);
  console.log(page, per_page)

  try {
    // Fetch the posts for the current page
    let postsQuery;
    if (page === 1) {
      postsQuery = query(
        postsRef,
        orderByChild("date"),
        limitToLast(per_page)
      );
    } else {

      postsQuery = query(
        postsRef,
        orderByChild("date"),
        startAt((page - 1) * per_page),
        limit(per_page)
      );
    }

    // Execute the query
    const querySnapshot = await get(postsQuery);

    // Extract posts data
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.unshift({ id: doc.key, ...doc.val() });
    });

    return {
      totalPosts,
      totalPages,
      posts,
    };
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
};



export const firebaseFetchPost = async (tripId, lang = "ru") => {
  const dbRef = ref(database);
  const path = `${lang}/posts/${tripId}`;
  return get(child(dbRef, path)).then((snapshot) => snapshot.val());
};

export const firebaseFetchCountryList = async (lang = "ru") => {
  const dbRef = ref(database);
  const path = `${lang}/country_list`;
  return get(child(dbRef, path)).then((snapshot) => snapshot.val());
};

export const firebaseFetchPlans = async (lang = "ru") => {
  const dbRef = ref(database);
  const path = `${lang}/plans`;
  return get(child(dbRef, path)).then((snapshot) => snapshot.val());
};

export const firebaseFetchCities = async (lang = "ru") => {
  const dbRef = ref(database);
  const path = `${lang}/cities`;
  return get(child(dbRef, path)).then((snapshot) => snapshot.val());
};

export default app;
