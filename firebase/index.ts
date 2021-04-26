const admin = require("firebase-admin");
const credFile = require("./firebase_config.json");

if (admin.apps === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(credFile)
    });
}

export default admin.apps[0];