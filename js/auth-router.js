/* NIRMANSUTRA ACCESS CONTROL & ROUTING */
const MASTER_ROUTES = {
    'super_admin': 'admin/super_admin.html',
    'admin': 'admin/dashboard.html',
    'admin_staff': 'admin/dashboard.html',
    'field_survey_staff': 'field/dashboard.html',
    'Supplier': 'onboarding/supplierdashboard.html',
    'Builders': 'onboarding/builderdashboard.html',
    'Contractor': 'onboarding/contractordashboard.html',
    'HomeOwner': 'onboarding/homeownerdashboard.html',
    'FleetOwner': 'onboarding/fleetownerdashboard.html',
    'Labour Contractor': 'onboarding/laborcontractordashboard.html'
};

window.AuthRouter = {
    async redirect(user) {
        if (!user || window.location.search.includes('bypass=true')) return;

        const snap = await rtdb.ref(`users/${user.uid}`).once('value');
        const profile = snap.val() || {};
        const role = profile.role;

        if (role && MASTER_ROUTES[role]) {
            const target = MASTER_ROUTES[role];
            // Only redirect if not already on the correct page
            if (!window.location.pathname.includes(target)) {
                window.location.href = window.location.origin + '/' + target;
            }
        }
    }
};

auth.onAuthStateChanged(user => { if (user) AuthRouter.redirect(user); });
