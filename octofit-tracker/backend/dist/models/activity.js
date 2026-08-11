import mongoose from 'mongoose';
const activitySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: () => new Date() },
}, { timestamps: true });
const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
