import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Entertainer {
  entertainerID: number;
  entStageName: string;
  entSSN: string;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entPhoneNumber: string;
  entWebPage: string;
  entEMailAddress: string;
  dateEntered: string;
}

const fieldLabels: { [key: string]: string } = {
  entStageName: "Stage Name",
  entSSN: "SSN",
  entStreetAddress: "Street Address",
  entCity: "City",
  entState: "State",
  entZipCode: "Zip Code",
  entPhoneNumber: "Phone Number",
  entWebPage: "Website",
  entEMailAddress: "Email",
  dateEntered: "Date Entered",
};

function EntertainerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/entertainers/${id}`)
      .then(res => res.json())
      .then(data => setEntertainer(data))
      .catch(err => console.error("Error fetching entertainer:", err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!entertainer) return;
    setEntertainer({ ...entertainer, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    await fetch(`${API_BASE}/entertainers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entertainer),
    });
    setIsEditing(false);
  };

  const API_BASE = 'https://413final-bailey-backend.azurewebsites.net/api';


  const deleteEntertainer = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this entertainer?");
    if (!confirmed) return;

    await fetch(`${API_BASE}/entertainers/${id}`, {
      method: 'DELETE',
    });

    navigate('/entertainers');
  };

  if (!entertainer) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Details for <span className="text-primary">{entertainer.entStageName}</span></h2>
      <div className="row">
        {Object.entries(entertainer).map(([key, value]) => {
          if (key === "entertainerID") return null;
          return (
            <div className="col-md-6 mb-3" key={key}>
              <label className="form-label">{fieldLabels[key] || key}</label>
              <input
                type="text"
                name={key}
                value={value || ''}
                onChange={handleChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>
          );
        })}
      </div>

      <div className="d-flex gap-2 mt-4">
        {isEditing ? (
          <button className="btn btn-success" onClick={saveChanges}>💾 Save</button>
        ) : (
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>✏️ Edit</button>
        )}
        <button className="btn btn-danger" onClick={deleteEntertainer}>🗑 Delete</button>
        <button className="btn btn-secondary ms-auto" onClick={() => navigate("/entertainers")}>⬅ Back to List</button>
      </div>
    </div>
  );
}

export default EntertainerDetailPage;
