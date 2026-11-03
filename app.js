// Import Express.js
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Route for GET requests
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    console.log('========Req======');
    console.log(req.body);
    console.log('========Res======');
    console.log(res.body);
    res.status(403).end();
  }
});
app.get('/webhook', (req, res) => {
  // Respond IMMEDIATELY - don't do DB or logs before
  const challenge = req.query['hub.challenge'];
  console.log('========Req======');
  console.log(req.body);
  console.log('========Res======');
  console.log(res.body);
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    return res.status(200).send(challenge); // fast return
  }
  res.sendStatus(403,"Invalid verification token");
});

// Route for POST requests
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});