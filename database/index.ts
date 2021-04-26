import mongoose from 'mongoose'
const env = require(`./env/${process.env.NODE_ENV || "dev"}.ts`)

function createConnection() {
    const connectionString = `mongodb+srv://${env.default.DB_USER}:${env.default.DB_PASSWORD}@${env.default.DB_HOST}/${env.default.DB_NAME}?retryWrites=true&w=majority`;

    mongoose.connect(connectionString, {useNewUrlParser: true});

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
}

export default createConnection