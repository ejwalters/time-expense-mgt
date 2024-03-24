const express = require('express');
const cors = require('cors');
require('dotenv').config();
const admin = require('./config/firebaseAdminInit');
const db = admin.firestore();
const app = express();
const { getUserTimesheets } = require('./services/timesheetService');
const { getUserTaxes } = require('./services/taxService');
const { getUserExpenses } = require('./services/expenseService');

// Middlewares
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/fetchSampleCollection', async (req, res) => {
    //console.log('Fetching collection');
    try {
        const sampleCollectionRef = db.collection('sampleCollection');
        const snapshot = await sampleCollectionRef.get();
        const documents = [];
        snapshot.forEach(doc => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(documents);
        //console.log(documents);
    } catch (error) {
        console.error('Error fetching collection:', error);
        res.status(500).send('Error fetching collection');
    }
});

app.get('/fetchUsers', async (req, res) => {
    console.log('Fetching Users');
    try {
        const usersRef = db.collection('Users');
        const snapshot = await usersRef.get();
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

app.get('/timesheets', async (req, res) => {
    try {
        const userId = 'IWYMKCKALqI7MtWsCxUH';
        const timesheets = await getUserTimesheets(userId);
        res.json(timesheets);
    } catch (error) {
        console.error('Failed to get timesheets:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/taxes', async (req, res) => {
    try {
        const userId = 'IWYMKCKALqI7MtWsCxUH';
        const taxes = await getUserTaxes(userId);
        res.json(taxes);
    } catch (error) {
        console.error('Failed to get taxes:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/expenses', async (req, res) => {
    try {
        const userId = 'IWYMKCKALqI7MtWsCxUH';
        const expenses = await getUserExpenses(userId);
        res.json(expenses);
    } catch (error) {
        console.error('Failed to get expenses:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Connection successful!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));