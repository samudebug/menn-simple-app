import * as admin from 'firebase-admin';
const credFile = require("./firebase_config.json");

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(credFile)
    });
}

export default admin.apps[0];