import mongoose from 'mongoose';
import sha256 from 'sha256';

const teacherSchema = new mongoose.Schema({
  hashedPassword: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
});


teacherSchema.methods.comparePassword = function comparePassword(password) {
  return this.hashedPassword === sha256(password);
};
const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;