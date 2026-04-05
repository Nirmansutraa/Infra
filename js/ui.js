/**
 * NIRMANSUTRA | SOVEREIGN UI ENGINE
 * Path: /js/ui.js
 */

window.NS_UI = {
    brand: "NirmanSutra",
    tagline: "Building Bharat",

    // FIX: This was missing and caused your error
    hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    },

    showLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.innerHTML = `
                <div class="flex flex-col items-center justify-center min-h-screen">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
                    <p class="font-black text-slate-400 uppercase tracking-[5px] text-[10px]">Syncing NirmanSutra...</p>
                </div>
            `;
            loader.classList.remove('hidden');
        }
    },

    injectHeader(containerId, roleName) {
        const target = document.getElementById(containerId);
        if (!target) return;

        target.innerHTML = `
            <header class="flex justify-between items-center mb-8 sticky top-0 bg-[#f8fafc] py-4 z-50 px-2 border-b border-slate-100">
                <button onclick="window.history.back()" class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 active:scale-95">
                    <i data-lucide="chevron-left" class="w-6 h-6 text-slate-600"></i>
                </button>
                
                <div class="text-center">
                    <h1 class="text-xl font-black italic uppercase leading-none">
                        Nirman<span class="text-orange-500">Sutra</span>
                    </h1>
                    <p class="text-[8px] font-bold text-slate-400 uppercase tracking-[3px] mt-1">${this.tagline}</p>
                </div>

                <button onclick="auth.signOut().then(()=>window.location.href='/')" class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 active:scale-95">
                    <i data-lucide="log-out" class="w-6 h-6 text-red-500"></i>
                </button>
            </header>
        `;
        if (window.lucide) lucide.createIcons();
    }
};
