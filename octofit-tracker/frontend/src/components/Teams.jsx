import React, { useEffect, useState } from 'react';

const normalizeApiResponse = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload?.data) return payload.data;
  if (payload?.items) return payload.items;
  const arrayPayload = Object.values(payload).find(Array.isArray);
  return Array.isArray(arrayPayload) ? arrayPayload : [];
};

export default function Teams({ apiBase }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${apiBase}/teams`);
        const payload = await response.json();
        setTeams(normalizeApiResponse(payload));
      } catch (err) {
        setError('Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, [apiBase]);

  return (
    <div>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.name}>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                  <td>{Array.isArray(team.members) ? team.members.length : team.members}</td>
                  <td>{team.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
