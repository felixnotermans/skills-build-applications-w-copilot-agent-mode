import { useEffect, useState } from 'react';
import { getApiEndpoint, normalizeApiList } from '../api';
import DataSection from './DataSection';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const endpointHint = '-8000.app.github.dev/api/activities';

  const loadActivities = () => {
    setLoading(true);
    setError('');

    const endpoint = getApiEndpoint('activities');

    console.log('[Activities] REST API endpoint:', endpoint);
    console.log('[Activities] Codespace endpoint hint:', endpointHint);

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Activities] Fetched data:', data);
        const normalizedData = normalizeApiList(data);
        setActivities(normalizedData);
        setLoading(false);
      })
      .catch((fetchError) => {
        console.error('[Activities] Error fetching data:', fetchError);
        setError('Unable to load activities.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return (
    <DataSection
      title="Activities"
      resource="activities"
      items={activities}
      loading={loading}
      error={error}
      onRefresh={loadActivities}
    />
  );
}

export default Activities;