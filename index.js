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
const axios = require('axios');

// Add the following line to import express
const express = require('express');

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

    if (connection == 'connecting') {
      console.log(' Connecting...');
    }

    if (connection == 'open') {
      console.log('Successfully connected');

      // Your express app setup
      const app = express();
      const PORT = process.env.PORT || 3000;

      app.get('/', (req, res) => {
        const jsond = { "status": "ok" };
        res.json(jsond);
      });

      app.get('/api', async (req, res) => {
        // Your API logic here

        const jsond = { "status": "ok" };
        res.json(jsond);
      });

      // Other express middleware and routes here

      app.listen(PORT, () => {
        console.log("Server running on port " + PORT);
      });
    }

    if (connection == 'close') {
      if (((_b = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== DisconnectReason.loggedOut) {
        qr();
      } else {
        console.log("error");
        process.exit(0);
      }
    }
  });
}

qr();
