/**
 * NIRMANSUTRA CENTRAL CONFIGURATION v2.0
 * This file serves as the Single Source of Truth for all modular nodes.
 */

const firebaseConfig = {
    apiKey: "AIzaSyDi2TQAvaqnz0D3eK6KZLYYhxsHUBG10A8",
    authDomain: "infradepo.firebaseapp.com",
    projectId: "infradepo",
    databaseURL: "https://infradepo-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Global Initialization to prevent "Already Initialized" errors
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Global Export for application scripts
const rtdb = firebase.database();
const auth = firebase.auth();

console.log("[SYSTEM] Cloud Intelligence Link Established.");
