/* NIRMANSUTRA COMMON UI UTILS */
window.NS_UI = {
    toggleEye(id) {
        const el = document.getElementById(id);
        if (el) el.type = el.type === 'password' ? 'text' : 'password';
    },
    
    notify(msg) { alert("NirmanSutra: " + msg); },
    
    // Multi-Field Resolver (From your Super Admin code)
    resolveField(dataObj, keyVariations) {
        if (!dataObj) return "N/A";
        for (let targetKey of keyVariations) {
            if (dataObj[targetKey] && dataObj[targetKey] !== "" && dataObj[targetKey] !== "N/A") {
                return dataObj[targetKey];
            }
        }
        return "N/A";
    }
};
