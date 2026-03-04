import { useEffect, useState } from 'react';
import { getApiEndpoint, normalizeApiList } from '../api';
import DataSection from './DataSection';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadTeams = () => {
    setLoading(true);
    setError('');

    const endpoint = getApiEndpoint('teams');

    console.log('[Teams] REST API endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Teams] Fetched data:', data);
        const normalizedData = normalizeApiList(data);
        setTeams(normalizedData);
        setLoading(false);
      })
      .catch((fetchError) => {
        console.error('[Teams] Error fetching data:', fetchError);
        setError('Unable to load teams.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <DataSection title="Teams" resource="teams" items={teams} loading={loading} error={error} onRefresh={loadTeams} />
  );
}

export default Teams;