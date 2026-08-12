import React, { useEffect, useState } from 'react';

// Expected Codespaces API endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts
const normalizeApiResponse = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload?.data) return payload.data;
  if (payload?.items) return payload.items;
  const arrayPayload = Object.values(payload).find(Array.isArray);
  return Array.isArray(arrayPayload) ? arrayPayload : [];
};

export default function Workouts({ apiBase }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${apiBase}/workouts`);
        const payload = await response.json();
        setWorkouts(normalizeApiResponse(payload));
      } catch (err) {
        setError('Unable to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, [apiBase]);

  return (
    <div>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Focus</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.title}>
                  <td>{workout.title}</td>
                  <td>{workout.description}</td>
                  <td>{workout.duration} min</td>
                  <td>{workout.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
