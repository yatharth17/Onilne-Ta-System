import mongoose from 'mongoose';
import sha256 from 'sha256';

const taSchema = mongoose.Schema({
    name: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    email: { type: String, required: true },  
    doubtsAccepted: {
        type: Number,
        default: 0,
    },
    doubtsResolved: {
        type: Number,
        default: 0,
    },
    doubtsEscalated: {
        type: Number,
        default: 0,
    },
})

taSchema.methods.comparePassword = function comparePassword(password) {
    return this.hashedPassword === sha256(password);
};

var TaSchema = mongoose.model('TaSchema', taSchema);
export default TaSchema;


