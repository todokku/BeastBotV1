function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
      .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
}
function loadClient() {
  gapi.client.setApiKey(API_KEY);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(function() { console.log("GAPI client loaded for API");
      loggedIn();
    },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute(videoId) {
  return gapi.client.youtube.commentThreads.insert({
    "part": "snippet",
    "resource": {
      "snippet": {
        "videoId": videoId,
        "topLevelComment": {
          "snippet": {
            "textOriginal": "Test"
          }
        }
      }
    }
  })
      .then(function(response) {
              console.log("Response", response);
              console.log("Commented. Hopefully.")
            },
            function(err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: CLIENT_ID});
});
function latestVideo() {

// change to https://developers.google.com/youtube/v3/docs/channels/list
  let url  = "https://www.googleapis.com/youtube/v3/search?key=" + API_KEY +"&channelId="+ channelID +"&part=snippet,id&order=date&maxResults=1"
  fetch(url)
  .then(res => res.json())
  .then((out) => {
    console.log(out)
    execute(out.items[0].id.videoId)
  })
  .catch(err => { throw err });
}
let counter=0;
function goBeast() {
$("#state").html("Loop counter: " + counter);
counter+=1;
latestVideo()
if(counter > 1) { return true;}
setTimeout(goBeast, 500);
}
