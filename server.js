require("dotenv").config();
const express = require("express");
const app = express();
const cloudfrontSigner = require("@aws-sdk/cloudfront-signer");

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/api/getSignedUrl", (req, res) => {
  try {
    const minutes = 1000 * 60 * 5;
    const expireSignedUrlIn = new Date(Date.now() + minutes);
    const signedUrl = cloudfrontSigner.getSignedUrl({
      url: "https://d36q7lo02y11hn.cloudfront.net/meowww.jpg",
      dateLessThan: expireSignedUrlIn,
      privateKey: process.env.CDN_PRIVATE_KEY,
      keyPairId: process.env.CDN_KEY_PAIR_ID,
    });
    console.log("Signed Url\n", signedUrl);

    res.status(200).send("The signed URl is logged onto the console");
  } catch (error) {
    res.status(500).send("There seems be be an issue with the server");
  }
});
