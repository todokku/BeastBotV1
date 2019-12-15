const fetch = require("node-fetch"); // run npm i node-fetch --save
var fs = require('fs');
var config = require("./config.js"); //setup config.js with export API_KEY for Google API KEY

function getBeastState() {
  fs.readFile('beastState.txt', 'utf8', function(err, data) {
    if (err) throw err;
    return data;
});
}

function setBeastState(state) {
  fs.writeFile ("beastState.txt", state , function(err) {
    if (err) return false;
    return true;
    }
);
}

console.log("beastState: " + getBeastState())
console.log("setting to hungry: " + setBeastState("hungry"))
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
