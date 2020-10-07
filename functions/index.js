const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

require("dotenv").load();

const cors = require("cors");
const express = require("express");
// const bodyParser = require("body-parser");
const OpenTok = require("opentok");
require("es6-promise").polyfill();
require("isomorphic-fetch");

const opentok = new OpenTok(functions.config().open_tok.api_key, functions.config().open_tok.api_secret);

// const port = 3001; Configure app to use bodyParser to parse json data
const app = express();
const validateFirebaseIdToken = (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) && !req.cookies.__session) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.', 'Make sure you authorize your request by providing the following HTTP header:', 'Authorization: Bearer <Firebase ID Token>', 'or by passing a "__session" cookie.');
    res
      .status(403)
      .send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req
      .headers
      .authorization
      .split('Bearer ')[1];
  } else {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedIdToken) => {
      console.log('ID Token correctly decoded', decodedIdToken);
      req.user = decodedIdToken;
      return next();
    })
    .catch((error) => {
      console.error('Error while verifying Firebase ID token:', error);
      res
        .status(403)
        .send('Unauthorized');
    });
};

app.use(cors({origin: true, credentials: true}));
app.use(validateFirebaseIdToken)

const api = functions
  .https
  .onRequest((request, response) => {
    if (!request.path) {
      request.url = `/${request.url}`; // prepend '/' to keep query params if any
    }
    return app(request, response);
  });

// Test server is working (GET http://localhost:3001/api)
app.get("/api/", (req, res) => {
  res.json({message: "Hi, welcome to the server api!"});
});

app.get("/api/getTokens", (req, res) => {
  let sessionId;
  let token;
  opentok.createSession({}, (error, session) => {
    if (error) {
      console.log("Error creating session:", error);
    } else {
      sessionId = session.sessionId;
      console.log(`Session ID: ${sessionId}`);
      //  Use the role value appropriate for the user:
      const tokenOptions = {};
      tokenOptions.role = "publisher";
      tokenOptions.data = "username=bob";

      // Generate a token.
      token = opentok.generateToken(sessionId, tokenOptions);
      console.log(token);
      res
        .status(200)
        .send({id: sessionId, token});
      console.log("HIT THE GET TOKEN ROUTE!!! SENDING...", sessionId, token);
    }
  });
});

module.exports = {
  api
};
