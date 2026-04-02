/* NIRMANSUTRA MASTER CONFIG - MARCH 2026 */
const firebaseConfig = {
    apiKey: "AIzaSyDi2TQAvaqnz0D3eK6KZLYYhxsHUBG10A8",
    authDomain: "infradepo.firebaseapp.com",
    projectId: "infradepo",
    databaseURL: "https://infradepo-default-rtdb.asia-southeast1.firebasedatabase.app"
};

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const auth = firebase.auth();
const rtdb = firebase.database();
