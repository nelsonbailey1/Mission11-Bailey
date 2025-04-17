import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

function AddEntertainerPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    entStageName: '',
    entSSN: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEMailAddress: '',
    dateEntered: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const API_BASE = 'https://413final-bailey-backend.azurewebsites.net/api';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${API_BASE}/entertainers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    navigate('/entertainers');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add New Entertainer</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {Object.keys(form).map((key) => (
            <div className="mb-3 col-md-6" key={key}>
              <label className="form-label">{fieldLabels[key] || key}</label>
              <input
                type="text"
                name={key}
                value={(form as any)[key]}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-success mt-3">Add Entertainer</button>
      </form>
    </div>
  );
}

export default AddEntertainerPage;
