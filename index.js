const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Endpoint for Twilio to send messages
app.post('/whatsapp', (req, res) => {
    const { Body, From } = req.body; // Message content and sender

    console.log(`Received message from ${From}: ${Body}`);
    let response;

    // Handle commands
    if (Body === '/sprint') {
        response = 'Sprint session started!';
    } else if (Body === '/join') {
        response = 'You’ve joined the sprint!';
    } else if (Body === '/leave') {
        response = 'You’ve left the sprint!';
    } else {
        response = 'Unknown command. Use /sprint, /join, or /leave.';
    }

    // Send response back to Twilio
    res.send(`
        <Response>
            <Message>${response}</Message>
        </Response>
    `);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
