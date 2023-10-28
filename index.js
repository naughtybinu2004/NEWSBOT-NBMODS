const {
  default: makeWASocket,
  BufferJSON,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  jidNormalizedUser,
  delay
} = require("@adiwajshing/baileys");
const fs = require('fs');
const chalk = require("chalk");
const axios = require('axios');

async function qr() {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

  const conn = makeWASocket({
    printQRInTerminal: true,
    browser: ['BOT', 'Web', 'v2'],
    auth: state,
    version
  });


console.log('ℹ️  Connecting to Whatsapp... Please wait.')
  await conn.ev.on('creds.update', saveCreds);

  conn.ev.on('connection.update', async (update) => {

    let _a, _b;
    let connection = update.connection, lastDisconnect = update.lastDisconnect;

    if (connection == 'connecting') {
      console.log(' Connecting...');
    };

    if (connection == 'open') {

      console.log('Successfully connected');
	let express = require('express');
     let router = express.Router();	   
     router.get('/', (req, res) => {
    const jsond = { "status" : "ok"}	     
    res.json(jsond)
})
	     router.get('/api', async (req, res) => {
    
    

      // Initialize the `sentArticles` set.
      const sentArticles = new Set();
      // Read the old news from the JSON file.
      const oldNews = Array.from(JSON.parse(fs.readFileSync('news.json')));

      // Add the old news to the `sentArticles` set.
      for (const article of oldNews) {
        sentArticles.add(article.title);
      }

      // Read the new news from the API.
      const response = await axios.get("https://ada-derana-news-api.sl-technicaltec.repl.co/");
      const newsData = response.data;

      // Convert the news data to an array.
      const newsArticles = Object.values(newsData);

      // Loop through the new news articles and send them if they have not already been sent.
      for (const article of newsArticles) {

        if (!sentArticles.has(article.title)) {
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

      // Clear the `sentArticles` set after the `for` loop has finished iterating.
      sentArticles.clear();

      // Update the JSON file with the new news.
      fs.writeFileSync('news.json', JSON.stringify(newsArticles));
    
    
  const jsond = { "status" : "ok"}	     
    res.json(jsond)      
    
})
let cors = require('cors')
let secure = require('ssl-express-www')
let PORT = process.env.PORT || 8989 || 8181 || 8080
let app = express()
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("assets"))

app.use('/',  router)
app.listen(PORT, () => {
    console.log("Server running on port " + PORT) 
})
   app.use((req, res, next) => {
    setInterval(async() =>{
await axios.get('https://news-bot.anomamis.repl.co/').catch(console.error)
  
}, 300000 )
    
}); 
    }
   
      

    
    if (connection == 'close') {
      if (((_b = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== DisconnectReason.loggedOut) {
        qr()
      } else {
        console.log("error")
       
        process.exit(0);
      };

    };

  });


};

qr()
