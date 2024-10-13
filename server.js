const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const code = req.body.code;

    // Create a unique filename based on Date
    const fileName = `site-${Date.now()}.html`;

    // Generate the HTML file
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Page</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        ${code}
    </body>
    </html>`;

    // Save the file
    fs.writeFile(path.join(__dirname, 'uploads', fileName), htmlContent, (err) => {
        if (err) return res.status(500).send("Error saving file.");
        res.render('success', { url: `http://localhost:${PORT}/uploads/${fileName}` });
    });
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
