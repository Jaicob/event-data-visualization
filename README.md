# event-data-visualization

Given a start and end date the chart will display a visualization of which events have the highest capacities. 

## Technologies Used
* __Node.js + Express.js__ 
  * For server side code
* __Zurb Foundation__
  * For adding some style to the chart 
* __nv.d3.js__
  * For creating generating the chart
* __Redis__
  * For caching queried data _note that I had intended to use that to produce some interesting derivatives, but now it may seem a little unecessary_
* __Docker__
  * For creating a dev and prod environment
* __AWS__
  * For hosting the production application 

##Usage
* __Two ways of access__ 
  * clone the repo, navigate to the root and run `docker-compose up`
  * access at YOUR DOCKER VM IP:3000/
*__Querying__
  * Enter a valid start and end date, must be of the exact format `yyyy-mm-dd`
*__Viewing__
  * There are different representations of the graph available in the toolbar along the top left
  * You can filter out categories by deselecting them _somtimes a small bug where you have to click twice_
  
##Desired Improvements
* Allow for viewing different derivatives of the data
* For larger queries, loading all the events
* Add better documentation

  


