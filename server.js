const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'https://www.creativeiii.com' }));
app.use(compression()); // Enable deflate/gzip
app.use(
    helmet({
        // Allow use in iframe
        frameguard: false,
    })
); // Protect HTTP headers

// Routes
app.use('/api/direct', require('./routes/email/direct'));
app.use('/api/automated', require('./routes/email/automated'));

app.use(function forceLiveDomain(req, res, next) {
    const host = req.get('Host');

    if (host.includes('herokuapp')) {
        return res.redirect(301, 'https://www.creativeiii.com' + req.originalUrl);
    }

    next();
});

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.use(function forceSecureDomain(req, res, next) {
    res.redirect(301, 'https://www.creativeiii.com' + req.originalUrl);

    next();
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
