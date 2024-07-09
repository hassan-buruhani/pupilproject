import React, { useState } from 'react';
import axios from 'axios';

const RegisterClass = ({ token }) => {
  const [classInfo, setClassInfo] = useState({
    name: '',
    class_teacher: '',
  });

  const handleChange = (e) => {
    setClassInfo({
      ...classInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/classes/', classInfo, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Class registered successfully');
    } catch (error) {
      console.error(error);
      alert('Error registering class');
    }
  };

  return (
    <div>
      <h2>Register Class</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Class Name:</label>
          <input
            type="text"
            name="name"
            value={classInfo.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Class Teacher:</label>
          <input
            type="text"
            name="class_teacher"
            value={classInfo.class_teacher}
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
