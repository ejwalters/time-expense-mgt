const admin = require('../config/firebaseAdminInit');
const db = admin.firestore();

const getUserTimesheets = async (userId) => {
    const timesheetsRef = db.collection('Users').doc(userId).collection('Timesheets');
    const snapshot = await timesheetsRef.get();

    if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
    }

    let timesheets = [];
    snapshot.forEach(doc => {
        timesheets.push({ id: doc.id, ...doc.data() });
    });

    return timesheets;
};

module.exports = { getUserTimesheets };
