import mongoose from 'mongoose';

const userSchema: mongoose.Schema = new mongoose.Schema({
    name: String
});

export default mongoose.models.Users || mongoose.model('Users', userSchema);