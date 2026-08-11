import mongoose from 'mongoose';
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    members: { type: [String], default: [] },
    score: { type: Number, default: 0 },
}, { timestamps: true });
const Team = mongoose.model('Team', teamSchema);
export default Team;
