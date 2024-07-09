import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Guardians = ({ token }) => {
  const [guardians, setGuardians] = useState([]);

  useEffect(() => {
    const fetchGuardians = async () => {
      const response = await axios.get('http://localhost:8000/api/guardians/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGuardians(response.data);
    };
    fetchGuardians();
  }, [token]);

  return (
    <div>
      <h2>Guardians</h2>
      <ul>
        {guardians.map((guardian) => (
          <li key={guardian.id}>{guardian.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Guardians;
