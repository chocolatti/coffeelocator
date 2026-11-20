let userLat;
let userLon;

document.addEventListener("DOMContentLoaded", function() {

    console.log("JavaScript is connected!");

    const locationButton = document.getElementById("locationButton");

    console.log("Button found:", locationButton);

    locationButton.addEventListener("click", getUserLocation);

});

let coffeeShops = [

    {
        name: "Devocíon",
        address: "276 Livingston St. Brooklyn, NY 11201",
        lat: 40.68891377021121,
        lon: -73.98345376495075
    },

    {
        name: "Qahwah Time Specialty Coffee",
        address: "66 Court St, Brooklyn, NY 11201",
        lat: 40.69248920669538,
        lon: -73.99167577227028
    },

    {
        name: "Blank Street Coffee",
        address: "2 MetroTech Center, Brooklyn, NY 11201",
        lat: 40.69378413220158,
        lon: -73.9859083311261
    },

    {
        name: "Compilation Coffee Roasters @ Ft. Greene",
        address: "343 Gold St, Brooklyn, NY 11201",
        lat: 40.694181844555565,
        lon: -73.98279072883537
    },

    {
        name: "Starbucks",
        address: "Poly Tech Institute, 621 Rogers Hall, 6 MetroTech Center, Brooklyn, NY 11201",
        lat: 40.69417298258751, 
        lon:-73.98684060709066
    },

    {
        name: "AvaBrew by Oren's Coffee",
        address: "100 Willoughby St, Brooklyn, NY 11201",
        lat: 40.69207488283495, 
        lon: -73.98472716248882
    },

    {
        name: "Yohevet Coffee Shop Broolyn (Kosher)",
        address: "367 Jay St, Brooklyn, NY 11201",
        lat: 40.6928493674146, 
        lon: -73.98703386931255
    },

    {
        name: "Le Café Coffee",
        address: "15 Hanover Pl, Brooklyn, NY 11201",
        lat: 40.68895094914355, 
        lon: -73.98232831534371
    },
    
    {
        name: "White Noise Coffee - Coffee Shop & Roastery",
        address:"57 Smith St, Brooklyn, NY 11201",
        lat: 40.69051587836612, 
        lon: -73.98828797305208
    },

    {
        name: "Coffee Project",
        address: "78 Rockwell Pl, Brooklyn, NY 11217",
        lat: 40.68789019717553, 
        lon: -73.97939403068285
    }
];


function getUserLocation() {
    console.log("Button clicked");

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(

            function(position) {

                userLat = position.coords.latitude;
                userLon = position.coords.longitude;

                document.getElementById("locationInfo").innerHTML =
                    "You are at: " + userLat.toFixed(5) + ", " + userLon.toFixed(5);
                findNearbyCoffee();

            },

            function(error) {

                document.getElementById("locationInfo").textContent = 
                    "Unable to get your location.";

                console.log(error.message);

            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }

        );

    } else {

        document.getElementById("locationInfo").innerHTML =
            "Geolocation is not supported.";

    }

}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3958.8;

    const toRad = (degrees) => degrees * Math.PI / 180;

    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    const dLat = lat2 - lat1;
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) ** 2;

    return 2 * R * Math.asin(Math.sqrt(a));
}


function findNearbyCoffee() {

    let nearbyShops = [];

    for (let shop of coffeeShops) {

        let distance = calculateDistance(
            userLat,
            userLon,
            shop.lat,
            shop.lon
        );

        nearbyShops.push({
            ...shop,
            distance: distance
        });

    }

    nearbyShops.sort((a, b) =>
        a.distance - b.distance
    );

    let topThree = nearbyShops.slice(0, 3);

    displayCoffeeShops(topThree);

}


function displayCoffeeShops(shops) {

    let results = document.getElementById("coffeeResults");

    results.innerHTML = "";

    for (let shop of shops) {

        let shopDiv = document.createElement("div");

        shopDiv.className = "coffee-card";

        shopDiv.innerHTML = `
            <h3>${shop.name}</h3>
            <p>${shop.address}</p>
            <p>${shop.distance.toFixed(2)} miles away</p>
        `;

        results.appendChild(shopDiv);

    }

}
