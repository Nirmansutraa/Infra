/* NIRMANSUTRA DATA-SYNC v1.1 */
window.NS_Data = {
    // 1. Logic for handling and compressing photos
    processPhoto(file, currentPhotos, callback) {
        if (currentPhotos.length >= 10) {
            alert("Maximum 10 photos allowed.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                // Standardize size to 800x600 for performance
                canvas.width = 800; canvas.height = 600;
                ctx.drawImage(img, 0, 0, 800, 600);
                
                // Add a simple timestamp watermark
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fillRect(0, 560, 800, 40);
                ctx.fillStyle = "white";
                ctx.font = "bold 15px Arial";
                ctx.fillText(`NirmanSutra Audit: ${new Date().toLocaleString()}`, 20, 585);

                const base64 = canvas.toDataURL('image/jpeg', 0.7);
                callback({ src: base64, time: new Date().toLocaleString() });
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    },

    // 2. Logic for saving data to any Firebase Node
    async saveToNode(path, payload) {
        try {
            const user = firebase.auth().currentUser;
            if (!user) throw new Error("No active session found.");

            const finalData = {
                ...payload,
                agent_email: user.email,
                agent_uid: user.uid,
                timestamp: Date.now(),
                server_sync: true
            };

            // If the path is supplier_onboarding, we use UID as key
            if (path.includes('supplier_onboarding')) {
                await firebase.database().ref(`${path}/${user.uid}`).set(finalData);
            } else {
                // Otherwise, we push a new unique entry (for Site/Survey)
                await firebase.database().ref(path).push(finalData);
            }

            return { success: true };
        } catch (error) {
            console.error("Sync Error:", error);
            return { success: false, error: error.message };
        }
    }
};
