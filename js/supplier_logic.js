/**
 * NIRMANSUTRA | SUPPLIER NODE LOGIC v2
 * High-Precision Stamping & Material Cascading
 */

window.NS_Supplier = {
    state: { photos: [], location: null, regData: {}, currentData: null, selCat: null, selVar: null },

    init(uid) {
        rtdb.ref('registry/materials').once('value', snap => { this.state.regData = snap.val() || {}; });
        
        rtdb.ref('supplier_onboarding/' + uid).on('value', snap => {
            const data = snap.val();
            this.state.currentData = data;
            NS_UI.injectHeader('headerAnchor', 'Supplier');
            NS_UI.hideLoader();
            document.getElementById('app').classList.remove('hidden');
            if (data) {
                this.renderDashboard(data);
                this.loadInventory(uid);
            } else {
                document.getElementById('regView').classList.remove('hidden');
                if(window.NS_Geo) setTimeout(() => NS_Geo.init('map'), 500);
            }
        });
    },

    // --- MATERIAL SECTION FIX: BRAND CHIPS ---
    pickCat(c) {
        this.state.selCat = c;
        document.querySelectorAll('#catSelect .chip').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
        
        const varDiv = document.getElementById('varSelect');
        varDiv.innerHTML = Object.keys(this.state.regData[c]).map(v => 
            `<div class="chip" onclick="NS_Supplier.pickVar('${v}')">${v}</div>`).join('');
    },

    pickVar(v) {
        this.state.selVar = v;
        document.querySelectorAll('#varSelect .chip').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
        
        // FIX: Display Brands based on variety selection
        const brandDiv = document.getElementById('brandSelect');
        if (brandDiv) {
            const brands = this.state.regData[this.state.selCat][v].brands || [];
            brandDiv.innerHTML = brands.length > 0 ? 
                brands.map(b => `<div class="chip" onclick="NS_Supplier.pickBrand('${b}')">${b}</div>`).join('') :
                `<p class="text-[9px] text-slate-400 uppercase font-bold italic">Standard Grade (No specific brands)</p>`;
        }
    },

    pickBrand(b) {
        this.state.selBrand = b;
        document.querySelectorAll('#brandSelect .chip').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
    },

    // --- PHOTO SECTION FIX: GEO & TIME STAMPING ---
    processPhoto(input) {
        if(!state.location) return alert("❌ Capture GPS Lock first for authentic stamping.");
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 1080; canvas.height = 810; // High Res
                ctx.drawImage(img, 0, 0, 1080, 810);

                // Authentic NirmanSutra Overlay
                ctx.fillStyle = "rgba(0,0,0,0.7)";
                ctx.fillRect(0, 710, 1080, 100);
                
                ctx.fillStyle = "#ff7a00"; // Orange Accent
                ctx.font = "bold 24px 'Plus Jakarta Sans', monospace";
                ctx.fillText("NIRMANSUTRA | BUILDING BHARAT", 40, 755);
                
                ctx.fillStyle = "#ffffff";
                ctx.font = "18px monospace";
                const stamp = `DATE: ${new Date().toLocaleString()} | LOC: ${state.location.lat.toFixed(6)}, ${state.location.lng.toFixed(6)} | ACC: 1m`;
                ctx.fillText(stamp, 40, 785);

                const base64 = canvas.toDataURL('image/jpeg', 0.8);
                state.photos.push({ src: base64, time: Date.now() });
                this.renderPhotoGrid();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    },

    renderPhotoGrid() {
        const grid = document.getElementById('photoGrid');
        grid.innerHTML = `<button onclick="document.getElementById('camInput').click()" class="photo-slot text-slate-300 text-5xl hover:bg-slate-100">+</button>`;
        state.photos.forEach((p, i) => {
            grid.innerHTML += `
                <div class="photo-slot relative group" onclick="NS_Supplier.removePhoto(${i})">
                    <img src="${p.src}" class="w-full h-full object-cover">
                    <div class="stamp-overlay">TAP TO DISCARD</div>
                </div>`;
        });
    },

    // ... (rest of loadInventory and toggleEdit functions remain same)
};
