# Bubble Viz Documentation

Our viz is the core framework which can be embedded into product(s) for consumer facing consumption. This details the intricacies of the viz. 

# Axis:

## X Axis:
  * Base X Axis: Common to all Elements
	* Domain: [start_timestamp, end_timestamp]
	* Range: [0, width]
  * Zoom X Axis: Used for zoom. So this X axis retains the original elements, whereas zoom is applied on the Base X axis.
    * Domain: Same as Base X
	* Range: Same as Base X

## Y Axis:
Each element has there own Y axis.

# Charts

## Model Chart: the base chart which contains all charts. Used for maintaining responsivity for the charts.
* Interactivity: On window resize, resizes itself.
* Real estate changes depending upon the view
  * View: Webview. Seperation is vertical
    * Half 1:
      * 10% of the height
      * Charts: Bar Chart
    * Half 2:
      * 60% of the height
      * Charts: Line, Scatter
    * Half 3:
      * 30% of the height
      * Charts: Event
  * View: Video Integration. Seperation is horizontal
    * Half 1:
      * 80% of the width
      * Charts: Line, Scatter
    * Half 2:
     * 20% of the width
     * Charts: Player

## Line Chart: The overall sentiment of the chart
* Data Population: get-index-data
* Elements:
  * Line Pos
  * Line Neg
* Axis:
  * X
    * Base X
    * Zoom X
  * Y
    * Has it's own Y axis
    * Domain [0, max(sentiments)]
    * Range [0, 0.70*height]
* Interactivity: 
  * Zoom
  * Pan
  * Resize, if model chart resizes
  * Live:
   * Update graph with new points
   * Shift graph
   * No pan/zoom allowed when data updates.

## Scatter Chart: Showing tweets of the user
* Data Population: get-scatter-data
* Elements:
  * Since there can be multiple tweets (Y) for a particular time unit (X), we need to plot a [multi series scatter chart](https://gist.github.com/mbostock/3183403) for this.
  * Clip Circle: clips the image into circle
  * Image: the image of the user.
  * Stroke Circle: the outline of the circle depending on the sentiment if it's pos or neg
  * Tooltip:
    * Rectangle: Background Rect that shows up to illuminate the tweet on click.
	* Tweet Sentiment Emoji
	* Tweet Text
* Axis:
  * X
    * Base X
    * Zoom X
  * Y
    * Has it's own Y axis
	* Domain: [0, max(sentiment)]
	* Range: [0, 0.70*height]
* Interactivity:
  * Zoom
  * On zoom, size of the bubble increases - should be ideally that a user can be able to tap on it on mobile.
  * Pan
  * Resize, if model chart resizes
  * Live:
    * Update graph with new points
	* Shift graph
	* No pan/zoom allowed when data updates.
  * On Click:
    * Rectangle fades the viz apart from the tweet on which onClick was triggered.
	* Tweet Text should appear
	* Tweet Sentiment Emoji should appear
	* Fade away in 5 seconds

## Events Chart: Events of the game
* Data Population: get-events
* Elements:
  * Background Rect
  * Event Emoji based on event: Football on goal etc.
  * Time `<text>` below emoji
  * Tootip: 
    * Event Tooltip Line
	* Event Tooltip TextBox
* Axis:
  * X
    * Base X
	* Zoom X
   * Y
	* Has it's own Y axis
	* Domain [0, fixedheight]
	* Range [0, 0.30*height]
* Interactivity:
  * Zoom
  * Pan
  * Resize, if model chart resizes
  * Live:
    * Update graph with new points 
	* Shift graph
	* No pan/zoom allowed when data updates.
  * On Hover:
    * Event Tooltip show
	* Event Line show
