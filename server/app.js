const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => res.send('Hello World!'));

var serviceAccount = require('./config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/fetchSampleCollection', async (req, res) => {
    console.log('Fetching collection');
    try {
        const sampleCollectionRef = db.collection('sampleCollection');
        const snapshot = await sampleCollectionRef.get();
        const documents = [];
        snapshot.forEach(doc => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(documents);
        console.log(documents);
    } catch (error) {
        console.error('Error fetching collection:', error);
        res.status(500).send('Error fetching collection');
    }
});


app.get('/api/test', (req, res) => {
    res.json({ message: 'Connection successful!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));