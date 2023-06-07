
const API_URL = "http://127.0.0.1:4001/api/"
let config = {
    minZoom: 7,
    maxZoom: 18,
};

const zoom = 18;
const lat = 52.22977;
const lng = 21.01178;

const map = L.map("map", config).setView([lat, lng], zoom);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function createSidebarElements(layer) {
    const sidebar = document.getElementById("sidebar");
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
    button.addEventListener("click", async function (e) {
        const elementToDelete = document.getElementById(markerId);
        map.removeLayer(marker)
        await axios.delete(API_URL + "locations/delete/" + parseInt(markerId), {}).then(function (response) {
            console.log(response)
            // do whatever you want if console is [object object] then stringify the response
        })
        elementToDelete.parentNode.removeChild(elementToDelete);
        clickedEl.parentNode.removeChild(clickedEl);
    });

    document.body.appendChild(button);
    marker.bindPopup(button).openPopup();
    map.panTo(getLatLong);
}

const saveButtonControl = L.Control.extend({
    options: {
        position: "topright",
    },
    onAdd: function (map) {
        const saveButton = L.DomUtil.create("button");
        const dowloadsaveButton = L.DomUtil.create("button");
        saveButton.title = "Save";
        saveButton.textContent = "Save";
        saveButton.className = "save";
        saveButton.setAttribute(
            "style",
            `
            display:inline-block;
            background-color:#f44336;
            color: #FFFFFF;
            padding: 14px 25px;
            text-align: center;
            text-decoration: none;
            font-size:16px;
            margin-left:20px;
            opacity:0.9;
            cursor: pointer;
            `
        );

        saveButton.onclick = function () {
            updateInfo()
        };
        return saveButton;
    },
});
const exportButtonControl = L.Control.extend({
    options: {
        position: "topleft",
    },
    onAdd: function (map) {
        const exportButton = L.DomUtil.create("a");
        exportButton.textContent = "export"
        exportButton.href = API_URL + "locations/export"
         exportButton.title = "dowloand";
        // exportButton.textContent = "dowloand";
         exportButton.className = "dowloand";
        exportButton.setAttribute(
            "style",
            `
            display:inline-block;
            background-color:#f44336;
            color: #FFFFFF;
            padding: 14px 25px;
            text-align: center;
            text-decoration: none;
            font-size:16px;
            margin-left:20px;
            opacity:0.9;
            cursor: pointer;
            `
        );
        return exportButton;
    },
});

const coordinates = L.control({ position: "bottomleft" });
coordinates.onAdd = function () {
    const div = L.DomUtil.create("div", "center-of-map-description");
    L.DomEvent.disableClickPropagation(div);
    return div;
};
coordinates.addTo(map);

const markerPlace = document.querySelector(".center-of-map-description");

map.addControl(new saveButtonControl());
map.addControl( new exportButtonControl())

async function updateInfo() {
    const { lat, lng } = map.getCenter();
    const zoom = map.getZoom();
    markerPlace.innerHTML = `center: ${lat.toFixed(5)}, ${lng.toFixed(
        5
    )} | zoom: ${zoom}`;
    const marker = L.marker([lat, lng]).addTo(fg);

    createSidebarElements(marker);
    const data = {
        __id: marker._leaflet_id,
        date: new Date().toISOString(),
        loc: [lat, lng]
    }
    await axios.post(API_URL + "locations/add", data).then(function (response) {
        console.log(response)
        if(response.status == 200){
            alert("success")
        }
        else {
            alert("failed")
        }
    })
    marker.setOpacity(0);
}


async function getAllmarker() {
    await axios.get(API_URL + "locations/get",).then(function (response) {
        const zoom = map.getZoom();
        if (response.status == 200) {
            for (const el of response.data) {
                const lat = el.geo.coordinates[0]
                const lng = el.geo.coordinates[1]
                console.log(el.geo.coordinates[0])

                markerPlace.innerHTML = `center: ${lat.toFixed(5)}, ${lng.toFixed(
                    5
                )} | zoom: ${zoom}`;
                const marker = L.marker([lat, lng]).addTo(fg);
                createSidebarElements(marker);
            }


        }
        else {
            alert("failed")
        }
    })
}
getAllmarker();
const fg = L.featureGroup().addTo(map);
map.fitBounds(fg.getBounds());