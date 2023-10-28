const fs = require('fs');
const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const AWS = require('aws-sdk');
const axios = require('axios');

const {
  default: makeWASocket,
  BufferJSON,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  jidNormalizedUser,
  delay
} = require("@adiwajshing/baileys");

async function qr() {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

  const conn = makeWASocket({
    printQRInTerminal: true,
    browser: ['BOT', 'Web', 'v2'],
    auth: state,
    version
  });

  console.log('ℹ️  Connecting to Whatsapp... Please wait.');
  await conn.ev.on('creds.update', saveCreds);

  conn.ev.on('connection.update', async (update) => {
    let _a, _b;
    let connection = update.connection, lastDisconnect = update.lastDisconnect;

    if (connection === 'connecting') {
      console.log('Connecting...');
    }

    if (connection === 'open') {
      console.log('Successfully connected');
      let router = express.Router();

      router.get('/', (req, res) => {
        const jsond = { "status": "ok" };
        res.json(jsond);
      });

      // Initialize AWS S3
      const s3 = new AWS.S3();

      let app = express();
      app.enable('trust proxy');
      app.set("json spaces", 2);
      app.use(cors());
      app.use(secure);
      app.use(express.static("assets"));

      router.get('/api', async (req, res) => {
         // Initialize the `sentArticles` set.
  const sentArticles = new Set();

  try {
    // Read the old news from AWS S3.
    const s3File = await s3.getObject({
      Bucket: process.env.BUCKET,
      Key: 'news.json',
    }).promise();

    const oldNews = JSON.parse(s3File.Body.toString());

    // Add the old news to the `sentArticles` set.
    for (const article of oldNews) {
      sentArticles.add(article.title);
    }
  } catch (error) {
    console.error("Error reading news data from S3:", error);
  }

  // Read the new news from the API.
  try {
    const response = await axios.get("https://ada-derana-news-api.sl-technicaltec.repl.co/");
    const newsData = response.data;
    const newsArticles = Object.values(newsData);

    // Loop through the new news articles and send them if they have not already been sent.
    for (const article of newsArticles) {
      if (!sentArticles.has(article.title)) {
        // Send the article (your existing code for sending articles goes here).
// Send the article.
const imgurl = article.image;

// Check if the image URL is incomplete.
if (imgurl === undefined || imgurl.length === 0) {
  // Send a backup image URL.
  await conn.sendMessage('120363165330389006@g.us', { image: { url: 'https://filmhall.eprogrammers.lk/film_hall/image/NEWS%20SINHALA%20247%2020231025_164826.jpg' }, caption: `*${article.title}*\n\n${article.description}\n\n🗓️${article.time}\n🪀ꜱᴏᴜʀᴄᴇ - www.adaderana.lk\n📌ᴘᴏᴡᴇʀᴅ ʙʏ ɴʙᴍᴏᴅꜱ` });
} else {
  // Check if the image URL contains jpg, png, or webp.
  const imageExtensionRegex = /(jpg|png|webp)$/i;
  if (!imageExtensionRegex.test(imgurl)) {
    // Send a backup image URL.
    await conn.sendMessage('120363165330389006@g.us', { image: { url: 'https://filmhall.eprogrammers.lk/film_hall/image/NEWS%20SINHALA%20247%2020231025_164826.jpg' }, caption: `*${article.title}*\n\n${article.description}\n\n🗓️${article.time}\n🪀ꜱᴏᴜʀᴄᴇ - www.adaderana.lk\n📌ᴘᴏᴡᴇʀᴅ ʙʏ ɴʙᴍᴏᴅꜱ` });
  } else {
    // Send the original image URL.
    await conn.sendMessage('120363165330389006@g.us', { image: { url: imgurl }, caption: `*${article.title}*\n\n${article.description}\n\n🗓️${article.time}\n🪀ꜱᴏᴜʀᴄᴇ - www.adaderana.lk\n📌ᴘᴏᴡᴇʀᴅ ʙʏ ɴʙᴍᴏᴅꜱ` });
  }
}

        // Add the article to the set of sent articles.
        sentArticles.add(article.title);
      }
    }

    // Update the JSON file with the new news.
    try {
      await s3.putObject({
        Body: JSON.stringify(newsArticles),
        Bucket: process.env.BUCKET,
        Key: 'news.json',
      }).promise();
    } catch (error) {
      console.error("Error writing news data to S3:", error);
    }
  } catch (error) {
    console.error("Error fetching news data from the API:", error);
  }

  const jsond = { "status": "ok" };
  res.json(jsond);
      });

      const PORT = process.env.PORT || 8989;
      app.use('/', router);

      app.listen(PORT, () => {
        console.log("Server running on port " + PORT);
      });

      app.use((req, res, next) => {
        setInterval(async () => {
          await axios.get('https://successful-fly-cowboy-boots.cyclic.app').catch(console.error);
        }, 300000);
      });

      if (connection === 'close') {
        if (lastDisconnect.error && lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut) {
          qr();
        } else {
          console.log("error");
          process.exit(0);
        }
      }
    }
  });
}

qr();
