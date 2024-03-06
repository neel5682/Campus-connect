import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io('http://localhost:5000');

    newSocket.on('connect', () => {
      console.log('Connected to the server');
    });
    

    newSocket.on('message', (message) => {
      // Update the messages when a new message is received
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(newSocket);

    return () => {
      // Disconnect from the WebSocket server when the component unmounts
      newSocket.disconnect();
    };
  }, []); // Run this effect only once on component mount

  const handleSendMessage = () => {
    if (socket && newMessage.trim() !== '') {
      // Send the new message to the server
      socket.emit('sendMessage', { text: newMessage });

      // Clear the input field
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div style={{ height: '300px', border: '1px solid #ccc', padding: '10px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
