/**
 * NIRMANSUTRA SPATIAL INTELLIGENCE ENGINE
 * Centralized GPS and Leaflet Map logic for all modules.
 */

window.NS_Geo = {
    map: null,
    marker: null,

    // Initialize the map in a specific HTML element
    init(elementId, lat = 24.58, lng = 73.71, zoom = 12) {
        if (this.map) return this.map;
        
        this.map = L.map(elementId, { 
            zoomControl: false, 
            attributionControl: false 
        }).setView([lat, lng], zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
        return this.map;
    },

    // Capture current location and auto-fill address
    async captureLock(addressInputId) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const loc = { lat: latitude, lng: longitude };

                // Update Map View
                this.map.setView([latitude, longitude], 17);
                if (this.marker) this.map.removeLayer(this.marker);
                this.marker = L.marker([latitude, longitude]).addTo(this.map);

                // Reverse Geocoding Logic
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    const address = data.display_name || "Address Found";
                    
                    if (addressInputId) {
                        document.getElementById(addressInputId).value = address;
                    }
                    
                    resolve({ location: loc, address: address });
                } catch (err) {
                    const rawCoords = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
                    if (addressInputId) document.getElementById(addressInputId).value = rawCoords;
                    resolve({ location: loc, address: rawCoords });
                }
            }, (err) => {
                alert("GPS Error: Please enable location services.");
                reject(err);
            }, { enableHighAccuracy: true });
        });
    }
};
