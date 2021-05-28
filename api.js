// const express = require("express");
// const fs = require('fs');
// const axios = require('axios');
// const shelljs = require('shelljs');

// const config = require('./config.json');
// const { Client } = require('whatsapp-web.js');
// const SESSION_FILE_PATH = './session.json';

// let sessionCfg;
// if (fs.existsSync(SESSION_FILE_PATH)) {
//     sessionCfg = require(SESSION_FILE_PATH);
// }

// process.title = "whatsapp-node-api";
// global.client = new Client({
//     puppeteer: {
//         headless: true,
//         args: [
//             '--no-sandbox',
//             '--disable-setuid-sandbox',
//             '--unhandled-rejections=strict'
//     ]},
//     session: sessionCfg
// });

// global.authed = false;

// const app = express();

// const port = process.env.PORT || config.port;
// //Set Request Size Limit 50 MB

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// client.on('qr', qr => {
//     fs.writeFileSync('./components/last.qr', qr);
// });


// client.on('authenticated', (session) => {
//     console.log("AUTH!");
//     sessionCfg = session;

//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
//         if (err) {
//             console.error(err);
//         }
//         authed = true;
//     });

//     try {
//         fs.unlinkSync('./components/last.qr')
//     } catch(err) {}
// });

// client.on('auth_failure', () => {
//     console.log("AUTH Failed !")
//     sessionCfg = ""
//     process.exit()
// });

// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// client.on('message', msg => {
//     console.log('msg1')
//     if (config.webhook.enabled) {
//         axios.post(config.webhook.path, { msg })
//         console.log('msg',msg)
//     }
// })
// client.initialize();

// const chatRoute = require('./components/chatting');
// const groupRoute = require('./components/group');
// const authRoute = require('./components/auth');
// const contactRoute = require('./components/contact');

// app.use(function(req, res, next){
//     console.log(req.method + ' : ' + req.path);
//     next();
// });
// app.use('/chat',chatRoute);
// app.use('/group',groupRoute);
// app.use('/auth',authRoute);
// app.use('/contact',contactRoute);

// app.listen(port, () => {
//     console.log("Server Running Live on Port : " + port);
// });

// const fs = require('fs');
const { Client } = require('whatsapp-web.js');

// Path where the session data will be stored
const SESSION_FILE_PATH = {"WABrowserId":"\"YzsEz8STFWxHHGrUWYVPJw==\"","WASecretBundle":"{\"key\":\"VyVIBUL1qqVw1QOR+sPZ96FM8ybTpeAaKxou/NlQEgk=\",\"encKey\":\"gjFHuBGiN/eMbE+66zrM+imKE/PkPzyJldYd/4SdLbk=\",\"macKey\":\"VyVIBUL1qqVw1QOR+sPZ96FM8ybTpeAaKxou/NlQEgk=\"}","WAToken1":"\"CZZnUAyoI27a1WURI5fuJfJQ5Z7Z/FXPIjYayg0M6BI=\"","WAToken2":"\"1@V15madZzTuc2MX5lvOz9s+soxwSUTNxElnZpViZGPbeD131iVL181WU/lUspCOioYU+Ja1+3pHQbuw==\""}

// Load the session data if it has been previously saved
let sessionData;
sessionData = SESSION_FILE_PATH

// Use the saved values
const client = new Client({
    session: sessionData
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('message', message => {
	console.log(message.body);
});