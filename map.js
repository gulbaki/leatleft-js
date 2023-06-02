
let config = {
    minZoom: 7,
    maxZoom: 18,
};

const zoom = 18;

const lat = 52.22977;
const lng = 21.01178;

// calling map
const map = L.map("map", config).setView([lat, lng], zoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// --------------------------------------------------

const sidebar = document.getElementById("sidebar");

function createSidebarElements(layer) {

    const el = `<div class="sidebar-el" data-marker="${layer._leaflet_id}">${layer
        .getLatLng()
        .toString()}</div>`;

    const temp = document.createElement("div");
    temp.innerHTML = el.trim();
    const htmlEl = temp.firstChild;

    L.DomEvent.on(htmlEl, "click", zoomToMarker);
    sidebar.insertAdjacentElement("beforeend", htmlEl);
}

function zoomToMarker(e) {
    const clickedEl = e.target;
    const markerId = clickedEl.getAttribute("data-marker");
    const marker = fg.getLayer(markerId);
    console.log(clickedEl)
    const getLatLong = marker.getLatLng();
    marker.setOpacity(1);
    var button = document.createElement("button");
    button.innerText = "Delete";
    button.id = markerId
    button.addEventListener("click", function (e) {
        const elementToDelete = document.getElementById(markerId);
        map.removeLayer(marker)

        elementToDelete.parentNode.removeChild(elementToDelete);
        clickedEl.parentNode.removeChild(clickedEl);
    });

    document.body.appendChild(button);
    marker.bindPopup(button).openPopup();
    map.panTo(getLatLong);
}



const customControl = L.Control.extend({
    // button position
    options: {
        position: "topright",
    },

    // method
    onAdd: function (map) {
        // create button
        const btn = L.DomUtil.create("button");
        btn.title = "Save";
        btn.textContent = "Save";
        btn.className = "save";
        btn.setAttribute(
            "style",
            "background-color:  width: 100px; height: 50px; cursor: pointer; "
        );

        // actions on mouseover
        btn.onmouseover = function () {
            this.style.transform = "scale(1.3)";
        };

        // actions on mouseout
        btn.onmouseout = function () {
            this.style.transform = "scale(1)";
        };

        // action when clik on button
        btn.onclick = function () {

            updateInfo()
            // add class rotate
            // remove class after 4s

        };

        return btn;
    },
});

const coordinates = L.control({ position: "bottomleft" });

coordinates.onAdd = function () {
    const div = L.DomUtil.create("div", "center-of-map-description");
    L.DomEvent.disableClickPropagation(div);
    return div;
};

coordinates.addTo(map);

// update info about bounds when site loaded
document.addEventListener("DOMContentLoaded", function () {
    updateInfo();
});

const markerPlace = document.querySelector(".center-of-map-description");


map.addControl(new customControl());

function updateInfo() {
    const { lat, lng } = map.getCenter();
    const zoom = map.getZoom();
    markerPlace.innerHTML = `center: ${lat.toFixed(5)}, ${lng.toFixed(
        5
    )} | zoom: ${zoom}`;
    const marker = L.marker([lat, lng]).addTo(fg);

    createSidebarElements(marker);
    const data = {
        id: marker._leaflet_id,
        date: Date.now(),
        lat: lat,
        lng: lng,
    }
    marker.setOpacity(0);
}

// coordinate array points

const fg = L.featureGroup().addTo(map);
map.fitBounds(fg.getBounds());