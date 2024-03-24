const admin = require('../config/firebaseAdminInit');
const db = admin.firestore();

const getUserTaxes = async (userId) => {
    const taxesRef = db.collection('Users').doc(userId).collection('Taxes');
    const snapshot = await taxesRef.get();

    if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
    }

    let taxes = [];
    snapshot.forEach(doc => {
        taxes.push({ id: doc.id, ...doc.data() });
    });

    return taxes;
};

module.exports = { getUserTaxes };