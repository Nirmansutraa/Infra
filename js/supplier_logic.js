/**
 * NIRMANSUTRA | SUPPLIER NODE LOGIC
 * Path: /js/supplier_logic.js
 */

window.NS_Supplier = {
    state: { photos: [], location: null, mat: null, varieties: [], brands: [], fleet: {}, regData: {}, currentData: null },

    init(uid) {
        // 1. Load Registry for select boxes
        rtdb.ref('registry/materials').once('value', snap => { this.state.regData = snap.val() || {}; });

        // 2. Profile Watcher
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

    renderDashboard(data) {
        document.getElementById('dashView').classList.remove('hidden');
        document.getElementById('regView').classList.add('hidden');
        document.getElementById('bizName').innerText = data.firm;
        document.getElementById('bizAddr').innerText = data.address;
        document.getElementById('disp_gst').innerText = data.gst || 'N/A';
        document.getElementById('disp_owner').innerText = data.ownerName;
        document.getElementById('disp_ownerCont').innerText = `${data.ownerPhone} / ${data.ownerWa}`;
        document.getElementById('disp_mgrCont').innerText = data.mgrPhone ? `${data.mgrPhone} / ${data.mgrWa}` : 'N/A';
        document.getElementById('disp_gps').innerText = data.location ? `${data.location.lat.toFixed(5)}, ${data.location.lng.toFixed(5)}` : 'No Lock';
        
        const vBadge = document.getElementById('vBadge');
        if(data.status === 'approved') {
            vBadge.innerText = "Verified Profile";
            vBadge.className = "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-600";
            document.getElementById('heroTitle').innerText = "Verified NirmanSutra Supplier";
            document.getElementById('statusHero').classList.add('border-orange-500');
            if(data.level) {
                const lb = document.getElementById('levelBadge');
                lb.classList.remove('hidden');
                lb.innerText = `${data.level} Partner`;
                lb.className = `w-full p-4 rounded-2xl text-center font-black uppercase italic tracking-widest text-xs mb-8 badge-${data.level.toLowerCase()}`;
            }
        }
    },

    loadInventory(uid) {
        rtdb.ref('supplier_inventory/' + uid).on('value', snap => {
            const list = document.getElementById('inventoryList');
            list.innerHTML = "";
            if(!snap.exists()) {
                list.innerHTML = `<p class="text-center text-[10px] font-bold text-slate-400 uppercase py-10">No stock added yet.</p>`;
                return;
            }
            snap.forEach(child => {
                const item = child.val();
                list.innerHTML += `
                    <div class="inventory-item flex justify-between items-center p-5 bg-slate-50 border border-slate-100 rounded-[25px] mb-3">
                        <div>
                            <p class="text-[9px] font-black text-orange-500 uppercase tracking-widest">${item.category}</p>
                            <p class="text-sm font-black italic uppercase">${item.variety}</p>
                            <p class="text-xs font-bold text-slate-400">₹ ${item.price}</p>
                        </div>
                        <button onclick="NS_Supplier.deleteStock('${child.key}')" class="text-slate-300 hover:text-red-500"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                    </div>`;
            });
            lucide.createIcons();
        });
    },

    async saveStock() {
        const price = document.getElementById('invPrice').value;
        if(!this.state.selCat || !this.state.selVar || !price) return alert("Fill all details");
        await rtdb.ref('supplier_inventory/' + auth.currentUser.uid).push({
            category: this.state.selCat, variety: this.state.selVar, price: price, timestamp: Date.now()
        });
        document.getElementById('inventoryModal').classList.add('hidden');
    },

    async deleteStock(key) {
        if(confirm("Delete item?")) await rtdb.ref('supplier_inventory/' + auth.currentUser.uid + '/' + key).remove();
    }
};
