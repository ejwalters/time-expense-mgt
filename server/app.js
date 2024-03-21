const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/test', (req, res) => {
    res.json({ message: 'Connection successful!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));