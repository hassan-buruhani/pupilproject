import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';  // Import the CSS file

const RegisterClass = ({ token }) => {
  const [classData, setClassData] = useState({
    name: '',
    class_teacher: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setClassData({
      ...classData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classData.name || !classData.class_teacher) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/classes/', classData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Class registered successfully');
      setError('');
    } catch (error) {
      setError('Error registering class');
      setSuccess('');
    }
  };

  return (
    <div className="form-container">
      <h2>Register Class</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={classData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Class Teacher:</label>
          <input
            type="text"
            name="class_teacher"
            value={classData.class_teacher}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterClass;
