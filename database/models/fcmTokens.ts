import mongoose from 'mongoose'
const fcmTokenSchema: mongoose.Schema = new mongoose.Schema({
    token: String
});

export default mongoose.models.fcmTokens || mongoose.model("fcmTokens", fcmTokenSchema);