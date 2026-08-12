import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';
dotenv.config();
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await mongoose.connect(connectionString);
    await Promise.all([
        User.deleteMany({}),
        Team.deleteMany({}),
        Activity.deleteMany({}),
        Leaderboard.deleteMany({}),
        Workout.deleteMany({}),
    ]);
    const users = await User.create([
        {
            name: 'Avery Chen',
            email: 'avery.chen@example.com',
            role: 'member',
            joinedAt: new Date('2026-01-20'),
            team: 'Squad Alpha',
        },
        {
            name: 'Jordan Patel',
            email: 'jordan.patel@example.com',
            role: 'coach',
            joinedAt: new Date('2026-02-05'),
            team: 'Team Momentum',
        },
        {
            name: 'Mia Carter',
            email: 'mia.carter@example.com',
            role: 'member',
            joinedAt: new Date('2026-03-12'),
            team: 'Squad Alpha',
        },
    ]);
    const teams = await Team.create([
        {
            name: 'Squad Alpha',
            description: 'High-energy runners and cross-trainers.',
            members: users.filter((user) => user.team === 'Squad Alpha').map((user) => user.name),
            score: 1260,
        },
        {
            name: 'Team Momentum',
            description: 'Strength and recovery-focused athletes.',
            members: users.filter((user) => user.team === 'Team Momentum').map((user) => user.name),
            score: 1180,
        },
    ]);
    const activities = await Activity.create([
        {
            userId: users[0]._id.toString(),
            type: 'Run',
            duration: 34,
            calories: 320,
            date: new Date('2026-08-05T08:20:00Z'),
        },
        {
            userId: users[1]._id.toString(),
            type: 'Strength',
            duration: 45,
            calories: 280,
            date: new Date('2026-08-06T17:10:00Z'),
        },
        {
            userId: users[2]._id.toString(),
            type: 'Yoga',
            duration: 28,
            calories: 160,
            date: new Date('2026-08-07T06:50:00Z'),
        },
    ]);
    const leaderboardEntries = await Leaderboard.create([
        { teamName: 'Squad Alpha', rank: 1, points: 1260, wins: 8 },
        { teamName: 'Team Momentum', rank: 2, points: 1180, wins: 7 },
    ]);
    const workouts = await Workout.create([
        {
            title: 'Full Body HIIT',
            description: 'A fast-paced session built to boost cardio and strength.',
            duration: 30,
            intensity: 'high',
            focus: 'full body',
        },
        {
            title: 'Core Strength Circuit',
            description: 'A targeted core workout that improves stability and posture.',
            duration: 25,
            intensity: 'moderate',
            focus: 'core',
        },
        {
            title: 'Recovery Stretch Flow',
            description: 'A low-impact routine designed for active recovery and mobility.',
            duration: 20,
            intensity: 'low',
            focus: 'mobility',
        },
    ]);
    console.log('Seed complete:');
    console.log(`  users: ${users.length}`);
    console.log(`  teams: ${teams.length}`);
    console.log(`  activities: ${activities.length}`);
    console.log(`  leaderboard entries: ${leaderboardEntries.length}`);
    console.log(`  workouts: ${workouts.length}`);
    await mongoose.disconnect();
}
seedDatabase()
    .catch((error) => {
    console.error('Seed script failed:', error);
    process.exit(1);
})
    .finally(() => process.exit(0));
