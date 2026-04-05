/**
 * NIRMANSUTRA | SUPPLIER NODE LOGIC
 * Path: /js/supplier_logic.js
 */

window.InventoryUI = {
    // 1. INVENTORY LISTING (CRUD: READ)
    loadInventory(uid) {
        rtdb.ref('supplier_inventory/' + uid).on('value', snap => {
            const list = document.getElementById('inventoryList');
            list.innerHTML = "";
            if(!snap.exists()){
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
                        <button onclick="InventoryUI.deleteStock('${child.key}')" class="text-slate-300 hover:text-red-500 transition-all">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>`;
            });
            if (window.lucide) lucide.createIcons();
        });
    },

    // 2. MODAL LOGIC (CRUD: CREATE)
    openModal() {
        document.getElementById('inventoryModal').classList.remove('hidden');
        document.getElementById('catSelect').innerHTML = Object.keys(state.regData).map(c => `<div class="chip" onclick="InventoryUI.pickCat('${c}')">${c}</div>`).join('');
    },
    pickCat(c) {
        state.selCat = c;
        document.querySelectorAll('#catSelect .chip').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
        document.getElementById('varSelect').innerHTML = Object.keys(state.regData[c]).map(v => `<div class="chip" onclick="InventoryUI.pickVar('${v}')">${v}</div>`).join('');
    },
    pickVar(v) {
        state.selVar = v;
        document.querySelectorAll('#varSelect .chip').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
    },
    closeModal() { document.getElementById('inventoryModal').classList.add('hidden'); },
    async saveStock() {
        const price = document.getElementById('invPrice').value;
        if(!state.selCat || !state.selVar || !price) return alert("Fill all details");
        await rtdb.ref('supplier_inventory/' + auth.currentUser.uid).push({
            category: state.selCat, variety: state.selVar, price: price, timestamp: Date.now()
        });
        this.closeModal();
    },

    // 3. DELETE LOGIC (CRUD: DELETE)
    async deleteStock(key) {
        if(confirm("Delete this stock item?")) await rtdb.ref('supplier_inventory/' + auth.currentUser.uid + '/' + key).remove();
    },

    // 4. PROFILE UPDATE LOGIC
    toggleEdit() {
        document.getElementById('dashView').classList.add('hidden');
        document.getElementById('regView').classList.remove('hidden');
        document.getElementById('cancelBtn').classList.remove('hidden');
        document.getElementById('regTitle').innerText = "Update Profile";
        
        const d = state.currentData;
        document.getElementById('firmName').value = d.firm;
        document.getElementById('gstNum').value = d.gst || '';
        document.getElementById('ownerName').value = d.ownerName;
        document.getElementById('ownerMob').value = d.ownerPhone;
        document.getElementById('ownerWa').value = d.ownerWa || d.ownerPhone;
        document.getElementById('mgrName').value = d.mgrName || '';
        document.getElementById('mgrMob').value = d.mgrPhone || '';
        document.getElementById('mgrWa').value = d.mgrWa || '';
        document.getElementById('address').value = d.address;
        state.location = d.location;
    },
    cancelEdit() {
        document.getElementById('dashView').classList.remove('hidden');
        document.getElementById('regView').classList.add('hidden');
    }
};
