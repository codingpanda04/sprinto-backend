const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse incoming URL-encoded data (required by Twilio)
app.use(bodyParser.urlencoded({ extended: false }));

// POST endpoint for WhatsApp messages
app.post('/whatsapp', (req, res) => {
    console.log("Received request:", req.body);  // Log the entire body
    const incomingMessage = req.body.Body;  // This is the key you need
    console.log(`Received message: ${incomingMessage}`);  // Log the message

    let responseMessage = '';

    if (incomingMessage === '/sprint') {
        responseMessage = 'Sprint session started!';
    } else if (incomingMessage === '/join') {
        responseMessage = 'You’ve joined the sprint!';
    } else if (incomingMessage === '/leave') {
        responseMessage = 'You’ve left the sprint!';
    } else if (incomingMessage === '/wordcount') {
        responseMessage = 'Update your wordcount now!';
    }else {
        responseMessage = 'Unknown command. Use /sprint, /join, or /leave.';
    }

    const twiml = `
        <Response>
            <Message>${responseMessage}</Message>
        </Response>
    `;

    res.set('Content-Type', 'application/xml');
    res.send(twiml);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
