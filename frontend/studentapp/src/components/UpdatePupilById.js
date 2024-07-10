import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css'; // Import the CSS file

const UpdatePupilById = ({ token }) => {
  const [pupilId, setPupilId] = useState('');
  const [pupil, setPupil] = useState(null);
  const [classes, setClasses] = useState([]);
  const [guardians, setGuardians] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const classesResponse = await axios.get('http://localhost:8000/api/classes/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(classesResponse.data);

      const guardiansResponse = await axios.get('http://localhost:8000/api/guardians/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGuardians(guardiansResponse.data);
    };
    fetchData();
  }, [token]);

  const handleIdSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/api/pupils/${pupilId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPupil(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Error fetching pupil');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setPupil({
        ...pupil,
        [name]: files[0],
      });
    } else {
      setPupil({
        ...pupil,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pupil.first_name || !pupil.last_name || !pupil.date_of_birth || !pupil.gender || !pupil.address || !pupil.nida_id) {
      setError('All fields except current class and picture are required');
      return;
    }

    const formData = new FormData();
    for (const key in pupil) {
      if (pupil[key]) {
        formData.append(key, pupil[key]);
      }
    }
    try {
      await axios.put(`http://localhost:8000/api/pupils/${pupilId}/`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Pupil updated successfully');
      setError('');
    } catch (error) {
      setError('Error updating pupil');
      setSuccess('');
    }
  };

  return (
    <div className="form-container">
      {!pupil && (
        <div>
          <h2>Enter Pupil ID</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleIdSubmit}>
            <div>
              <label>Pupil ID:</label>
              <input
                type="text"
                value={pupilId}
                onChange={(e) => setPupilId(e.target.value)}
                required
              />
            </div>
            <button type="submit">Fetch Pupil</button>
          </form>
        </div>
      )}
      {pupil && (
        <div>
          <h2>Update Pupil</h2>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name:</label>
              <input type="text" name="first_name" value={pupil.first_name} onChange={handleChange} required />
            </div>
            <div>
              <label>Last Name:</label>
              <input type="text" name="last_name" value={pupil.last_name} onChange={handleChange} required />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input type="date" name="date_of_birth" value={pupil.date_of_birth} onChange={handleChange} required />
            </div>
            <div>
              <label>Gender:</label>
              <input type="text" name="gender" value={pupil.gender} onChange={handleChange} required />
            </div>
            <div>
              <label>Address:</label>
              <input type="text" name="address" value={pupil.address} onChange={handleChange} required />
            </div>
            <div>
              <label>NIDA ID:</label>
              <input type="text" name="nida_id" value={pupil.nida_id} onChange={handleChange} required />
            </div>
            <div>
              <label>Status:</label>
              <select name="status" value={pupil.status} onChange={handleChange}>
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label>Current Class:</label>
              <select name="current_class" value={pupil.current_class} onChange={handleChange}>
                <option value="">Select a class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Guardian:</label>
              <select name="guardian" value={pupil.guardian} onChange={handleChange}>
                <option value="">Select a guardian</option>
                {guardians.map((guardian) => (
                  <option key={guardian.id} value={guardian.id}>{guardian.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Picture:</label>
              <input type="file" name="picture" onChange={handleChange} />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePupilById;
