/**
 * ⚡⚡⚡ DECLARAMOS LAS LIBRERIAS y CONSTANTES A USAR! ⚡⚡⚡
 */
 const express = require('express');
 const { Client, MessageMedia } = require('whatsapp-web.js');
 const app = express();
 app.use(express.urlencoded({ extended: true }))
 let client;
 let sessionData;
 
 const PORT = process.env.PORT || 9000;
 
 const sendMessage = (number = null, text = null) => {
     number = number.replace('@c.us', '');
     number = `${number}@c.us`
     const message = text || `Mensagem enviada`;
     client.sendMessage(number, message);
     console.log(`Enviando mensajes....`);
 }
 
 const listenMessage = () => {
     client.on('message', async msg => {
         const { from, to, body } = msg;
         await greetCustomer(from);
         
         console.log('body',body);
         
         await replyAsk(from, body);
 
     });
 }
 
 const replyAsk = (from, answer) => new Promise((resolve, reject) => {
     console.log(`---------->`, answer);
     if (answer === 'yes') {
         sendMessage(from, 'OK')
         resolve(true)
     }
 
 })
 
 const withSession = (sessionJson) => {
 
     sessionData = sessionJson;
     client = new Client({
         session: sessionData
     });
 
     client.on('ready', () => {
         console.log('Client is ready!');
         connectionReady();
     });
 
     client.on('auth_failure', () => {
         console.log('** Error de autentificacion vuelve a generar el QRCODE (Borrar el archivo session.json) **');
     })
 
     client.initialize();
 }
 
 const withOutSession = () => {
     console.log('No tenemos session guardada');
     client = new Client();
     // client.on('qr', qr => {
     //     qrcode.generate(qr, { small: true });
     // });
 
     client.on('ready', () => {
         console.log('Client is ready!');
         connectionReady();
     });
 
     client.on('auth_failure', () => {
         console.log('** Error de autentificacion vuelve a generar el QRCODE **');
     })
 
 
     client.on('authenticated', (session) => {
         // Guardamos credenciales de de session para usar luego
         sessionData = session;
         // fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
         //     if (err) {
         //         console.log(err);
         //     }
         // });
     });
 
     client.initialize();
 }
 
 const connectionReady = () => {
     listenMessage();
 }
 
 const greetCustomer = (from) => new Promise((resolve, reject) => {
     from = from.replace('@c.us', '');
     if (from === '555180173688') {
         sendMessage(from, 'OK')
         resolve(true)
     }
    //  sendMessage(from, 'firstMessage')
    //  resolve(true)
 })
 
 const sendMessagePost = (req, res) => {
     const { message, number } = req.body
     console.log(message, number);
     sendMessage(number, message)
     res.send({ status: 'Enviado!' })
 }
 
 app.post('/send', sendMessagePost);
 
 
 (true) ? withSession({"WABrowserId":"\"YzsEz8STFWxHHGrUWYVPJw==\"","WASecretBundle":"{\"key\":\"VyVIBUL1qqVw1QOR+sPZ96FM8ybTpeAaKxou/NlQEgk=\",\"encKey\":\"gjFHuBGiN/eMbE+66zrM+imKE/PkPzyJldYd/4SdLbk=\",\"macKey\":\"VyVIBUL1qqVw1QOR+sPZ96FM8ybTpeAaKxou/NlQEgk=\"}","WAToken1":"\"y5NKQd884upkeghOECf1jS6/1kIzwSfKW6LkcJeGWHA=\"","WAToken2":"\"1@UMfMBVfPfpTSWFx84ro1POW2iPG0Ccjdj3WCt4knU691l9MbBd6f+cQrx9GSCLIS6QLrz4qb8OLvjQ==\""}) : withOutSession();
 
 app.listen(PORT, () => {
     console.log('Server ready!');
 })