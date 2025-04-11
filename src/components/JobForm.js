import React, { useState } from 'react';

function JobForm({ onAddJob }) {
  const [formData, setFormData] = useState({
    company: '', role: '', status: 'Applied', link: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAddJob(formData);
    setFormData({ company: '', role: '', status: 'Applied', link: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <input
        value={formData.company}
        onChange={(e) => setFormData({...formData, company: e.target.value})}
        placeholder="Company"
        required
      />
      <input
        value={formData.role}
        onChange={(e) => setFormData({...formData, role: e.target.value})}
        placeholder="Role"
        required
      />
      <input
        value={formData.link}
        onChange={(e) => setFormData({...formData, link: e.target.value})}
        placeholder="Application Link"
      />
      <button type="submit">Add Job</button>
    </form>
  );
}

export default JobForm;