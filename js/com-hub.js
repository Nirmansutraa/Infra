/* NIRMANSUTRA COMMUNICATION HUB (Authkey.io Integration) */
window.NS_Comm = {
    // Replace with your actual key from authkey.io dashboard later
    authKey: "YOUR_AUTHKEY_API_KEY_HERE", 
    sid: "YOUR_SENDER_ID",

    // This function decides whether to use real SMS or just simulate it
    async sendOTP(mobile, type = 'sms') {
        console.log(`NS_Comm: Initiating ${type} for ${mobile}`);

        // SET TO 'false' WHEN YOU ARE READY TO SPEND CREDITS ON REAL SMS
        const isTesting = true; 

        if (isTesting) {
            console.log("NS_Comm: Simulation Mode - OTP is 123456");
            return { success: true, message: "Simulated" };
        }

        // REAL AUTHKEY.IO API CALL
        try {
            const url = `https://authkey.io/index.php?route=otp/send&authkey=${this.authKey}&mobile=${mobile}&country_code=91&sid=${this.sid}&otp=123456`;
            
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Authkey API Error:", error);
            return { success: false, error: error.message };
        }
    }
};
