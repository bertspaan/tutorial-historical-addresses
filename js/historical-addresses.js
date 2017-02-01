var addresses
var streets

var newTiles = false
var selectedAddress = {}

// Create lunr.js index (http://lunrjs.com/),
//   indexing only address field, and using id as reference
var idx = lunr(function () {
  this.field('address')
  this.ref('id')
})
var indexed = false

var styles = {
  address: {
    radius: 5,
    fillColor: '#ff00ee',
    color: '#000',
    weight: 1,
    fillOpacity: 0.8
  },
  street: {
    color: '#ff00ee',
    opacity: 0.7,
    weight: 6
  }
}

d3.json('data/streets.json', function (json) {
  streets = json
})

d3.json('data/addresses.json', function (json) {
  addresses = json

  addresses.forEach(function (address) {
    idx.add(address)
  })

  indexed = true
})

function selectItem (item, focus) {
  if (focus) {
    item.focus()
  }

  d3.selectAll('#list .item')
    .classed('selected', false)

  d3.select(item)
    .classed('selected', true)
    .each(function (address) {
      selectAddress(address)
    })
}

d3.select('#list')
  .on('keydown', function (event) {
    var move = 0
    var key = d3.event.key
    if (key === 'ArrowUp') {
      move = -1
    } else if (key === 'ArrowDown') {
      move = 1
    }

    if (move) {
      var selected = d3.select(this).select('.selected').node()

      if (move > 0 && selected.nextElementSibling) {
        selectItem(selected.nextElementSibling, true)
      } else if (move < 0 && selected.previousElementSibling) {
        selectItem(selected.previousElementSibling, true)
      }

      d3.event.preventDefault()
    }
  })

d3.select('#slider').on('input', function () {
  tileLayer.setOpacity(this.value / 100)
})

d3.select('#search')
  .on('input', function () {
    if (!addresses || !streets) {
      console.error('Not loaded!')
      return
    }

    var newAddress = this.value

    // Search lunr.js index, only use first 75 items
    //   and replace results with actual addresses using ref
    var results = idx.search(newAddress)
      .slice(0, 75)
      .map(function (result) {
        return addresses[result.ref]
      })

    var list = d3.select('#list').selectAll('li')
      .data(results, function (d) {
        return d.id
      })

    var item = list
      .enter()
      .append('li')
      .attr('tabindex', 0)
      .classed('item', true)
      .classed('selected', false)
      .on('click', function () {
        selectItem(this)
      })

    item.append('span')
      .attr('class', 'address')
      .html(function (address) {
        return address.address
      })

    item.append('span')
      .attr('class', 'year')
      .html(function (address) {
        return address.year
      })

    list.exit().remove()

    if (results.length) {
      selectItem(d3.select('#list').select('.item').node(), false)
    }
  })

function selectAddress (newAddress) {
  if (selectedAddress.mapId !== newAddress.mapId) {
    newTiles = true
    tileLayer.setUrl('')
  }

  selectedAddress = newAddress

  var coordinates = selectedAddress.geometry.coordinates
  var street = streets[selectedAddress.streetId]

  map.setView([coordinates[1], coordinates[0]])
  geojsonLayer.clearLayers()
  geojsonLayer.addData({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          address: selectedAddress.address
        },
        geometry: selectedAddress.geometry
      },
      {
        type: 'Feature',
        properties: {
          name: street.name
        },
        geometry: street.geometry
      }
    ]
  })
}

var map = L.map('map', {
  center: [40.8, -73.96],
  zoom: 14,
  maxZoom: 20
})

var baseMapTileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
var baseLayer = L.tileLayer(baseMapTileUrl, {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 20,
  maxNativeZoom: 19
}).addTo(map)

var tileLayer = L.tileLayer('', {
  maxZoom: 20
}).addTo(map)

var geojsonLayer = new L.geoJson(null, {
  style: styles.street,
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, styles.address)
  },
  onEachFeature: function (feature, layer) {
    var text = feature.properties.name || feature.properties.address
    if (text) {
      layer.bindPopup(text)
    }
  }
}).addTo(map)

map.on('moveend', function () {
  if (newTiles) {
    var tileUrl = 'http://maps.nypl.org/warper/maps/tile/' + selectedAddress.mapId + '/{z}/{x}/{y}.png'
    tileLayer.setUrl(tileUrl)
  }

  newTiles = false
})
