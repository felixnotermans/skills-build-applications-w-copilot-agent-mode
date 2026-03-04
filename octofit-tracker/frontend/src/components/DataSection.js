import { useMemo, useState } from 'react';

const getPrimaryText = (item) => {
  return item.name || item.title || item.username || item.email || `Item ${item.id || item._id || ''}`.trim();
};

const getDetailsText = (item) => {
  return Object.entries(item)
    .filter(([key]) => !['_id', 'id', 'name', 'title', 'username'].includes(key))
    .slice(0, 3)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(' • ');
};

function DataSection({
  title,
  resource,
  items,
  loading,
  error,
  onRefresh,
  emptyMessage = 'Geen data gevonden.',
}) {
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(normalizedQuery));
  }, [items, query]);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-header bg-white d-flex flex-wrap justify-content-between align-items-center gap-2">
        <h2 className="h4 mb-0">{title}</h2>
        <div className="d-flex align-items-center gap-3">
          <a className="link-primary text-decoration-none" href={`/api/${resource}/`} target="_blank" rel="noreferrer">
            API link
          </a>
          <button type="button" className="btn btn-primary btn-sm" onClick={onRefresh}>
            Refresh
          </button>
        </div>
      </div>

      <div className="card-body">
        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-sm-8 col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder={`Zoek in ${title.toLowerCase()}...`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setQuery('')}>
              Reset
            </button>
          </div>
        </form>

        {error && <div className="alert alert-danger py-2 mb-3">{error}</div>}
        {loading && <p className="text-muted mb-0">Laden...</p>}

        {!loading && !error && filteredItems.length === 0 && <p className="text-muted mb-0">{emptyMessage}</p>}

        {!loading && !error && filteredItems.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: '80px' }}>
                    #
                  </th>
                  <th scope="col">Naam</th>
                  <th scope="col">Details</th>
                  <th scope="col" className="text-end" style={{ width: '120px' }}>
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.id || item._id || index}>
                    <td>{index + 1}</td>
                    <td>{getPrimaryText(item)}</td>
                    <td>{getDetailsText(item) || '—'}</td>
                    <td className="text-end">
                      <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setSelectedItem(item)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedItem && (
        <>
          <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">{title} details</h3>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedItem(null)} />
                </div>
                <div className="modal-body">
                  <pre className="bg-light border rounded p-3 mb-0">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                    Sluiten
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" onClick={() => setSelectedItem(null)} />
        </>
      )}
    </section>
  );
}

export default DataSection;