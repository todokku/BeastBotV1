const fetch = require("node-fetch"); // run npm i node-fetch --save
var fs = require('fs');
var config = require("./config.js"); //setup config.js with export API_KEY for Google API KEY

function getBeastState() {
return fs.readFileSync('beastState.txt','utf8')
}

function setBeastState(state) {
  fs.writeFileSync("beastState.txt", state);
}

console.log("beastState: " + getBeastState())
setBeastState("duck")
console.log("beastState: " + getBeastState())

function latestVideo() {
  let url = "https://www.googleapis.com/youtube/v3/search?key=" + config.API_KEY + "&channelId=UCX6OQ3DkcsbYNE6H8uQQuVA&part=snippet,id&order=date&maxResults=1";
  //console.log(url);
  fetch(url)
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    // Do something for an error here
  })
}

function beastComment(videoID, commentText) {

}


//console.log(latestVideo());
