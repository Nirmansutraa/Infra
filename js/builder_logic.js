/**
 * NIRMANSUTRA | BUILDER HUB LOGIC
 * Path: /js/builder_logic.js
 */

window.NS_Builder = {
    state: { photos: [], location: null, regData: {}, currentData: null },

    init(uid) {
        // 1. Profile Watcher
        rtdb.ref('builder_onboarding/' + uid).on('value', snap => {
            const data = snap.val();
            this.state.currentData = data;
            NS_UI.injectHeader('headerAnchor', 'Builder Hub');
            NS_UI.hideLoader();
            document.getElementById('app').classList.remove('hidden');
            
            if (data) {
                this.renderDashboard(data);
                this.loadRequirements(uid);
            } else {
                document.getElementById('regView').classList.remove('hidden');
                if(window.NS_Geo) setTimeout(() => NS_Geo.init('map'), 500);
            }
        });
    },

    renderDashboard(data) {
        document.getElementById('dashView').classList.remove('hidden');
        document.getElementById('regView').classList.add('hidden');
        
        // Fill Master Entity Card
        document.getElementById('bizName').innerText = data.firmName;
        document.getElementById('disp_rera').innerText = data.reraNum || 'Applied/NA';
        document.getElementById('disp_owner').innerText = data.ownerName;
        document.getElementById('disp_contact').innerText = `${data.ownerPhone} / ${data.ownerWa}`;
        document.getElementById('disp_site').innerText = data.siteAddress;
        document.getElementById('disp_gps').innerText = data.location ? `${data.location.lat.toFixed(5)}, ${data.location.lng.toFixed(5)}` : 'No Lock';
        
        const vBadge = document.getElementById('vBadge');
        if(data.status === 'approved') {
            vBadge.innerText = "Verified Builder";
            vBadge.className = "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-600";
            document.getElementById('heroTitle').innerText = "Active Construction Node";
            document.getElementById('statusHero').classList.add('border-orange-500');
        }
    },

    // --- HIGH-PRECISION PHOTO STAMPING ---
    processPhoto(input) {
        if(!this.state.location && !this.state.currentData.location) return alert("❌ Site GPS Lock Required.");
        const loc = this.state.location || this.state.currentData.location;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 1080; canvas.height = 810;
                ctx.drawImage(img, 0, 0, 1080, 810);

                ctx.fillStyle = "rgba(0,0,0,0.75)";
                ctx.fillRect(0, 710, 1080, 100);
                
                ctx.fillStyle = "#ff7a00";
                ctx.font = "bold 24px monospace";
                ctx.fillText("NIRMANSUTRA | SITE PROGRESS EVIDENCE", 40, 755);
                
                ctx.fillStyle = "#ffffff";
                ctx.font = "18px monospace";
                const stamp = `TS: ${new Date().toLocaleString()} | GPS: ${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)} | BUILDER_ID: ${auth.currentUser.uid.slice(0,8)}`;
                ctx.fillText(stamp, 40, 785);

                this.state.photos.push({ src: canvas.toDataURL('image/jpeg', 0.8), time: Date.now() });
                this.renderPhotoGrid();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    },

    renderPhotoGrid() {
        const grid = document.getElementById('photoGrid');
        grid.innerHTML = `<button onclick="document.getElementById('camInput').click()" class="photo-slot text-slate-300 text-5xl hover:bg-slate-100">+</button>`;
        this.state.photos.forEach((p, i) => {
            grid.innerHTML += `<div class="photo-slot" onclick="NS_Builder.removePhoto(${i})"><img src="${p.src}" class="w-full h-full object-cover"><div class="stamp-overlay">REMOVE</div></div>`;
        });
    },

    removePhoto(idx) { if(confirm("Discard site frame?")) { this.state.photos.splice(idx, 1); this.renderPhotoGrid(); } },

    toggleEdit() {
        document.getElementById('dashView').classList.add('hidden');
        document.getElementById('regView').classList.remove('hidden');
        document.getElementById('cancelBtn').classList.remove('hidden');
        const d = this.state.currentData;
        document.getElementById('firmName').value = d.firmName;
        document.getElementById('reraNum').value = d.reraNum || '';
        document.getElementById('ownerName').value = d.ownerName;
        document.getElementById('ownerMob').value = d.ownerPhone;
        document.getElementById('address').value = d.siteAddress;
        this.state.location = d.location;
    }
};
