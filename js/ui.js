/**
 * NIRMANSUTRA | SOVEREIGN UI ENGINE
 * Path: /js/ui.js
 */

window.NS_UI = {
    brand: "NirmanSutra",
    tagline: "Building Bharat",

    // This is the function the error is complaining about!
    hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    },

    // This handles the standardized header for all dashboards
    injectHeader(containerId, roleName) {
        const target = document.getElementById(containerId);
        if (!target) return;

        target.innerHTML = `
            <header class="flex justify-between items-center mb-8 sticky top-0 bg-[#f8fafc] py-4 z-50 px-2 border-b border-slate-100">
                <button onclick="NS_Auth.goBack()" class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 active:scale-95">
                    <i data-lucide="chevron-left" class="w-6 h-6 text-slate-600"></i>
                </button>
                
                <div class="text-center">
                    <h1 class="text-xl font-black italic uppercase leading-none">
                        Nirman<span class="text-orange-500">Sutra</span>
                    </h1>
                    <p class="text-[8px] font-bold text-slate-400 uppercase tracking-[3px] mt-1">Building Bharat</p>
                </div>

                <button onclick="NS_Auth.logout()" class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 active:scale-95">
                    <i data-lucide="log-out" class="w-6 h-6 text-red-500"></i>
                </button>
            </header>
            <div class="mb-8 px-2">
                <h2 class="text-3xl font-black italic tracking-tighter uppercase text-slate-900 leading-none">Dashboard</h2>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[4px] mt-1 italic">${roleName} Node</p>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
    }
};
