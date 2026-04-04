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

/**
 * GLOBAL UI NAVIGATION HELPERS
 * These functions power the Back and Logout buttons on every page.
 */
window.NS_Auth = {
    // Standard App-Style Back Logic
    goBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback to home if no history exists
            window.location.href = "/index.html";
        }
    },

    // Standard Sovereign Logout
    logout() {
        if (confirm("Are you sure you want to log out?")) {
            auth.signOut().then(() => {
                window.location.href = "/index.html";
            }).catch((error) => {
                alert("Logout failed: " + error.message);
            });
        }
    }
};

/**
 * CONNECTIVITY MONITOR
 * Verifies real-time link with the Asia-Southeast1 Database node.
 */
rtdb.ref(".info/connected").on("value", (snap) => {
    if (snap.val() === true) {
        console.log("[SYSTEM] Database Node: ONLINE 🚀");
    } else {
        console.warn("[SYSTEM] Database Node: OFFLINE ⚠️");
    }
});
