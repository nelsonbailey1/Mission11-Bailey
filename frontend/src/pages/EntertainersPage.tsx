import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface EntertainerSummary {
  entertainerID: number;
  entStageName: string;
  bookingCount: number;
  lastBookingDate: string | null;
}

const API_BASE = 'https://413final-bailey-backend.azurewebsites.net/api';

function EntertainersPage() {
  const [entertainers, setEntertainers] = useState<EntertainerSummary[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/entertainers/summary`)
      .then(res => res.json())
      .then(data => setEntertainers(data))
      .catch(err => console.error("Failed to fetch summaries:", err));
  }, []);


  return (
<div className="container mt-5">
  <h2 className="mb-4">Entertainers</h2>
  <div className="row g-4">
    {entertainers.map(e => (
      <div key={e.entertainerID} className="col-md-6 col-lg-4">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{e.entStageName}</h5>
            <p className="card-text text-muted small">
              <strong>Bookings:</strong> {e.bookingCount}<br />
              <strong>Last Booked:</strong> {e.lastBookingDate || 'N/A'}
            </p>
            <Link to={`/entertainers/${e.entertainerID}`} className="btn btn-outline-primary w-100">
              View Details
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>

  <div className="mt-5 text-end">
    <Link to="/entertainers/new" className="btn btn-success btn-lg">
      + Add New Entertainer
    </Link>
  </div>
</div>

  );
}

export default EntertainersPage;

