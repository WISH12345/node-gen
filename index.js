const Eris = require("eris");
const express = require("express");
const app = express();
const keep_alive = require('./keep_alive.js')

app.listen(3000, () => {
  console.log("Project is running!");
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const axios = require("axios");
const fs = require("fs");

const characters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateRandomString(length = 6) {
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return randomString;
}

async function sendRequest(randomString) {
  const url = `https://rentry.co/${randomString}`;
  try {
    const response = await axios.get(url);
    return response.status === 200;
  } catch (error) {
    console.error(
      `Error sending request for ${randomString}: ${error.message}`,
    );
    return false;
  }
}

async function processIteration() {
  const randomString = generateRandomString();
  console.log("Generated random string:", randomString);

  if (await sendRequest(randomString)) {
    const discordWebhookUrl = process.env.token;
    const gifUrl =
      "https://tenor.com/view/futakana-lewd-anime-blush-shy-gif-17423467";

    try {
      await axios.post(discordWebhookUrl, {
        content: `||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| https://rentry.co/${randomString}\n${gifUrl}`,
      });
    } catch (error) {
      console.error("Error sending message to Discord:", error.message);
    }
  }
}

async function main() {
  const iterations = 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999; // You can adjust the number of iterations as needed

  for (let i = 0; i < iterations; i++) {
    await processIteration();
  }

  console.log(
    "Requests completed. Check your Discord channel for valid links.",
  );
}

main();
