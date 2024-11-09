const socket = io() //generates connection request

if(navigator.geolocation){

    //to track the user
    navigator.geolocation.watchPosition(
        (position)=>{
        const {latitude , longitude} = position.coords
        socket.emit("send-location",{latitude,longitude}) // emitting a req from frontend
        }, 
        (error)=>{
            console.error(error)
        },
        {
            enableHighAccuracy : true,
            timeout : 5000, // regenerates location
            maximumAge : 0 // for less caching
        }
    );
}

const map = L.map("map").setView([0,0], 16)   // with center coords and zoom level

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Kajal-Deore" // appears as watermark
}).addTo(map)

const markers = {};

//centers to our location
socket.on("receive-location", (data)=>{
    const {id, latitude, longitude} = data;
    map.setView([latitude,longitude]);

    if(markers[id]){
        markers[id].setLateLng([latitude,longitude])
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map)
    }
})

socket.on("user-disconnected", (id)=>{
    if(markers[id]){
        map.removeLayer(markers[id])
        delete markers[id];
    }
})

