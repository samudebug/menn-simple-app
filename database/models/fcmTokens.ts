import mongoose from 'mongoose'
const fcmTokenSchema: mongoose.Schema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        dropDups: true 
    }
});

export default mongoose.models.fcmTokens || mongoose.model("fcmTokens", fcmTokenSchema);