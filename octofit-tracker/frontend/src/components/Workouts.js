import { useEffect, useState } from 'react';
import { getApiEndpoint, normalizeApiList } from '../api';
import DataSection from './DataSection';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadWorkouts = () => {
    setLoading(true);
    setError('');

    const endpoint = getApiEndpoint('workouts');

    console.log('[Workouts] REST API endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Workouts] Fetched data:', data);
        const normalizedData = normalizeApiList(data);
        setWorkouts(normalizedData);
        setLoading(false);
      })
      .catch((fetchError) => {
        console.error('[Workouts] Error fetching data:', fetchError);
        setError('Unable to load workouts.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  return (
    <DataSection
      title="Workouts"
      resource="workouts"
      items={workouts}
      loading={loading}
      error={error}
      onRefresh={loadWorkouts}
    />
  );
}

export default Workouts;