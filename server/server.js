/**
 * This is a simple express server, to show how to proxy weather rquest to DarkSky API.
 */
require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
require('es6-promise').polyfill();
require('isomorphic-fetch');

const OpenTok = require('opentok');

const opentok = new OpenTok(process.env.API_KEY, process.env.API_SECRET);

const cors = require('cors');

const port = 3001;

// Configure app to use bodyParser to parse json data
const app = express();
const server = require('http').createServer(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

// Test server is working (GET http://localhost:3001/api)
app.get('/api/', (req, res) => {
  res.json({message: 'Hi, welcome to the server api!'});
});

app.get('/api/getTokens', (req, res) => {
  let sessionId;
  let token;
  opentok.createSession({}, (error, session) => {
    if (error) {
      console.log('Error creating session:', error);
    } else {
      sessionId = session.sessionId;
      console.log(`Session ID: ${sessionId}`);
      //  Use the role value appropriate for the user:
      const tokenOptions = {};
      tokenOptions.role = 'publisher';
      tokenOptions.data = 'username=bob';

      // Generate a token.
      token = opentok.generateToken(sessionId, tokenOptions);
      console.log(token);
      res
        .status(200)
        .send({id: sessionId, token});
      console.log('HIT THE GET TOKEN ROUTE!!! SENDING...', sessionId, token);
    }
  });
});

// Start the server
server.listen(port);
console.log(`Server is listening on port ${port}`);
