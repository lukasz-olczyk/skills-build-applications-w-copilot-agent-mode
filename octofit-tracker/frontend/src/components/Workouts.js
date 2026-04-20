import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  function getApiBaseUrl() {
    if (process.env.REACT_APP_CODESPACE_URL) {
      return process.env.REACT_APP_CODESPACE_URL;
    }
    if (window?.location?.host?.includes('-3000')) {
      return window.location.protocol + '//' + window.location.host.replace('-3000', '-8000');
    }
    return '';
  }

  useEffect(() => {
    const endpoint = `${getApiBaseUrl()}/api/workouts/`;
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(async res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error('Response is not JSON: ' + text.substring(0, 100));
        }
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        setError(null);
        console.log('Fetched Workouts:', results);
      })
      .catch(err => {
        setError(err.message);
        setWorkouts([]);
        console.error('Error fetching workouts:', err);
      });
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title display-6 mb-4">Workouts</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  <td>{workout.id || idx + 1}</td>
                  <td>{workout.name || '-'}</td>
                  <td>{JSON.stringify(workout)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Workouts;
