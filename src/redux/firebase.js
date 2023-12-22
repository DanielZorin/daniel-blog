import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
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
    appId: "1:134761004772:web:83c33e80218c509a6936f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const firebaseFetchContents = async (lang = "ru") => {
    const dbRef = ref(database);
    const path = `${lang}/contents`;
    return get(child(dbRef, path)).then((snapshot) => snapshot.val());
}

export const firebaseFetchPost = async (tripId, lang = "ru") => {
    const dbRef = ref(database);
    const path = `${lang}/trips/${tripId}`;
    return get(child(dbRef, path)).then((snapshot) => snapshot.val());
}

export const firebaseFetchCountryList = async (lang = "ru") => {
    const dbRef = ref(database);
    const path = `${lang}/country_list`;
    return get(child(dbRef, path)).then((snapshot) => snapshot.val());
}

export const firebaseFetchCities = async (lang = "ru") => {
    const dbRef = ref(database);
    const path = `${lang}/cities`;
    return get(child(dbRef, path)).then((snapshot) => snapshot.val());
}

export default app;