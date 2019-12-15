# youtube-auto-commenter
Trying to win Mr Beast's 1000 dollars for being one of the earliest 10 commenters on his youtube video that comes out on the 19th.

Headless chrome maybe? 

Basic plan,
1) Set up an interval loop that runs every second as long as we have not already commented on the latest video. Also set up a txt file with just a boolean to show if we have commented on the latest video or not.
2) Write up a function that returns the latest youtube video from Mr. Beast's channel and check if the latest video is not the, "Last To Stop Biking Wins $1,000,000 (Part 4)" video with video id wMuYiLby3-s as that was the previous video and we're looking for the one after this.
This gives out the latest videos: https://www.googleapis.com/youtube/v3/search?key={your_key_here}&channelId={channel_id_here}&part=snippet,id&order=date&maxResults=20
3)If latest video is the one we want to comment on from the previous function. We call the comment function which takes in parameters videoId and comment
https://developers.google.com/youtube/v3/docs/commentThreads/insert
4) The bot will comment three times and then set the boolean to true, therefore breaking the loop


