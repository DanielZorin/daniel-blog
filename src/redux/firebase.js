import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  child,
  get,
  orderByChild,
  query,
  limitToLast,
  endAt,
} from "firebase/database";
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
  const totalPosts = await get(child(dbRef, `${lang}/post-count`)).then(
    (snapshot) => snapshot.val()
  );
  const totalPages = Math.ceil(totalPosts / per_page);
  const postsRef = ref(database, `${lang}/posts`);

  try {
    let startDate = null;

    if (page > 1) {
      // Fetch the previous pages snapshot to determine the start date for the current page
      const previousPageSnapshot = await get(
        query(
          postsRef,
          orderByChild("date"),
          limitToLast((page - 1) * per_page)
        )
      );

      const previousPagePosts = previousPageSnapshot.val() || {};
      const sortedPreviousPagePosts = Object.values(previousPagePosts).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      if (sortedPreviousPagePosts.length > 0) {
        startDate =
          sortedPreviousPagePosts[sortedPreviousPagePosts.length - 1].date;
      }
    }

    // Fetch the current page posts based on the start date
    const currentPageQuery = startDate
      ? query(
          postsRef,
          orderByChild("date"),
          endAt(startDate),
          limitToLast(per_page)
        )
      : query(postsRef, orderByChild("date"), limitToLast(per_page));

    const currentPageSnapshot = await get(currentPageQuery);
    const currentPagePosts = currentPageSnapshot.val() || {};
    const posts = Object.entries(currentPagePosts)
      .map(([id, data]) => ({
        id,
        ...data,
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Ensure the posts are sorted in reverse order

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
  const path = `${lang}/posts/${lang}-${tripId}`;
  console.log(path)
  return get(child(dbRef, path)).then((snapshot) => snapshot.val());
};

export const firebaseFetchPage = async (page, lang = "ru") => {
  const dbRef = ref(database);
  const path = `${lang}/${page}`;
  return get(child(dbRef, path)).then((snapshot) => snapshot.val());
};

export default app;
