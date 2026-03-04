import { useEffect, useState } from 'react';
import { getApiEndpoint, normalizeApiList } from '../api';
import DataSection from './DataSection';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const endpointHint = '-8000.app.github.dev/api/users';

  const loadUsers = () => {
    setLoading(true);
    setError('');

    const endpoint = getApiEndpoint('users');

    console.log('[Users] REST API endpoint:', endpoint);
    console.log('[Users] Codespace endpoint hint:', endpointHint);

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('[Users] Fetched data:', data);
        const normalizedData = normalizeApiList(data);
        setUsers(normalizedData);
        setLoading(false);
      })
      .catch((fetchError) => {
        console.error('[Users] Error fetching data:', fetchError);
        setError('Unable to load users.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return <DataSection title="Users" resource="users" items={users} loading={loading} error={error} onRefresh={loadUsers} />;
}

export default Users;