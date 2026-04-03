/**
 * NIRMANSUTRA MASTER ROLE MATRIX
 * Centralized registry for all user categories and their destinations.
 */

const NS_ROLES = {
    // ADMIN TIER
    'Super_Admin': { label: 'Sovereign: Master Admin', path: '/admin/super_admin.html' },
    'Admin_Staff': { label: 'Staff: Admin Support', path: '/admin/dashboard.html' },
    
    // FIELD TIER
    'field_survey_staff': { label: 'Staff: Field Agent', path: '/field/dashboard.html' },
    
    // PARTNER TIER
    'Supplier': { label: 'Partner: Supplier', path: '/field/supplier/dashboard.html' },
    'Builder': { label: 'Partner: Builder', path: '/field/builder/dashboard.html' },
    'Contractor': { label: 'Partner: Contractor', path: '/field/contractor/dashboard.html' },
    
    // PUBLIC TIER
    'HomeOwner': { label: 'Partner: Home Owner', path: '/field/homeowner/dashboard.html' },
    'Labour_Contractor': { label: 'Partner: Labour Contractor', path: '/field/labour/dashboard.html' },
    'Fleet_Owner': { label: 'Partner: Fleet Operator', path: '/field/fleet/dashboard.html' }
};

// Global Utility to load these roles into any <select> dropdown
const NS_UI = {
    loadRoles(selectId) {
        const select = document.getElementById(selectId);
        if(!select) return;
        select.innerHTML = ""; // Clear existing
        Object.keys(NS_ROLES).forEach(key => {
            const opt = document.createElement('option');
            opt.value = key;
            opt.innerText = NS_ROLES[key].label;
            select.appendChild(opt);
        });
    }
};
