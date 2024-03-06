const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const User = require('./models/user');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server }); 

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const users = [];

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  // Handle incoming messages
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle WebSocket disconnection
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Endpoint for user registration
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Add user to the database (in-memory storage for demonstration purposes)
  users.push({ email, password });

  res.status(201).json({ message: 'User registered successfully' });
});

// Endpoint for user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database (in-memory storage for demonstration purposes)
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT token
  const token = jwt.sign({ email }, 'secret_key');

  res.json({ token });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
