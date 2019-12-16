
let commented = false;
let quota = 0;
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
            "textOriginal": commentText
          }
        }
      }
    }
  })
      .then(function(response) {
              quota+=50;
              setStateVal("COMMENTED.")
              commented = true;
              console.log("Response", response);
              console.log("Commented. Hopefully.")
            },
            function(err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: CLIENT_ID});
});
function latestVideoScraper() {
  let url = "http://labs.wenogk.com/beast.php?id=" + channelID
  fetch(url)
  .then(res => res.json())
  .then((out) => {
    let title = out.entry[0].title
    let ytid = out.entry[0].id
    let videoID = ytid.substring(9,ytid.length);
    alert("title is" + title + " and video id is " + videoID)
    //
  })
  .catch(err => { throw err });
}
function latestVideo() {

  let urlOld  = "https://www.googleapis.com/youtube/v3/search?key=" + API_KEY +"&channelId="+ channelID +"&part=snippet,id&order=date&maxResults=1"
  let url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + uploadPlaylistID + "&key=" + API_KEY +"&maxResults=1"

  fetch(url)
  .then(res => res.json())
  .then((out) => {
    quota+=3;
    setLatestTitle(out.items[0].snippet.title);
    let idVal = out.items[0].snippet.resourceId.videoId;
    if(idVal!=currentLatestVideoID) { //If latest video is different, start commenting function ASAPPPP
      execute(idVal);
      setStateVal("NEW VIDEO UP.");
    }
    //
  })
  .catch(err => { throw err });
}

let counter=0;
function goBeast() {
  setQuota(quota);
  if(commented) {
    fetched();
    return true;
  }
  setLatestTitle("");
counter+=1;
setStateVal("Checking for new video.")
latestVideo()
setCounter(counter)
//if(counter > 5) { return true;}
setTimeout(goBeast, 500);
}
latestVideoRSS()
