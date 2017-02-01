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

In this tutorial, we will:

- See what data is available via the [Building Inspector API](http://buildinginspector.nypl.org/data)
- How the NYPL traces streets from historical maps and how this data is available in the NYC Space/Time Directory (and how you can help tracing more maps)
- How we can combine those two datasets to create a new dataset containing historical addresses
- using Map Warper's historical map tiles in Leaflet
- How we can make them accessible in a simple web interface

Some examples:

- _Kelly William E. daguerreotypes, 374 Bowery_

![](images/city-directory-example-1.jpg)

![](images/374-bowery.jpg)

- _Palmer George, painter, 90 Nassau, h. 84½ Fulton, Brooklyn_

![](images/city-directory-example-2.jpg)

![](images/84½-fulton.jpg)

Goal:

![](images/screenshot.png)
