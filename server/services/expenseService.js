const admin = require('../config/firebaseAdminInit');
const db = admin.firestore();

const getUserExpenses = async (userId) => {
    const expensesRef = db.collection('Users').doc(userId).collection('Expenses');
    const snapshot = await expensesRef.get();

    if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
    }

    let expenses = [];
    snapshot.forEach(doc => {
        expenses.push({ id: doc.id, ...doc.data() });
    });

    return expenses;
};

module.exports = { getUserExpenses };