import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const response = await axios.get('https://job-tracker-backend-production-9d1d.up.railway.app/api/jobs');
    setJobs(response.data);
  };

  const addJob = async (jobData) => {
    await axios.post('https://job-tracker-backend-production-9d1d.up.railway.app/api/jobs', jobData);
    fetchJobs();
  };

  // const updateStatus = async (id, status) => {
  //   await axios.put(`https://job-tracker-backend-production-9d1d.up.railway.app/api/jobs${id}`, { status });
  //   fetchJobs();
  // };
  const updateStatus = async (id, status) => {
    try {
      console.log('Updating status for ID:', id, 'to:', status);
      console.log('To URL:', `https://job-tracker-backend-production-9d1d.up.railway.app/api/jobs/${id}`);
      const response = await axios.put(`https://job-tracker-backend-production-9d1d.up.railway.app/api/jobs/${id}`, { status });
      console.log('Status updated:', response.data);
      fetchJobs();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  const deleteJob = async (id) => {
    try {
      console.log('Deleting job with ID:', id);
      console.log('To URL:', `https://job-tracker-backend.onrender.com/api/jobs/${id}`);
      await axios.delete(`https://job-tracker-backend.onrender.com/api/jobs/${id}`);
      console.log('Job deleted');
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  // const deleteJob = async (id) => {
  //   await axios.delete(`https://job-tracker-backend-production-9d1d.up.railway.app/api/jobs${id}`);
  //   fetchJobs();
  // };

  const filteredJobs = filter === 'All' 
    ? jobs 
    : jobs.filter(job => job.status === filter);

  return (
    <div className="App">
      <h1>Student Job Tracker</h1>
      <JobForm onAddJob={addJob} />
      <div className="filters">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <JobList 
        jobs={filteredJobs} 
        onUpdateStatus={updateStatus} 
        onDelete={deleteJob} 
      />
    </div>
  );
}

export default App;