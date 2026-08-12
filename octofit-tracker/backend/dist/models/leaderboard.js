import mongoose from 'mongoose';
const leaderboardSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    wins: { type: Number, default: 0 },
}, { timestamps: true });
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
export default Leaderboard;
