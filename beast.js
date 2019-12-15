var config = require("config.js");
function latestVideo() {
  let url = "https://www.googleapis.com/youtube/v3/search?key=" + config.API_KEY + "&channelId=UCX6OQ3DkcsbYNE6H8uQQuVA&part=snippet,id&order=date&maxResults=1";
  console.log(url);
}
