# Tutorial: Historical Addresses & NYC Space/Time Directory

THis is a tutorial made for the second meetup of [NYC Space/Time Directory](http://spacetime.nypl.org)'s [meetup series](https://www.meetup.com/historical-data-and-maps-at-nypl/): [NYC Maps, Buildings, and Addresses: Using and combining historic data](https://www.meetup.com/historical-data-and-maps-at-nypl/events/236221289/) on February 1st, 2017.

in this tutorial, we will combine two different crowdsourced datasets from the NYC Space/Time Directory to create a web interface makes historical addresses searchable and visible.

Datasets:

- [__Building Inspector__](http://buildinginspector.nypl.org/):
  - NYPL's tool for crowdsourced extraction of historical building footprints and addresses from historical maps
  - Dataset: http://spacetime.nypl.org/#data-building-inspector
- [__Historical streets__](http://mgiraldo.github.io/centerlines/):
  - Street polylines traced from historical maps & atlases
  - Dataset: http://spacetime.nypl.org/#data-nyc-streets
- [__Map Warper__](http://maps.nypl.org/warper):
  - Tool for crowdsourced georectification of historic maps
  - Dataset: http://spacetime.nypl.org/#data-mapwarper

## Outline

In this tutorial, we will do the following things:

- See what data is available via [Building Inspector's API](http://buildinginspector.nypl.org/data)
- Find out how the NYPL traces the locations and names of streets from historical maps, and turns this into new datasets for everyone to use (and how you can help tracing more maps)
- We will use the NYC Space/Time Directory's website to download and use those datasets
- Combine Building Inspector and historical street datasets to create a new dataset containing historical addresses
- We'll use Leaflet to display Map Warper's historical map tiles
- And finally, put everything together and make our new dataset searchable with a simple web interface

__Examples__ from [1854 New York City Directory](https://digitalcollections.nypl.org/collections/new-york-city-directory-for-1854-1855-thirteenth-publication#/?tab=navigation):

- _Kelly William E. daguerreotypes, 374 Bowery_

![](images/city-directory-example-1.jpg)

This address on 1875 map:

![](images/374-bowery.jpg)

- _Palmer George, painter, 90 Nassau, h. 84½ Fulton, Brooklyn_

![](images/city-directory-example-2.jpg)

This address on 1855 map:

![](images/84½-fulton.jpg)

__Goal__: web interface for searching historical addresses

![](images/screenshot.png)

## Data

