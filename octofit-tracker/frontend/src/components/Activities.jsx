import React, { useEffect, useState } from 'react';

// Expected Codespaces API endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities
const normalizeApiResponse = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload?.data) return payload.data;
  if (payload?.items) return payload.items;
  const arrayPayload = Object.values(payload).find(Array.isArray);
  return Array.isArray(arrayPayload) ? arrayPayload : [];
};

export default function Activities({ apiBase }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${apiBase}/activities`);
        const payload = await response.json();
        setActivities(normalizeApiResponse(payload));
      } catch (err) {
        setError('Unable to load activities');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, [apiBase]);

  return (
    <div>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id || activity.type}>
                  <td>{activity.type}</td>
                  <td>{activity.duration} min</td>
                  <td>{activity.calories}</td>
                  <td>{new Date(activity.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
