const table = $("#jobsTable").DataTable({
  processing: true,
  serverSide: false, // TODO: support server side processing when data size grow
  ajax: {
    type: "GET",
    url: "http://localhost:5000/api/v1/jobs"
  },
  language: {
    searchPlaceholder: "Title, Location, Category, .."
  },
  fuzzySearch: true,
  columns: [
    { data: "title", title: "Title" },
    {
      data: null,
      title: "Location",
      render: function (data, type, full, meta) {
        return (
          (data.city ?? "") + (data.city ? ", " : "") + (data.country ?? "")
        );
      }
    },
    {
      data: null,
      title: "Date Posted",
      searchable: false,
      render: function (data, type, full, meta) {
        // If display or filter data is requested, format the date
        if (type === "display" || type === "filter") {
          return moment(data.postedDate).fromNow();
        }

        // Otherwise the data type requested (`type`) is type detection or
        // sorting data, for which we want to use the raw date, so just return
        // that, unaltered
        return data.postedDate;
      }
    },
    { data: "category", title: "Category" },
    {
      data: null,
      title: "Division",
      render: function (data, type, full, meta) {
        return data.division ?? "";
      }
    },
    {
      data: null,
      title: "Actions",
      searchable: false,
      orderable: false,
      render: function (data, type, full, meta) {
        return `
          <!-- Button trigger modal -->
          <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-sm btn-info " data-bs-toggle="modal" data-bs-target="#jobDetailModal"">
            Details
          </button>          
          <a class='btn btn-sm btn-primary' href="${data.link}" target="_blank" rel="noopener noreferrer">Apply</a>
          </div>
          `;
      }
    }
  ]
});

table.on("click", "button", function (e) {
  const data = table.row(e.target.closest("tr")).data();

  $("#jobDetailModalLabel").text(data.title.trim());

  $("#jobDetailModalDescription").html(data.description.trim());
  $("#jobDetailModalApplyBtn").attr("href", data.link);
});

let idleTime = 0;
let timeUnit = 100; // 0.1 second
$(document).ready(function () {
  setInterval(timerIncrement, timeUnit);
});

function timerIncrement() {
  idleTime = idleTime + 1;
  if (idleTime == 7) {
    // measured in timeUnit
    // lazy redraw
    redrawMap();
  }
}
// To avoid triggering search.dt event on sorting
$("#jobsTable").on("order.dt", function () {
  table.off("search.dt");
  // your desired function here
  table.on("search.dt", function () {
    // Gets registered because order.dt is used by default on table initialization
    $("#jobsTable").on("search.dt", function () {
      console.log("Table search eee");
      idleTime = 0;
    });
  });
});

const redrawMap = () => {
  deleteMarkers();
  table
    .rows({ filter: "applied" })
    .every(function (rowIdx, tableLoop, rowLoop) {
      const data = this.data();
      const location = getLocation(data);
      if (location.length) {
        geocode({ address: location });
      }
    });
};

const getLocation = (data) => {
  var location = "";
  if (data.city) {
    location += data.city;
  }
  if (data.country) {
    location += (location.length ? ", " : "") + data.country;
  }
  return location;
};

let map;
let markers = [];
let geocoder;

function initMap() {
  const egypt = { lat: 26.8171442, lng: 36.1730976 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: egypt,
    mapTypeControl: false
  });
  geocoder = new google.maps.Geocoder();
  deleteMarkers();
}

function geocode(request) {
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;
      //map.setCenter(results[0].geometry.location);
      addMarker(results[0].geometry.location, map);
      //response.innerText = JSON.stringify(result, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}

// Adds a marker to the map and push to the array.
function addMarker(position) {
  const marker = new google.maps.Marker({
    map,
    animation: google.maps.Animation.DROP,
    position
  });

  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  markers.forEach((marker) => {
    marker.setMap(map);
  });
}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  hideMarkers();
  markers = [];
}

window.initMap = initMap;
