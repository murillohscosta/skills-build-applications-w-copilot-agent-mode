import { Router } from 'express';
import Workout from '../models/workout.js';
const router = Router();
router.get('/', async (_req, res) => {
    const workouts = await Workout.find().lean();
    res.json({ workouts });
});
router.post('/', async (req, res) => {
    const createdWorkout = await Workout.create(req.body);
    res.status(201).json({ workout: createdWorkout, message: 'Workout created' });
});
export default router;
