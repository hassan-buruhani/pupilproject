import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Form.css'; // Import the CSS file

const RegisterPupil = ({ token }) => {
  const [pupil, setPupil] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    address: '',
    nida_id: '',
    current_class: '',
    picture: null,
  });
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      const classesResponse = await axios.get('http://localhost:8000/api/classes/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(classesResponse.data);
    };
    fetchClasses();
  }, [token]);

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
      await axios.post('http://localhost:8000/api/pupils/', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Pupil registered successfully');
      setError('');
    } catch (error) {
      setError('Error registering pupil');
      setSuccess('');
    }
  };

  return (
    <div className="form-container">
      <h2>Register Pupil</h2>
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
          <label>Current Class:</label>
          <select name="current_class" value={pupil.current_class} onChange={handleChange}>
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Picture:</label>
          <input type="file" name="picture" onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPupil;
