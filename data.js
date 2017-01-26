const fs = require('fs')
const H = require('highland')
const request = require('request')
const JSONStream = require('JSONStream')

const datasets = {
  addresses: 'building-inspector-nyc-streets',
  streets: 'nyc-streets'
}

const s3Url = (dataset) => `http://s3.amazonaws.com/spacetime-nypl-org/datasets/${dataset}/${dataset}.objects.ndjson`

H(request(s3Url(datasets.streets)))
  .split()
  .compact()
  .map(JSON.parse)
  .map((object) => ([
    `${datasets.streets}/${object.id}`,
    {
      name: object.name,
      year: object.validSince,
      geometry: object.geometry
    }
  ]))
  .pipe(JSONStream.stringifyObject())
  .pipe(fs.createWriteStream('./data/streets.json'))

let index = 0
H(request(s3Url(datasets.addresses)))
  .split()
  .compact()
  .map(JSON.parse)
  .map((object) => ({
    id: index++,
    address: object.name,
    streetId: object.data.streetId,
    year: object.validSince,
    geometry: object.geometry,
    mapId: object.data.mapId
  }))
  .pipe(JSONStream.stringify())
  .pipe(fs.createWriteStream('./data/addresses.json'))
