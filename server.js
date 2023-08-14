const express = require('express');
const app = express();
const port = 8080;
const cors = require("cors");
const fs = require('fs');

const videos = require('./data/videos.json');

app.use(cors());
app.use(express.json());

app.get("/videos", (req, res) => {
    let videoDetails = videos.map((video) => {
        return {"id": video["id"], "title": video["title"], "channel": video["channel"], "image": video["image"]}

    })
    res.send(videoDetails);
})

app.get("/videos/:id", (req, res) => {
    let selectedVideoDetails = videos.find((video) => {
        return video.id == req.params.id;
    })
    res.send(selectedVideoDetails);
})

app.post("/videos", (req, res) => {
    
    videos.push(req.body);
    console.log(videos)

    fs.writeFileSync('./data/videos.json', JSON.stringify(videos), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("Success");
        }
    });

    res.send(videos);
})

app.listen(port, () => {
    console.log(`Listening port on ${port}`)
})