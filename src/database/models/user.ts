import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

export default mongoose.models.Users || mongoose.model('Users', UserSchema);
