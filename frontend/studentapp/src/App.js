import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Pupils from './components/Pupils';
import Classes from './components/Classes';
import Guardians from './components/Guardians';
import Enrollments from './components/Enrollments';
import RegisterPupil from './components/RegisterPupil';
import UpdatePupil from './components/UpdatePupil';
import RegisterClass from './components/RegisterClass';
import UpdateClass from './components/UpdateClass';
import RegisterGuardian from './components/RegisterGuardian';
import UpdateGuardian from './components/UpdateGuardian';
import DeleteClass from './components/DeleteClass';
import UpdatePupil2 from './components/UpdatePupil2';

const App = () => {
  const [token, setToken] = useState(null);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard token={token} />} />
        <Route path="/pupils" element={<Pupils token={token} />} />
        <Route path="/register-pupil" element={<RegisterPupil token={token} />} />
        <Route path="/pupilupdate" element={<UpdatePupil2 token={token} />} />
        <Route path="/update-pupil/:id" element={<UpdatePupil token={token} />} />
        <Route path="/classes" element={<Classes token={token} />} />
        <Route path="/register-class" element={<RegisterClass token={token} />} />
        <Route path="/update-class" element={<UpdateClass token={token} />} />
        <Route path="/delete-class" element={<DeleteClass token={token} />} />
        <Route path="/guardians" element={<Guardians token={token} />} />
        <Route path="/register-guardian" element={<RegisterGuardian token={token} />} />
        <Route path="/update-guardian" element={<UpdateGuardian token={token} />} />
        <Route path="/enrollments" element={<Enrollments token={token} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
