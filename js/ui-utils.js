/* NIRMANSUTRA MASTER UI UTILITIES */
window.NS_UI = {
    // 1. MASTER PROJECT ROLES (Permanent Registry)
    projectRoles: [
        { id: "Supplier", label: "Supplier (Material Shop)" },
        { id: "Builders", label: "Builder / Developer" },
        { id: "Contractor", label: "General Contractor" },
        { id: "field_survey_staff", label: "Field Survey Staff" },
        { id: "FleetOwner", label: "Fleet / Truck Owner" },
        { id: "HomeOwner", label: "Home Owner" },
        { id: "Labour Contractor", label: "Labour Contractor" },
        { id: "admin", label: "System Admin" },
        { id: "super_admin", label: "Master Super Admin" }
    ],

    // 2. Dropdown Auto-Loader
    loadRoles(elementId) {
        const select = document.getElementById(elementId);
        if (!select) return;
        select.innerHTML = ""; // Clear existing options
        this.projectRoles.forEach(role => {
            let opt = document.createElement('option');
            opt.value = role.id;
            opt.textContent = role.label;
            select.appendChild(opt);
        });
    },

    // 3. Password Eye Toggle
    toggleEye(id) {
        const el = document.getElementById(id);
        if (el) el.type = el.type === 'password' ? 'text' : 'password';
    },
    
    // 4. Notifications
    notify(msg) { 
        alert("NirmanSutra: " + msg); 
    },
    
    // 5. Multi-Field Resolver (For Dashboards)
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
