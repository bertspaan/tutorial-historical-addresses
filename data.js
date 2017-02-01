const fs = require('fs')
const H = require('highland')
const request = require('request')
const JSONStream = require('JSONStream')

const datasets = {
  addresses: 'building-inspector-nyc-streets',
  streets: 'nyc-streets'
}

const baseUrl = 'http://s3.amazonaws.com/spacetime-nypl-org/datasets/'
const s3Url = (dataset) => `${baseUrl}${dataset}/${dataset}.objects.ndjson`

/* Download and transform streets dataset
 *
 * Create JSON object, with street IDs as key
 * Only keep data we will use in web interface: name, year, geometry
 * Use JSONStream.stringifyObject() to convert stream to JSON object
 --------------------------------------------------------------------------- */

H(request(s3Url(datasets.streets)))
  .split()
  .compact()
  .map(JSON.parse)
  .map((object) => ([
    `${datasets.streets}/${object.id}`,
    {
      name: object.name,
      geometry: object.geometry
    }
  ]))
  .pipe(JSONStream.stringifyObject())
  .pipe(fs.createWriteStream('./data/streets.json'))

/* Download and transform addresses dataset
 *
 * This dataset contains Building Inspector addresses linked to streets from dataset above
 *   (see https://github.com/nypl-spacetime/etl-building-inspector-nyc-streets for details)
 * index is needed for lunr.js (http://lunrjs.com/)
 * Only keep data we will use in web interface
 --------------------------------------------------------------------------- */

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
