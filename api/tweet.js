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
        // hit coingecko bitcoin price endpoint 
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"

    );

    // grab relevant info 
    const btcprice = await post.data.bitcoin.usd;

    // do necessary operations to get to cents per sat 
    
    const centspersat = (btcprice/100000000)*100 


    await client
        .post("statuses/update", { status: `1 satoshi = ${centspersat} cents`})
        .then((result) => {
            console.log(result)
        })
        .catch((error) => console.log(error));
    
    await res.send("Done");
}


// module.exports = async (req, res) => {
//     const post = await axios.get(
//         "https://www.reddit.com/r/NatureIsFuckingLit/hot.json?limit=1"
//     );
//     const hey = await post.data.data.children[1].data.title;
//     const link = await post.data.data.children[1].data.url_overridden_by_dest; 

//     await client
//         .post("statuses/update", { status: `${hey} ...wow! ${link}`})
//         .then((result) => {
//             console.log(result)
//         })
//         .catch((error) => console.log(error));
    
//     await res.send("Done");
// }
