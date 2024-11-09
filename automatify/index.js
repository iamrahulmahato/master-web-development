const express = require('express');
const path = require('path');
const port = 3000;
const app = express();
// Serve static files from the 'view' directory

app.use(express.static(path.join(__dirname, 'views')));
// Serve static files from the 'uploads' directory for JS files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes for your application
// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index2.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index2.html'));
});

// Route to serve about.html
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Route to serve contact.html
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});
// Start the server



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
