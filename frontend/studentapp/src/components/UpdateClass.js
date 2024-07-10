import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const UpdateClass = ({ token }) => {
  const [id, setId] = useState('');
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

  const fetchClass = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/classes/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClassInfo(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching class');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/classes/${id}/`, classInfo, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Class updated successfully');
    } catch (error) {
      console.error(error);
      alert('Error updating class');
    }
  };

  return (
    <div>
      <h2>Update Class</h2>
      <div>
        <label>Class ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={fetchClass}>Fetch Class</button>
      </div>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateClass;
