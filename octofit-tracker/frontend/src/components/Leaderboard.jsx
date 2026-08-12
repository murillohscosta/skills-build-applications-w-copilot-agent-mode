import React, { useEffect, useState } from 'react';

const normalizeApiResponse = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload?.data) return payload.data;
  if (payload?.items) return payload.items;
  const arrayPayload = Object.values(payload).find(Array.isArray);
  return Array.isArray(arrayPayload) ? arrayPayload : [];
};

export default function Leaderboard({ apiBase }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${apiBase}/leaderboard`);
        const payload = await response.json();
        setLeaderboard(normalizeApiResponse(payload));
      } catch (err) {
        setError('Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, [apiBase]);

  return (
    <div>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id || `${entry.teamName}-${entry.rank}`}>
                  <td>{entry.rank}</td>
                  <td>{entry.teamName}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
