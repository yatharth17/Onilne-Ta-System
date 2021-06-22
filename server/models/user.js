import mongoose from 'mongoose';
import sha256 from 'sha256';

const userSchema = new mongoose.Schema({
  hashedPassword: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
});


userSchema.methods.comparePassword = function comparePassword(password) {
  return this.hashedPassword === sha256(password);
};
const User = mongoose.model('User', userSchema);
export default User;