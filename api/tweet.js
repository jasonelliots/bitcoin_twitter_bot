require("dotenv").config();
const axios = require("axios");
const Twitter = require("twitter-lite");

// creating client

const client = new Twitter({
    subdomain: "api",
    version: "1.1",
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

module.exports = async (req, res) => {
    const post = await axios.get(
        "https://www.reddit.com/r/worldnews/hot.json?limit=1"
    );
    const capition = await post.data.data.children[0].data.title;
    const link = await post.data.data.children[0].data.url_overridden_by_dest; 

    await client
        .post("statuses/update", { state: `${caption} ${link}`})
        .then((result) => {
            console.log(result)
        })
        .catch((error) => console.log(error));
    
    await res.send("Done");
}
