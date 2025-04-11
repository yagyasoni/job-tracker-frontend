import React from 'react';

function JobList({ jobs, onUpdateStatus, onDelete }) {
  return (
    <div className="job-list">
      {jobs.map(job => (
        <div key={job._id} className="job-card">
          <h3>{job.company} - {job.role}</h3>
          <p>Status: {job.status}</p>
          <p>Date: {new Date(job.dateApplied).toLocaleDateString()}</p>
          {job.link && <a href={job.link} target="_blank" rel="noopener noreferrer">Link</a>}
          <select 
            value={job.status} 
            onChange={(e) => onUpdateStatus(job._id, e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button onClick={() => onDelete(job._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default JobList;