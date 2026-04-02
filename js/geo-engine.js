/* NIRMANSUTRA GEO-ENGINE v1.1 */
window.NS_Geo = {
    map: null,
    marker: null,

    // Initialize the map on any page
    init(elementId) {
        if (!document.getElementById(elementId)) return;
        this.map = L.map(elementId, { zoomControl: false, attributionControl: false }).setView([24.58, 73.71], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    },

    // Capture GPS and get the human-readable address
    async captureLocation(addressId) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                const coords = { lat: latitude, lng: longitude };
                
                // Update Map View
                this.map.setView([latitude, longitude], 17);
                if (this.marker) this.map.removeLayer(this.marker);
                this.marker = L.marker([latitude, longitude]).addTo(this.map);
                
                // Fetch Address from OpenStreetMap (Nominatim)
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await res.json();
                    const addr = data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
                    
                    if(addressId) document.getElementById(addressId).value = addr;
                    resolve({ ...coords, address: addr });
                } catch(e) {
                    resolve({ ...coords, address: "Address Fetch Failed (GPS Locked)" });
                }
            }, (err) => {
                alert("GPS Error: Please enable location permissions.");
                reject(err);
            }, { enableHighAccuracy: true });
        });
    }
};
