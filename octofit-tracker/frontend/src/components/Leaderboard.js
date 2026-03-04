import { useEffect, useState } from 'react';
import { getApiEndpoint, normalizeApiList } from '../api';
import DataSection from './DataSection';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadLeaderboard = () => {
    setLoading(true);
    setError('');

    const endpoint = getApiEndpoint('leaderboard');

    console.log('[Leaderboard] REST API endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Leaderboard] Fetched data:', data);
        const normalizedData = normalizeApiList(data);
        setLeaders(normalizedData);
        setLoading(false);
      })
      .catch((fetchError) => {
        console.error('[Leaderboard] Error fetching data:', fetchError);
        setError('Unable to load leaderboard.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
    <DataSection
      title="Leaderboard"
      resource="leaderboard"
      items={leaders}
      loading={loading}
      error={error}
      onRefresh={loadLeaderboard}
    />
  );
}

export default Leaderboard;