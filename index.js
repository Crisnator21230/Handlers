/* importacion de librerias */
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./src/middleweares/errors.handlers');

/* importacion de rutas  */
const routerApi = require('./src/routes');
const port = process.env.PORT;
const app = express();

/* ACtivacion del puerto */
app.listen(port, console.log('Puerto Activo', port));

/* conectamos con la base de datos */
mongoose
  .connect(process.env.MONGODB_STRING_CONNECTION)
  .then(() => console.log('Conexión Exitosa Con Mongo'))
  .catch((err) => console.log(err));

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'cristiandavidsantap30@gmail.com',
  from: 'cristiand.santap@autonoma.edu.co',
  subject: 'Asunto: Prueba Twilio',
  html: `<html>
  <head>
    <title></title>
  </head>
  <body>
  <div>
      Hola mundo
  </div>
    <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
      <div class="Unsubscribe--addressLine">
        <p class="Unsubscribe--senderName"
          style="font-size:12px;line-height:20px"
        >
          {{Sender_Name}}
        </p>
        <p style="font-size:12px;line-height:20px">
          <span class="Unsubscribe--senderAddress">{{Sender_Address}}</span>, <span class="Unsubscribe--senderCity">{{Sender_City}}</span>, <span class="Unsubscribe--senderState">{{Sender_State}}</span> <span class="Unsubscribe--senderZip">{{Sender_Zip}}</span>
        </p>
      </div>
      <p style="font-size:12px; line-height:20px;">
        <a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="font-family:sans-serif;text-decoration:none;">
          Unsubscribe
        </a>
        -
        <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font-family:sans-serif;text-decoration:none;">
          Unsubscribe Preferences
        </a>
      </p>
    </div>
  </body>
</html>`,
};
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
  });

client.messages
  .create({
    body: 'twilio sms',
    from: '+19853043828',
    to: '+573183603995',
  })
  .then((message) => console.log(`Mensaje Enviado por SMS ${message.sid}`));

routerApi(app);
